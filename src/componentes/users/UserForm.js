import React, { Component } from 'react';
import swal from 'sweetalert2';
import axios from 'axios';
import Select from 'react-select';

class UserForm extends Component {

    state = { 
        groups: [],
        roles: []
    }

    componentDidMount() {
        this.getGroups();
    }

    getGroups = () => {
        console.log("buscando grupos");
        axios.get(`https://vertx.lab.ovid-project.com/iam/v1/groups/`,
         {headers: {
           }
         }).then(res => {
            var arr = [];
            for (var key in res.data) {
                const opcion = {
                   value: res.data[key].id,
                   label: res.data[key].name
                }
                arr.push(opcion);
            }
            this.setState({
                groups: arr
            })
         })
   }

    usernameRef = React.createRef();
    passwordRef = React.createRef();
    nombreRef = React.createRef();
    apellido1Ref = React.createRef();
    apellido2Ref = React.createRef();
    emailRef = React.createRef();

    launchCreateUser = (user) => {
        console.log(`creando el usuario ${user.name}`)
        console.log(user)
        axios.post(`https://${this.state.auth0_domain}/api/v2/users`, user,
         {headers: {
             "Authorization" : `Bearer ${this.state.auth0_token}`
           }
         }).then(res => {
              console.log(res);
              if (res.status === 201) {
                  const users = [...this.state.users,res];
      
                  this.setState({
                      users
                 })
      
                 swal(
                       'Usuario Creado',
                       'Se creo correctamente',
                       'success'
                   ).then(function(){
                       window.location.href = "/";
                   });
      
              }
        }).catch(error => {
             swal({
                  type: 'error',
                  title: error.response.data.error,
                  text: error.response.data.message 
                  // footer: '<a href>Why do I have this issue?</a>'
                  });
      
        })
      }

    createUser = (e) => {
        e.preventDefault();

        // leer los refs
        const user = {
            connection: 'Username-Password-Authentication',
            email: this.emailRef.current.value,
            given_name: this.nombreRef.current.value,
            family_name: `${this.apellido1Ref.current.value} ${this.apellido2Ref.current.value}`,
            name: `${this.nombreRef.current.value} ${this.apellido1Ref.current.value} ${this.apellido2Ref.current.value}`,
            username: this.usernameRef.current.value,
            password: this.passwordRef.current.value,
            user_metadata: { 
                roles: [
                      "basic"
                  ],
                  groups: ["emergia"]},
            verify_email: true,
            blocked: true,
            app_metadata: {}
        }

        // enviar por props o petición de axios
        this.launchCreateUser(user);
     
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
            <form onSubmit={this.createUser} className="col-8">
                <legend className="text-center">Nuevo usuario</legend>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" ref={this.usernameRef} className="form-control" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="text" ref={this.passwordRef} className="form-control" placeholder="Password"/>
                </div>
                <hr />
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" ref={this.nombreRef} className="form-control" placeholder="Nombre"/>
                </div>
                <div className="form-group">
                    <label>Primer Apellido:</label>
                    <input type="text" ref={this.apellido1Ref} className="form-control" placeholder="Apellido1"/>
                </div>
                <div className="form-group">
                    <label>Segundo Apellido:</label>
                    <input type="text" ref={this.apellido2Ref} className="form-control" placeholder="Apellido2"/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" ref={this.emailRef} className="form-control" placeholder="Email"/>
                </div>
                <hr/>
                <div className="form-group">
                    <label>Grupos:</label>
                <Select
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    name="colors"
                    options={this.state.groups}
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