import React from 'react';
import Navigation from './components/navigation/navigation.jsx';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import Logo from './components/logo/logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onSubmit = () => {
    console.log('click');
    app.models
    .predict(
    Clarifai.COLOR_MODEL,
        // URL
        "https://samples.clarifai.com/metro-north.jpg"
    )
    .then(function(response) {
         console.log(response);
        },
        function(err) {console.log(err)}
    );
  }

  render() {
      return (
      <div className="App">
      <Particles className='particles'        
        params={particleOptions}
        />          
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
      <FaceRecognition/>           
    </div>
    );
  };  
}

export default App;
