import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Profile extends Component {

    render() {
        const {name,id,description} =this.props.profile;
        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{description}</td>
                <td>
                    <Link to={`/profiles/${id}`} className="btn btn-primary"> Ver</Link>
                    <button onClick={ () => this.props.delUser(id) } type="button" className="btn btn-danger">Borrar</button>
                </td>
            </tr>
        );
    }
}

export default Profile;