import React, { Component } from 'react';
import Select from 'react-select';
import MasterTables from '../masterTables/MasterTables';
import UsersHelper from './UsersHelper';
import { URL_USERS } from '../../constants';
import axios from 'axios';

const masterTables = new MasterTables();
const usersHelper = new UsersHelper();

class SingleUser extends Component {

    state = {
        apps: [],
        groups: [],
        roles: [],
        brands: [],
        groupsSelected: [],
        rolesSelected: [],
        brandsSelected: []
    }

    componentDidMount() {
        masterTables.getApps(this.props.auth.getAccessToken()).then(res => {
            this.setState({
                apps: masterTables.translateResponseApps(res)
            })
        });
        masterTables.getGroups(this.props.auth.getAccessToken()).then(res => {
            this.setState({
                groups: masterTables.translateResponse(res.data.groups)
            });
        });

        masterTables.getRoles(this.props.auth.getAccessToken()).then(res => {
            this.setState({
                roles: masterTables.translateResponse(res.data.roles)
            });
        });

        masterTables.getBrands(this.props.auth.getAccessToken()).then(res => {
            this.setState({
                brands: masterTables.translateResponseBrands(res)
            });
            this.getBrands();
        });

        this.getRoles().then(res => {
            console.log(res);
            this.setState({
                rolesSelected: masterTables.translateResponse(res.data)
            })
        });
    
        this.getGroups().then(res => {
            console.log(res);
            this.setState({
                groupsSelected: masterTables.translateResponse(res.data)
            })
        });
        
    }

    getBrands = () => {
        const {app_metadata} = this.props.user;
        console.log(`obteniendo los roles al usuario ${app_metadata.brands[0]}`)
        var brandsState = [];
        for( var i = 0; i < app_metadata.brands.length; i++ ) {
            const objIndex = this.state.brands.findIndex((obj => obj.value === app_metadata.brands[i]));
            console.log("index: ", objIndex);
            if (objIndex != -1) {
                brandsState.push(this.state.brands[objIndex]);
            }
        }
        this.setState({
            brandsSelected: brandsState
        })
    }


    getRoles = () => {
        const {user_id} = this.props.user;
        console.log(`obteniendo los roles al usuario ${user_id}`)
        return axios.get(`${URL_USERS}/${user_id}/roles`, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
            }
        });
    }

    getGroups = () => {
        const {user_id} = this.props.user;
        console.log(`obteniendo los grupos al usuario ${user_id}`)
        return axios.get(`${URL_USERS}/${user_id}/groups`, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
            }
        });
    }

    subtractarrays(array1, array2){
        var difference = [];
        for( var i = 0; i < array1.length; i++ ) {
            const objIndex = array2.findIndex((obj => obj.value === array1[i].value));
            console.log("index: ", objIndex);
            if (objIndex === -1) {
                difference.push(array1[i]);
            }
        }
    
        return difference;
    }   

    handleChangeGroups = (selectedOption) => {
        const {user_id} = this.props.user;
        const diff = this.subtractarrays(this.state.groupsSelected,selectedOption);
        usersHelper.delGroup(user_id,diff,this.props.auth.getAccessToken());
        const diff2 = this.subtractarrays(selectedOption,this.state.groupsSelected);
        usersHelper.addGroups(user_id,diff2,this.props.auth.getAccessToken());
        this.setState({
            groupsSelected: selectedOption
        });
    }

    handleChangeRoles = (selectedOption) => {
        const {user_id} = this.props.user;
        const diff = this.subtractarrays(this.state.rolesSelected,selectedOption);
        usersHelper.delRole(user_id,diff,this.props.auth.getAccessToken());
        const diff2 = this.subtractarrays(selectedOption,this.state.rolesSelected);
        usersHelper.addRoles(user_id,diff2,this.props.auth.getAccessToken());
        this.setState({
            rolesSelected: selectedOption
        });
    }

    handleChangeBrands = (selectedOption) => {
        this.setState({
            brandsSelected: selectedOption
        });
    }

    showUser = (props) => {
        if(!props.user) return null;
        const {user_id, username, name, blocked, last_ip, last_login, updated_at, logins_count,app_metadata } = this.props.user;


        return (
            <div className="container">
            <form onSubmit={this.createLocalUser}>
                <div className="row">
                    <legend className="text-center">{name}</legend>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" defaultValue={username} disabled className="form-control" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label>Id interno:</label>
                            <input type="text" defaultValue={user_id} disabled className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>SFID:</label>
                            <input type="text" defaultValue={app_metadata.sfid} disabled className="form-control" placeholder="SFID No asignado"/>
                        </div>
                        {blocked && (
                        <div className="form-group">
                            <label>Bloqueado</label>
                        </div>
                        )}
                    </div>
                    <hr />
                    <div className="col-6">
                        <div className="form-group">
                            <label>Grupos:</label>
                        <Select
                            value={this.state.groupsSelected}
                            isMulti
                            name="groups"
                            onChange={this.handleChangeGroups}
                            options={this.state.groups}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        </div>
                        <div className="form-group">
                            <label>Roles:</label>
                        <Select
                            value={this.state.rolesSelected}
                            isMulti
                            name="roles"
                            onChange={this.handleChangeRoles}
                            options={this.state.roles}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        </div>
                        <div className="form-group">
                            <label>Marca:</label>
                        <Select
                            value={this.state.brandsSelected}
                            isMulti
                            name="brand"
                            onChange={this.handleChangeBrands}
                            options={this.state.brands}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <p>Informacion adicional:</p>
                    <ul>
                        <li>last_login: {last_login}</li>
                        <li>updated_at: {updated_at}</li>
                        <li>logins_count: {logins_count}</li>
                        <li>last_ip: {last_ip}</li>
                    </ul>
                </div>
            </form>
            </div>
        )
   }
//    <React.Fragment>
//    </React.Fragment>

    render() {
        return (
            <div className="col-12 col-md-12">
                {this.showUser(this.props)}
            </div>
        );
    }
}

export default SingleUser;