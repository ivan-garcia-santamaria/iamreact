import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class User extends Component {

    render() {
        const {name,user_id,email,nickname,username} =this.props.user;
        return (
            <tr>
                <td>{user_id}</td>
                <td>{name}</td>
                <td>{username}</td>
                <td>{nickname}</td>
                <td>{email}</td>
                <td>
                    <Link to={`/users/${user_id}`} className="btn btn-primary"> Ver</Link>
                    <button onClick={ () => this.props.delUser(user_id) } type="button" className="btn btn-danger">Borrar</button>
                </td>
            </tr>
        );
    }
}

export default User;