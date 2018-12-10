import React from 'react';
import { Route, Router } from 'react-router-dom';
import Callback from './Callback/Callback';
import Auth from '../Auth/Auth';
import history from '../history';

import Header from './Header';
import Navbar from './Navbar';
import UsersSection from './UsersSection';
import SingleUser from './SingleUser';
import UserForm from './UserForm';


const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}


export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div className="container">
          <Header />
          
          <Navbar auth={auth} />
          <Route exact path="/" render={ (props) => {
                  return(
                        <UsersSection 
                            auth={auth} {...props}
                        />
                  )
              }}
          />
          <Route exact path="/usuarios" render={ (props) => {
                  return(
                        <UsersSection 
                            auth={auth} {...props}
                        />
                  )
              }}
          />
          <Route exact path="/users/:userId" render={ (props) => {
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
          
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}
