import React, { Component } from 'react';

class SingleUser extends Component {

    showUser = (props) => {
        if(!props.user) return null;
        const {user_id, nickname, username, name, email, last_ip, last_login, updated_at, logins_count } = this.props.user;

        return (
             <React.Fragment>
                  <h1>{user_id}</h1>
                  <p>nickname: {nickname}</p>
                  <p>username: {username}</p>
                  <p>name: {name}</p>
                  <p>email: {email}</p>
                  <hr />
                  <p>last_login: {last_login}</p>
                  <p>updated_at: {updated_at}</p>
                  <p>logins_count: {logins_count}</p>
                  <p>last_ip: {last_ip}</p>
                  
             </React.Fragment>
        )
   }

    render() {
        return (
            <div className="col-12 col-md-8">
                {this.showUser(this.props)}
            </div>
        );
    }
}

export default SingleUser;