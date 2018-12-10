import React, { Component } from 'react';
import {makeMainRoutes} from './componentes/routes';

const routes = makeMainRoutes();

class AppAuth0 extends Component {
  render() {
    return (
      <React.Fragment>
        {routes}
      </React.Fragment>
    );
  }
}

export default AppAuth0;
