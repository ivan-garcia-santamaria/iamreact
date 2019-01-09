import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { URL_USERS } from '../../constants';
import swal from 'sweetalert2';
import history from '../../history';
import MasterTables from '../masterTables/MasterTables';
import Errors from '../errors/Errors';

const masterTables = new MasterTables();
const errors = new Errors();

class UserForm extends Component {

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
            console.log(res);
            this.setState({
                groups: masterTables.translateResponse(res.data.groups)
            })
        });

        masterTables.getRoles(this.props.auth.getAccessToken()).then(res => {
            console.log(res);
            this.setState({
                roles: masterTables.translateResponse(res.data.roles)
            })
        });

        masterTables.getBrands(this.props.auth.getAccessToken()).then(res => {
            console.log(res);
            this.setState({
                brands: masterTables.translateResponseBrands(res)
            })
        });
    }

    usernameRef = React.createRef();
    passwordRef = React.createRef();
    nombreRef = React.createRef();
    apellido1Ref = React.createRef();
    apellido2Ref = React.createRef();
    sfidRef = React.createRef();

    createLocalUser = (e) => {
        e.preventDefault();

        const user = {
            given_name: this.nombreRef.current.value,
            family_name: this.apellido1Ref.current.value,
            second_family_name: this.apellido2Ref.current.value,
            name: `${this.nombreRef.current.value} ${this.apellido1Ref.current.value} ${this.apellido2Ref.current.value}`,
            user_metadata: {},
            app_metadata: {
                sfid: this.sfidRef.current.value,
                brands: masterTables.convertOptionsSimpleArray(this.state.brandsSelected)
            }
        }

        // enviar por props o petición de axios
        this.createUser(user);

    }

    addGroups = (userId) => {
        console.log(`añadiendo los grupos al usuario ${userId}`)
        return axios.patch(`${URL_USERS}/${userId}/groups`,
            masterTables.convertOptionsSimpleArray(this.state.groupsSelected), {
                headers: {
                    "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
                }
            }).then(res => {
            console.log(res);
            if (res.status === 204) {
                console.log("grupos asignados");

            }
        }).catch(error => {
            console.log("capturando error en grupos");
        });
    }

    addRoles = (userId) => {
        console.log(`añadiendo los roles al usuario ${userId}`)
        return axios.patch(`${URL_USERS}/${userId}/roles`,
            masterTables.convertOptionsSimpleArray(this.state.rolesSelected), {
                headers: {
                    "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
                }
            }).then(res => {
            console.log(res);
            if (res.status === 204) {
                console.log("roles asignados");

            }
        }).catch(error => {
            console.log("capturando error en roles");
        });
    }

    createUser = (user) => {

        console.log(`creando el usuario ${user.name}`)
        console.log(user)
        axios.post(`${URL_USERS}`, user, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
            }
        }).then(res => {
            console.log(res);
            if (res.status === 201) {

                console.log(`usuario creado ${res.data.user_id}`);
                this.addGroups(res.data.user_id).then((returnGrupos) => {
                    console.log("despues de la llamada a grupos: ",returnGrupos);

                    this.addRoles(res.data.user_id).then((returnRoles) => {
                        console.log("despues de la llamada a roles: ",returnRoles);

                        const users = [...this.props.users, res.data];

                        this.props.updateStateUsers(users)


                        swal(
                            'Usuario Creado',
                            'Se creo correctamente',
                            'success'
                        ).then(function () {
                            history.push('/users')
                            //  window.location.href = "/users/";
                        });
                    }).catch(error => {
                        this.showError(error);
                        console.log("capturando error en principal roles");
                        this.setState({
                            error

                        });
                    });
                }).catch(error => {
                    this.showError(error);
                    console.log("capturando error en principal grupos");
                    this.setState({
                        error

                    });
                });



            }
        }).catch(error => {
            errors.showError( error.response.data.error,
                              error.response.data.message);

        })
    }

    handleChangeGroups = (selectedOption) => {
        this.setState({
            groupsSelected: selectedOption
        });
    }

    handleChangeRoles = (selectedOption) => {
        this.setState({
            rolesSelected: selectedOption
        });
    }

    handleChangeBrands = (selectedOption) => {
        this.setState({
            brandsSelected: selectedOption
        });
    }

   render() {

          return (
            <div className="container">

            <form onSubmit={this.createLocalUser}>
            <div className="row">
                <legend className="text-center">Nuevo usuario</legend>
            </div>
            <div className="row">
                    <div className="col-6">
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" ref={this.usernameRef} readOnly className="form-control" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="text" ref={this.passwordRef} readOnly className="form-control" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label>SFID:</label>
                    <input type="text" ref={this.sfidRef} readOnly className="form-control" placeholder="SFID"/>
                </div>
                <hr />
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" defaultValue="ivan" ref={this.nombreRef} className="form-control" placeholder="Nombre"/>
                </div>
                <div className="form-group">
                    <label>Primer Apellido:</label>
                    <input type="text" defaultValue="garcia" ref={this.apellido1Ref} className="form-control" placeholder="Apellido1"/>
                </div>
                <div className="form-group">
                    <label>Segundo Apellido:</label>
                    <input type="text" ref={this.apellido2Ref} className="form-control" placeholder="Apellido2"/>
                </div>
                </div>
                <div className="col-6">
                <div className="form-group">
                    <label>Grupos:</label>
                <Select
                    defaultValue={[this.state.groups[1]]}
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
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
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
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
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
                <div className="col-4"></div>
                <div className="col-4">
                    <button type="submit" className="btn btn-primary">Crear</button>
                </div>
                <div className="col-4"></div>
            </div>
            </form>
            </div>
        );
    }
}

export default UserForm;