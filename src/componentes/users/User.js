import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import icon_delete from '../../iconfinder_DeleteRed_34218.png';

class User extends Component {

    render() {
        const {name,user_id,email,nickname,username} =this.props.user;
        return (
            <tr>
                <td><Link to={`/users/${user_id}`}>{user_id}</Link></td>
                <td>{name}</td>
                <td>{username}</td>
                <td>{nickname}</td>
                <td>{email}</td>
                <td>
                    <img onClick={ () => this.props.delUser(user_id) } src={icon_delete} alt="Borrar" />
                </td>
            </tr>
        );
    }
}

export default User;