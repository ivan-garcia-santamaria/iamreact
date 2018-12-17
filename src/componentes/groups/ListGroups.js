import React, { Component } from 'react';
import Group from './Group';

class ListGroups extends Component {

    showGroups = () => {
        const groups = this.props.groups;

        return (
            <React.Fragment>
                {Object.keys(groups).map(group => (
                   <Group 
                        key = {group}
                        group = {this.props.groups[group]}
                        delUser = {this.props.delUser}
                        auth= {this.props.auth}
                        />
                )

                )}
            </React.Fragment>
        );
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr> 
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Acciones</th>
                    </tr> 
                </thead>
                <tbody>
                    {this.showGroups() }
                </tbody>
            </table>
        );
    }
}

export default ListGroups;