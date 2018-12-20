import React, { Component } from 'react';
import axios from 'axios';
import ListProfiles from './ListProfiles';
import {Link} from 'react-router-dom';
import { URL_PROFILES } from '../../constants';

class ProfilesSection extends Component {
    state = { 
        profiles: []
    }

    
    componentDidMount() {
        this.getProfiles();
    }

    getProfiles = () => {
        console.log("buscando profiles");
        axios.get(`${URL_PROFILES}`,
         {headers: {
           }
         }).then(res => {
             console.log(res.data);
            this.setState({
                profiles: res.data
            })
         })
   }
    
      render() {
        return (
            <div className="col-12 col-md-8">
                <h2 className="text-center">Perfiles <Link to={'/createUser'}>+</Link></h2>
                <ListProfiles 
                    auth= {this.props.auth}
                    profiles= {this.state.profiles}
                    delUser = {this.delUser}
                />
            </div>
        );
    }
}

export default ProfilesSection;