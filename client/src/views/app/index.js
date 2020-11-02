import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
import dashboards from "./dashboards";
import applications from "./applications";
import jobs from "./jobs";
import ui from "./ui";

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <Switch>
          <Redirect
            exact
            from={`${match.url}/`}
            to={`${match.url}/jobs`}
          />
          <Route path={`${match.url}/dashboards`} component={dashboards} />
          <Route path={`${match.url}/applications`} component={applications} />
          <Route path={`${match.url}/ui`} component={ui} />
          <Route path={`${match.url}/jobs`} component={jobs} />
          {/*<Route path={`${match.url}/profile`} component={profile} />*/}
          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
