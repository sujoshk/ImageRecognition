import React from 'react';
import Navigation from './components/navigation/navigation.jsx';
import Register from './components/Register/Register.jsx';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import Logo from './components/logo/logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import Particles from 'react-particles-js';

import SignIn from './components/SignIn/SignIn.js';


import './App.css';
import  'tachyons';




const particleOptions = {  
  number: {
    value: 30,
    density: {
      enable: true,
      value_area: 800
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: new Date()
  }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;    
  }


  loadUser = (data) => {
    this.setState({
      user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
      }
    });
  };



  calculateFaceLocation =(data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://git.heroku.com/arcane-journey-85462.git/imageurl',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      input: this.state.input
      })
    }) 
    .then(response => response.json())

    .then(response => {
      if(response) {
        fetch('https://git.heroku.com/arcane-journey-85462.git/image',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      input: this.state.input
      })
    })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log);
    }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
      //  console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    
      .catch(err => console.log(err));
    
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box, user} = this.state;
    return (
      <div className="App">
        <Particles className='particles'        
          params={particleOptions}
          />          
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
          ?
          <div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm 
              onSubmit={this.onSubmit} 
              onInputChange={this.onInputChange}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/> 
            </div>
          
          : (
            this.state.route === 'signIn' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>  
            : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
        }          
      </div>
    );
  };  
}

export default App;
