import React, { Component } from 'react';
import Permission from './Permission';

class ListPermissions extends Component {

    showPermissions = () => {
        const permissions = this.props.permissions;

        return (
            <React.Fragment>
                {Object.keys(permissions).map(permission => (
                   <Permission 
                        key = {permission}
                        permission = {this.props.permissions[permission]}
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
                        <th scope="col">Descripcion</th>
                        <th scope="col">Aplicacion</th>
                        <th scope="col">Acciones</th>
                    </tr> 
                </thead>
                <tbody>
                    {this.showPermissions() }
                </tbody>
            </table>
        );
    }
}

export default ListPermissions;