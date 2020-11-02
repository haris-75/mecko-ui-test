import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import dataListPages from "./data-list";
import allWorkspaces from "./all";
import create from "./create";
import thumbListPages from "./thumb-list";
import imageListPages from "./image-list";
import detailsPages from "./detail";
import searchPages from "./search";
import mailingPages from "./mailing";
import invoicePages from "./invoice";

const Workspaces = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/allWorkspaces`}
      />
      <Route path={`${match.url}/allWorkspaces`} component={allWorkspaces} />
      <Route path={`${match.url}/create-workspace`} component={create} />
      <Route path={`${match.url}/search`} component={searchPages} />
      <Route path={`${match.url}/thumb-list`} component={thumbListPages} />
      <Route path={`${match.url}/image-list`} component={imageListPages} />
      <Route path={`${match.url}/details`} component={detailsPages} />
      <Route path={`${match.url}/search`} component={searchPages} />
      <Route path={`${match.url}/mailing`} component={mailingPages} />
      <Route path={`${match.url}/invoice`} component={invoicePages} />
      <Route
        exact
        path={`${match.url}/:workspaceId`}
        component={detailsPages}
      />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Workspaces;
