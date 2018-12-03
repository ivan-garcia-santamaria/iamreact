import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';

class User extends Component {

    // delUser = () => {
    //     const {name,user_id,email,nickname,username} =this.props.user;
        
    //     swal({
    //         title: `Estas seguro??`,
    //         text: `Esta acción no se puede deshacer! Vas a borrar a ${name}`,
    //         type: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Si, borrar!',
    //         cancelButtonText : 'Cancelar'
    //     }).then((result) => {
    //         if (result.value) {
    //             this.props.delUser(user_id);
    //             swal(
    //                 'Eliminado!',
    //                 'El usuario se ha eliminado.',
    //                 'success'
    //             )
    //         }
    //     })
    
    // }

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