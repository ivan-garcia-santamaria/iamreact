import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import icon_delete from '../../iconfinder_DeleteRed_34218.png';

class Profile extends Component {

    render() {
        const {name,id,description} =this.props.profile;
        return (
            <tr>
                <td><Link to={`/profiles/${id}`}>{id}</Link></td>
                <td>{id}</td>
                <td>{name}</td>
                <td>{description}</td>
                <td>
                    <img onClick={ () => this.props.delUser(id) } src={icon_delete} alt="Borrar" />
                </td>
            </tr>
        );
    }
}

export default Profile;