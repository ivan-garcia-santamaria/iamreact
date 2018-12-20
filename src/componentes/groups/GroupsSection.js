import React, { Component } from 'react';
import axios from 'axios';
import ListGroups from './ListGroups';
import {Link} from 'react-router-dom';
import { URL_GROUPS } from '../../constants';

class GroupsSection extends Component {
    state = { 
        groups: []
    }

    
    componentDidMount() {
        this.getGroups();
    }

    getGroups = () => {
        console.log("buscando grupos");
        axios.get(`${URL_GROUPS}`,
         {headers: {
           }
         }).then(res => {
             console.log(res.data);
            this.setState({
                groups: res.data
            })
         })
   }
    
      render() {
        return (
            <div className="col-12 col-md-8">
                <h2 className="text-center">Grupos <Link to={'/createUser'}>+</Link></h2>
                <ListGroups 
                    auth= {this.props.auth}
                    groups= {this.state.groups}
                    delUser = {this.delUser}
                />
            </div>
        );
    }
}

export default GroupsSection;