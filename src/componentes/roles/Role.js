import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import icon_delete from '../../iconfinder_DeleteRed_34218.png';

class Role extends Component {

    render() {
        const {id,idPermission,idProfile,description} =this.props.roles;
        return (
            <tr>
                <td><Link to={`/roles/${id}`}>{id}</Link></td>
                <td>{idPermission}</td>
                <td>{idProfile}</td>
                <td>{description}</td>
                <td>
                    <img onClick={ () => this.props.delUser(id) } src={icon_delete} alt="Borrar" />
                </td>
            </tr>
        );
    }
}

export default Role;