import React, { Component } from 'react';
import User from './User';

class ListUsers extends Component {

    showUsers = () => {
        const users = this.props.users;

        return (
            <React.Fragment>
                {Object.keys(users).map(user => (
                   <User 
                        key = {user}
                        user = {this.props.users[user]}
                        delUser = {this.props.delUser}
                        auth= {this.props.auth}
                        />
                )

                )}
            </React.Fragment>
        );
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr> 
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Nickname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Acciones</th>
                    </tr> 
                </thead>
                <tbody>
                    {this.showUsers() }
                </tbody>
            </table>
        );
    }
}

export default ListUsers;