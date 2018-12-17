import React, { Component } from 'react';
import Role from './Role';

class ListRoles extends Component {

    showRoles = () => {
        const roles = this.props.roles;

        return (
            <React.Fragment>
                {Object.keys(roles).map(role => (
                   <Role 
                        key = {role}
                        role = {this.props.roles[role]}
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
                        <th scope="col">idPermission</th>
                        <th scope="col">idProfile</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Acciones</th>
                    </tr> 
                </thead>
                <tbody>
                    {this.showRoles() }
                </tbody>
            </table>
        );
    }
}

export default ListRoles;