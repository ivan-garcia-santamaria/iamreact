import React, { Component } from 'react';
import users_images from '../indentidad-de-usuarios-itsitio.jpg';
import '../App.css';

class Home extends Component {
    render() {
        return (
        <div className="App">
            <p>
            Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla 
            Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla 
            </p>
            <img src={users_images} alt="logo" />
        </div>
        );
    }
}

export default Home;