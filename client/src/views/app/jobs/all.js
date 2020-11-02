import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "../../../helpers/IntlMessages";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Row, Button } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { fetchAllJobs, createJob } from "../../../redux/jobs/actions";
import JobListItem from "../../../components/jobs/JobListItem";
import CustomJumbotron from "../ui/custom/jumbotron";
import RightSidebarModal from "../../../components/common/Modals/RightSidebar";
import { toast } from "react-toastify";
import Toast from "../../../components/common/Toast";
class AllJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  toggleModal = () => {
    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen
    });
  };

  handleCreateJobResponse = response => {
    if (!response.isError) {
      this.setState({
        ...this.state,
        modalOpen: false
      });
    }
    console.log("Came in job creation response");
  };

  createNewJob = payload => {
    this.props.createJob({
      name: payload.name,
      callback: response => this.handleCreateJobResponse(response)
    });
  };

  onDeleteJobHandler = () => {
    toast.success("Job deleted successfully.");
  };
  componentDidMount() {
    // toast.success("app loaded");
    this.props.fetchAllJobs();
  }
  render() {
    const { jobs } = this.props;
    const { modalOpen } = this.state;
    return (
      <React.Fragment>
        <Toast />
        <Row className="survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                <IntlMessages id="menu.allJobs" />
              </h1>

              <div className="float-sm-right">
                <Button color="primary" size="lg" onClick={this.toggleModal}>
                  Add Job
                </Button>
              </div>

              <Breadcrumb match={this.props.match} />
            </div>

            <Separator className="mb-5" />

            <Row>
              {jobs && jobs.length > 0 ? (
                jobs.map((k, i) => {
                  return (
                    <JobListItem
                      key={`all_jobs_${i}`}
                      job={k}
                      onDeleteSuccess={this.onDeleteJobHandler}
                    />
                  );
                })
              ) : (
                <CustomJumbotron
                  heading={"Hi, "}
                  lead={"No jobs yet."}
                  leaddetail={
                    "Currently you haven't created any job. You can create one always."
                  }
                />
              )}
            </Row>
          </Colxx>
        </Row>

        <RightSidebarModal
          context={"create_job"}
          callback={this.createNewJob}
          title={"Create Job"}
          modalOpen={modalOpen}
          toggleModal={this.toggleModal}
        />
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
  { fetchAllJobs, createJob }
)(AllJobs);
