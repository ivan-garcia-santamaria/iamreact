import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { URL_USERS, URL_GROUPS,URL_ROLES, URL_BRANDS, URL_APPS, URL_PERMISSIONS } from '../../constants';
import swal from 'sweetalert2';
import history from '../../history';


class UserForm extends Component {

    state = {
        apps: [],
        groups: [],
        roles: [],
        permissions: [],
        brands: [],
        groupsSelected: [],
        rolesSelected: [],
        permissionsSelected: [],
        brandsSelected: [],
        error: null
    }

    componentDidMount() {
        this.getApps();
        this.getGroups();
        this.getRoles();
        this.getPermissions();
        this.getBrands();
    }

    translateResponse = (resArr) => {
        console.log(resArr);
        var arr = [];
        for (var key in resArr) {
            const opcion = {
                value: resArr[key]._id,
                label: resArr[key].name
            }
            arr.push(opcion);
        }
        return arr;
    }

    translateResponseApps = (res) => {
        console.log(res);
        var arr = [];
        for (var key in res.data) {
            const opcion = {
                value: res.data[key].client_id,
                label: res.data[key].name
            }
            arr.push(opcion);
        }
        return arr;
    }

    translateResponseBrands = (res) => {
        console.log(res);
        var arr = [];
        for (var key in res.data) {
            const opcion = {
                value: res.data[key].id,
                label: res.data[key].name
            }
            arr.push(opcion);
        }
        return arr;
    }

    getApps = () => {
        console.log("buscando apPs");
        axios.get(`${URL_APPS}`, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
            }

        }).then(res => {
            var arr = this.translateResponseApps(res);
            this.setState({
                apps: arr
            })
        })
    }

    getGroups = () => {
        console.log("buscando grupos");
        axios.get(`${URL_GROUPS}`, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
            }
        }).then(res => {
            var arr = this.translateResponse(res.data.groups);
            this.setState({
                groups: arr
            })
        })
    }

    getRoles = () => {
        console.log("buscando roles");
        axios.get(`${URL_ROLES}`, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
            }
        }).then(res => {
            var arr = this.translateResponse(res.data.roles);
            this.setState({
                roles: arr
            })
        })
    }

    getPermissions = () => {
        console.log("buscando permissions");
        axios.get(`${URL_PERMISSIONS}`, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
            }
        }).then(res => {
            var arr = this.translateResponse(res.data.permissions);
            this.setState({
                permissions: arr
            })
        })
    }

    getBrands = () => {
        console.log("buscando brands");
        axios.get(`${URL_BRANDS}`, {
            headers: {}
        }).then(res => {
            var arr = this.translateResponseBrands(res);
            this.setState({
                brands: arr
            })
        })
    }

    usernameRef = React.createRef();
    passwordRef = React.createRef();
    nombreRef = React.createRef();
    apellido1Ref = React.createRef();
    apellido2Ref = React.createRef();
    emailRef = React.createRef();

    createLocalUser = (e) => {
        e.preventDefault();

        const user = {
            connection: 'Username-Password-Authentication',
            email: this.emailRef.current.value,
            given_name: this.nombreRef.current.value,
            family_name: `${this.apellido1Ref.current.value} ${this.apellido2Ref.current.value}`,
            name: `${this.nombreRef.current.value} ${this.apellido1Ref.current.value} ${this.apellido2Ref.current.value}`,
            username: this.usernameRef.current.value,
            password: this.passwordRef.current.value,
            user_metadata: {},
            verify_email: true,
            blocked: true,
            app_metadata: {
                brands: this.convertOptionsSimpleArray(this.state.brandsSelected)
            }
        }

        // enviar por props o petición de axios
        this.createUser(user);

    }

    convertOptionsSimpleArray = (options) => {
        var arr = [];
        for (var key in options) {
            arr.push(options[key].value);
        }
        return arr;
    }

    addGroups = (userId) => {
        console.log(`añadiendo los grupos al usuario ${userId}`)
        return axios.patch(`${URL_USERS}/${userId}/groups`,
            this.convertOptionsSimpleArray(this.state.groupsSelected), {
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
            this.setState({
                error
            });
        });
    }

    addRoles = (userId) => {
        console.log(`añadiendo los roles al usuario ${userId}`)
        return axios.patch(`${URL_USERS}/${userId}/roles`,
            this.convertOptionsSimpleArray(this.state.rolesSelected), {
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
            this.setState({
                error
            });
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
            console.log(error);
            this.showError(error);

        })
    }

    showError = (error) => {
        swal({
            type: 'error',
            title: error.response.data.error,
            text: error.response.data.message
            // footer: '<a href>Why do I have this issue?</a>'
        });
    }

    handleChangeGroups = (selectedOption) => {
        console.log(`Option selected: `, selectedOption);
        console.log(JSON.stringify(selectedOption));
        this.setState({
            groupsSelected: selectedOption
        });
    }

    handleChangeRoles = (selectedOption) => {
        console.log(`Option selected: `, selectedOption);
        this.setState({
            rolesSelected: selectedOption
        });
    }

    handleChangePermissions = (selectedOption) => {
        console.log(`Option selected: `, selectedOption);
        this.setState({
            permissionsSelected: selectedOption
        });
    }

    handleChangeBrands = (selectedOption) => {
        console.log(`Option selected: `, selectedOption);
        this.setState({
            brandsSelected: selectedOption
        });
    }

   render() {
        // const colourOptions = [
        //     { value: 'chocolate', label: 'Chocolate' },
        //     { value: 'strawberry', label: 'Strawberry' },
        //     { value: 'vanilla', label: 'Vanilla' },
        //     { value: 'vanilla2', label: 'Vanilla2' },
        //     { value: 'vanilla3', label: 'Vanilla3' }
        //   ];

          return (
            <form onSubmit={this.createLocalUser} className="col-8">
                <legend className="text-center">Nuevo usuario</legend>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" defaultValue="ivan" ref={this.usernameRef} className="form-control" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="text" defaultValue="ivan2018@" ref={this.passwordRef} className="form-control" placeholder="Password"/>
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
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" defaultValue="garcia@gmail.com" ref={this.emailRef} className="form-control" placeholder="Email"/>
                </div>
                <hr/>
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
                    <label>Permisos:</label>
                <Select
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    name="permissions"
                    onChange={this.handleChangePermissions}
                    options={this.state.permissions}
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
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        );
    }
}

export default UserForm;