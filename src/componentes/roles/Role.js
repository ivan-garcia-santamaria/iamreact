import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import icon_delete from '../../iconfinder_DeleteRed_34218.png';

class Role extends Component {

    render() {
        const {name,_id,description,applicationId} =this.props.role;
        return (
            <tr>
                <td><Link to={`/roles/${_id}`}>{_id}</Link></td>
                <td>{name}</td>
                <td>{description}</td>
                <td>{applicationId}</td>
                <td>
                    <img onClick={ () => this.props.delUser(_id) } src={icon_delete} alt="Borrar" />
                </td>
            </tr>
        );
    }
}

export default Role;