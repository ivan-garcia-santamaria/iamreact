import React, { Component } from 'react';
import axios from 'axios';
import ListRoles from './ListRoles';
import {Link} from 'react-router-dom';
import { URL_ROLES } from '../../constants';

class RolesSection extends Component {
    state = { 
        roles: []
    }

    
    componentDidMount() {
        this.getRoles();
    }

    getRoles = () => {
        console.log("buscando roles");
        axios.get(`${URL_ROLES}`,
         {headers: {
           }
         }).then(res => {
             console.log(res.data);
            this.setState({
                roles: res.data
            })
         })
   }
    
      render() {
        return (
            <div className="col-12 col-md-8">
                <h2 className="text-center">Roles <Link to={'/createUser'}>+</Link></h2>
                <ListRoles 
                    auth= {this.props.auth}
                    roles= {this.state.roles}
                    delUser = {this.delUser}
                />
            </div>
        );
    }
}

export default RolesSection;