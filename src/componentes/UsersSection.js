import React, { Component } from 'react';
import ListUsers from './ListUsers';

class UsersSection extends Component {
    render() {
        return (
            <div className="col-12 col-md-8">
                <h2 className="text-center">Usuarios</h2>
                <ListUsers 
                    users= {this.props.users}
                    delUser = {this.props.delUser}
                />
            </div>
        );
    }
}

export default UsersSection;