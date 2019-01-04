import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import icon_delete from '../../iconfinder_DeleteRed_34218.png';
import icon_blocked from '../../images/blocked_user.png';

class User extends Component {

    render() {
        const {name,user_id,email,nickname,username,blocked} =this.props.user;
        return (
            <tr>
                <td>
                {blocked && (
                    <img onClick={ () => this.props.unblockUser(user_id) } src={icon_blocked} title="Usuario Bloqueado, desbloquear?" alt="Usuario Bloqueado, desbloquear?" height="30"  />
                )}
                </td>
                <td><Link to={`/users/${user_id}`}>{user_id}</Link></td>
                <td>{name}</td>
                <td>{username}</td>
                <td>{nickname}</td>
                <td>{email}</td>
                <td>
                    <img onClick={ () => this.props.delUser(user_id) } src={icon_delete} title="Borrar" alt="Borrar" />
                </td>
            </tr>
        );
    }
}

export default User;