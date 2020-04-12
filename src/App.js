import React from 'react';
import Navigation from './components/navigation/navigation.jsx';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import Logo from './components/logo/logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn.js';


import './App.css';
import 'tachyons';
import { render } from '@testing-library/react';

const app = new Clarifai.App({
  apiKey: '38ccb2eed5b4447ea93d49d6fa79dd9a'
 });

const particleOptions = {  
  number: {
    value: 30,
    density: {
      enable: true,
      value_area: 800
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn'
    }
  }

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
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
        this.state.input
    )
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      //  console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'        
          params={particleOptions}
          />          
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route === 'signIn' 
          ?<SignIn onRouteChange={this.onRouteChange}/>
          :<div>
              <Logo />
              <Rank/>
              <ImageLinkForm 
              onSubmit={this.onSubmit} 
              onInputChange={this.onInputChange}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
            </div>
        }          
      </div>
    );
  };  
}

export default App;
