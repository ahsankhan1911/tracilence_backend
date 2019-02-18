import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import GoogleMapReact from 'google-map-react';
const socket = io.connect('http://localhost:8000');

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      center: {
        lat: 24.866982099999998,
        lng: 67.0528818
      },
      zoom: 11
    }
   

socket.on('connect', (info) => {
  console.log("Connected to Soket Server",  info)
})

socket.on('disconnect', (info) => {
  console.error("Socket Connection Lost",  info)
})

socket.on('test', (message) => {
  console.log("SERVER MESSAGE" , message)
   this.setState({
     center : message
   })
     
  
})

socket.on('location', (location) => {
  console.log(location)
   this.setState({
     center : location
   })
     
})


    
  }
  render() {
    return (
      <div style={{ height: '80vh', width: '50%' , margin:'0 auto' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyArtLyGq0NMY_Ryd51itHa18IpDDr-M_Wg'}}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <AnyReactComponent
          lat={this.state.center.lat}
          lng={this.state.center.lng}
          text={'YOUR POINT'}
        />
      </GoogleMapReact>
    </div>
    );
  }
}

export default App;
