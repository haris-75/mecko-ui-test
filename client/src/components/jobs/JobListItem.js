import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../../components/common/CustomBootstrap";
import ActionModal from "../common/Modals/ActionModal";
import { deleteJob } from "../../redux/actions";
class JobListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        isOpen: false
      }
    };
  }

  toggleDeleteJobModal = () => {
    this.setState(prevState => ({
      ...this.state,
      modal: {
        ...this.state.modal,
        isOpen: !prevState.modal.isOpen
      }
    }));
  };

  handleDeleteJobResp = response => {
    if (!response.isError) {
      this.props.onDeleteSuccess();
    }
  };
  actionConfirmHandler = () => {
    this.toggleDeleteJobModal();
    this.props.deleteJob({
      jobId: this.props.job._id,
      callback: response => this.handleDeleteJobResp(response)
    });
  };
  render() {
    const { job } = this.props;
    let statusColor = null;
    if (job.status) {
      switch (job.status.toUpperCase()) {
        case "COMPLETED":
          statusColor = "success";
          break;
        case "STARTED":
          statusColor = "info";
          break;
        case "FAILED":
          statusColor = "danger";
          break;
        case "WAITING":
          statusColor = "warning";
          break;
        default:
          statusColor = null;
      }
    }
    return (
      <Colxx xxs="12">
        <Card className="card d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center card-body-catalog">
              <NavLink
                to={`/app/jobs/${job._id}`}
                className="list-item-heading mb-0 truncate w-85 w-xs-100  mb-1 mt-1"
              >
                <span className="align-middle d-inline-block">{job.name}</span>
              </NavLink>
              <div className="w-5 w-xs-100">
                <Badge color={statusColor} pill>
                  {job.status.toUpperCase()}
                </Badge>
              </div>
              <i
                className="simple-icon-trash"
                style={{ color: "red", fontSize: "1.5rem", cursor: "pointer" }}
                onClick={this.toggleDeleteJobModal}
              />{" "}
              <ActionModal
                header={"Delete Job"}
                body={"Are you sure you want to delete this job?"}
                actionButtonLabel={"Delete"}
                actionButtonColor={"danger"}
                actionConfirmed={this.actionConfirmHandler}
                isOpen={this.state.modal.isOpen}
                toggle={this.toggleDeleteJobModal}
              />
            </CardBody>
          </div>
        </Card>
      </Colxx>
    );
  }
}

export default connect(
  null,
  { deleteJob }
)(JobListItem);
