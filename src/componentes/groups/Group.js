import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import icon_delete from '../../iconfinder_DeleteRed_34218.png';

class Group extends Component {

    render() {
        const {name,_id,description} =this.props.group;
        return (
            <tr>
                <td><Link to={`/groups/${_id}`}>{_id}</Link></td>
                <td>{name}</td>
                <td>{description}</td>
                <td>
                    <img onClick={ () => this.props.delUser(_id) } src={icon_delete} alt="Borrar" />
                </td>
            </tr>
        );
    }
}

export default Group;