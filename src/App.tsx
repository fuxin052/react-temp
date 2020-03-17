import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from 'src/components/login';
import RenderRouter from './renderRouter';
import { connect } from 'react-redux';



export default connect(
  ({ login }: any) => ({ login }),
)(({ login }: { login: boolean }) => <Router>
  <Switch>
    {
      login ? <Redirect to="/" /> :
        <>
          <Redirect to="/login" />
          <Route exact path="/login" component={Login} />
        </>
    }
    <Route exact path="/*" component={RenderRouter} />
  </Switch>
</Router>);
