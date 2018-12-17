import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Group extends Component {

    render() {
        const {name,id,description} =this.props.group;
        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{description}</td>
                <td>
                    <Link to={`/groups/${id}`} className="btn btn-primary"> Ver</Link>
                    <button onClick={ () => this.props.delUser(id) } type="button" className="btn btn-danger">Borrar</button>
                </td>
            </tr>
        );
    }
}

export default Group;