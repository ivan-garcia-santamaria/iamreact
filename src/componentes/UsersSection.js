import React, { Component } from 'react';
import ListUsers from './ListUsers';
import {Link} from 'react-router-dom';

class UsersSection extends Component {
      
      render() {
        return (
            <div className="col-12 col-md-8">
                <h2 className="text-center">Usuarios <Link to={'/createUser'}>+</Link></h2>
                <ListUsers 
                    auth= {this.props.auth}
                    users= {this.props.users}
                    delUser = {this.delUser}
                />
            </div>
        );
    }
}

export default UsersSection;