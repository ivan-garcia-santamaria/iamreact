import React, { Component } from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import GroupsSection from './groups/GroupsSection';
import ProfilesSection from './profiles/ProfilesSection';
import PermissionsSection from './permissions/PermissionsSection';
import RolesSection from './roles/RolesSection';
import UsersSection from './users/UsersSection';
import SingleUser from './users/SingleUser';
import UserForm from './users/UserForm';
import Auth from '../Auth/Auth';
import history from '../history';
import Callback from './Callback/Callback';
import Home from './Home';


const auth = new Auth();

const handleAuthentication = ({location}) => {
     if (/access_token|id_token|error/.test(location.hash)) {
       auth.handleAuthentication();
     }
 }

class Routers extends Component {
     state = { 
          auth0_domain: 'masmovil.eu.auth0.com',
          auth0_token: ''

      }


 
     

     render() { 
          return ( 
               <Router history={history}>
               <div className="container">
                 <Header />
                 
                 <Navbar auth={auth} />
                 <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
                 <Route path="/" render={(props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/home"/>
                    ) : (
                        // <Profile auth={auth} {...props} />
                        <Redirect to="/users"/>
                    )
                 )} />
                 <Route exact path="/users/" render={ (props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/home"/>
                    ) : (
                        <UsersSection 
                        auth={auth} {...props}                        
                        />
                     )
                 )}
                 />
                 <Route exact path="/users/:userId" render={ (props) => {
                     if (!auth.isAuthenticated()) {
                        return (<Redirect to="/home"/>)
                     }else {
                     let userId = props.location.pathname.replace('/users/','');
       
                     const users = this.state.users;
       
                     let filtro;
                     filtro = users.filter(user => (
                           user.user_id === userId
                     ))
       
                     return(
                           <SingleUser
                               user = {filtro[0]} 
                               auth={auth} {...props}
                           />
                           
                     )
                     }
                 }}
                 />
                 <Route exact path="/createUser" render={ (props) => {
                         return(
                             <UserForm 
                               auth={auth} {...props}
                             />
                         )
                 }}
                 />

                 {/* grupos */}

                 <Route exact path="/groups/" render={ (props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/home"/>
                    ) : (
                        <GroupsSection 
                        auth={auth} {...props}
                        />
                     )
                 )}
                 />

                 {/* perfiles */}

                 <Route exact path="/profiles/" render={ (props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/home"/>
                    ) : (
                        <ProfilesSection 
                        auth={auth} {...props}
                        />
                     )
                 )}
                 />

                 {/* permisos */}

                 <Route exact path="/permissions/" render={ (props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/home"/>
                    ) : (
                        <PermissionsSection 
                            auth={auth} {...props}
                        />
                     )
                 )}
                 />

                 {/* roles */}

                 <Route exact path="/roles/" render={ (props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/home"/>
                    ) : (
                        <RolesSection 
                            auth={auth} {...props}
                        />
                     )
                 )}
                 />

                 <Route path="/callback" render={(props) => {
                   handleAuthentication(props);
                   return <Callback {...props} /> 
                 }}/>
               </div>
             </Router>
                  );
     }
}
 
export default Routers;