import React, { Component } from "react";
import { connect } from "react-redux";

import JobCanvas from "./graph";
import { toast } from "react-toastify";
import Toast from "../../../components/common/Toast";
import * as qs from "query-string";
import {
  createStage,
  fetchAllJobs,
  updateJobCanvas,
  deleteStage,
  startJob
} from "../../../redux/actions";

class JobDetail extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(): void {
    this.props.fetchAllJobs();
  }

  handleJobStartResponse = response => {
    if (!response.isError) {
      toast.success("Job run successfully.");
    } else {
      toast.error("Something went wrong.");
    }
  };

  stageHasConnections = (stages, stageId) => {
    console.log("stages ;;; ");
    console.log(stages);
    console.log(stageId);
    for (let i = 0; i < stages.length; i++) {
      const tempStage = stages[i];
      console.log("temp stage");
      console.log(tempStage);
      if (
        tempStage.inbound.includes(stageId.toString()) ||
        tempStage.outbound.includes(stageId.toString())
      ) {
        console.log("Came in success");
        return true;
      }
    }
    return false;
  };

  shouldJobRun = jobId => {
    /* Pre conditions */
    // 1. No orphan stage should be there.

    const stages = this.getStagesForJob(this.props.jobs, jobId);
    if (stages.length > 1) {
      const validStages = stages.filter(k =>
        this.stageHasConnections(stages, k._id)
      );
      console.log("valid stages");
      console.log(validStages);
      if (validStages.length === stages.length) {
        return true;
        // All the stages were valid
      } else {
        toast.warn("Make sure all stages are connected.");
        // TODO: toast "there is atleast one orphan node available."
        return false;
      }
    } else {
      toast.warn("Not enough stages to run the job");
      // TODO: show a toast the there are no stages in job.
      return false;
    }
  };

  startJob = payload => {
    const { jobId } = this.props.match.params;

    if (this.shouldJobRun(jobId)) {
      this.props.startJob({
        jobId,
        callback: response => this.handleJobStartResponse(response)
      });
    }
  };

  getCanvasForJob = (jobs, jobId) => {
    return jobs.filter(k => k._id === jobId)[0].canvas;
  };

  getStagesForJob = (jobs, jobId) => {
    return jobs.filter(k => k._id === jobId)[0].stages;
  };

  render() {
    const { jobs } = this.props;
    const canvas =
      jobs && this.getCanvasForJob(jobs, this.props.match.params.jobId);
    const jobStages =
      jobs && this.getStagesForJob(jobs, this.props.match.params.jobId);
    return (
      <React.Fragment>
        <Toast />
        {jobs ? (
          <JobCanvas
            createStage={this.props.createStage}
            deleteStage={this.props.deleteStage}
            jobId={this.props.match.params.jobId}
            updateCanvas={this.props.updateJobCanvas}
            jobStages={jobStages}
            canvas={canvas}
            startJob={this.startJob}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ job }) => {
  return {
    jobs: job.jobs
  };
};

export default connect(
  mapStateToProps,
  { createStage, updateJobCanvas, fetchAllJobs, deleteStage, startJob }
)(JobDetail);
