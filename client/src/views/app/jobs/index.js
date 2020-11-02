import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import allJobs from "./all";
import createJob from "./create";
import graphSample from "./graph";
import jobDetail from "./detail";
import socketDemo from "./socketDemo/socketDemo";

const Jobs = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
            <Route path={`${match.url}/all`} component={allJobs} />
            <Route path={`${match.url}/graphsample`} component={graphSample} />
            <Route path={`${match.url}/create`} component={createJob} />
            <Route path={`${match.url}/socketDemo`} component={socketDemo} />
            <Route exact path={`${match.url}/:jobId`} component={jobDetail} />
            <Redirect to="/error" />
        </Switch>
    </div>
);
export default Jobs;
