import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Role extends Component {

    render() {
        const {id,idPermission,idProfile,description} =this.props.roles;
        return (
            <tr>
                <td>{id}</td>
                <td>{idPermission}</td>
                <td>{idProfile}</td>
                <td>{description}</td>
                <td>
                    <Link to={`/roles/${id}`} className="btn btn-primary"> Ver</Link>
                    <button onClick={ () => this.props.delUser(id) } type="button" className="btn btn-danger">Borrar</button>
                </td>
            </tr>
        );
    }
}

export default Role;