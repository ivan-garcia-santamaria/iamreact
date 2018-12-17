import React, { Component } from 'react';
import Profile from './Profile';

class ListProfiles extends Component {

    showProfiles = () => {
        const profiles = this.props.profiles;

        return (
            <React.Fragment>
                {Object.keys(profiles).map(profile => (
                   <Profile 
                        key = {profile}
                        profile = {this.props.profiles[profile]}
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
                    {this.showProfiles() }
                </tbody>
            </table>
        );
    }
}

export default ListProfiles;