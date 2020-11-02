import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { fetchStageSampleData } from "../../../redux/actions";

class SampleDataPreview extends Component {
  constructor(props) {
    super(props);
  }
  handleFetchSampleDataResponse = response => {
    console.log("Fetch sample data response");
    console.log(response);
  };
  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS
  ): void {
    const { activeStage, open } = this.props;
    if (activeStage) {
      if (open) {
        this.props.fetchStageSampleData({
          stageId: activeStage.id.toString(),
          jobId: this.props.jobId,
          callback: response => this.handleFetchSampleDataResponse(response)
        });
      }
    }
  }

  componentDidMount(): void {
    console.log("In here");
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.open}
          toggle={this.props.toggleModal}
          size={"lg"}
          modalClassName={"sampleDataPreviewModal"}
        >
          <ModalBody>
            <h1>Hello World</h1>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchStageSampleData }
)(SampleDataPreview);
