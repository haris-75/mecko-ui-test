import React, { Component } from "react";
import { connect } from "react-redux";
import S3Source from "./sources/s3Source";
import HdfsSource from "./sources/hdfsSource";
import RdbmsSource from "./sources/rdbmsSource";
import Zip from "./transformations/Zip";
import Top from "./transformations/Top";
import Bottom from "./transformations/Bottom";
import Sort from "./transformations/Sort";
import Merge from "./transformations/Merge";
import Split from "./transformations/Split";
import Union from "./transformations/Union";
import TypeConversion from "./transformations/TypeConversion";
import Repartition from "./transformations/Repartition";

import S3Sink from "./sinks/s3Sink";
import HdfsSink from "./sinks/hdfsSink";
import RdbmsSink from "./sinks/rdbmsSink";

import { saveOrUpdateStage } from "../../../redux/actions";
import { toast } from "react-toastify";
import Toast from "../../common/Toast";
import SampleDataPreview from "./SampleDataPreview";
import { Button } from "reactstrap";

class StageIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSampleDataModal: false
    };
  }

  toggleSampleDataModal = () => {
    this.setState({
      ...this.state,
      showSampleDataModal: !this.state.showSampleDataModal
    });
  };

  getStageAttributes = (stages, activeStage) => {
    const id = activeStage.id;

    const result = activeStage ? stages.filter(k => k._id == id) : {};
    const r = result[0];

    return {
      name: r.name,
      comment: r.comment,
      ...r.stage_attributes
    };
  };

  handleStageUpdateResp = response => {
    if (!response.isError) {
      toast.success("Stage saved successfully.", {});
      setTimeout(() => {
        this.props.toggleModal();
      }, 1500);
    }
  };

  handleStageUpdate = payload => {
    this.props.saveOrUpdateStage({
      ...payload,
      jobId: this.props.jobId,
      stageId: this.props.activeStage.id,
      callback: response => this.handleStageUpdateResp(response)
    });
  };

  determineSource = (subType, activeStage) => {
    let content = null;
    const stageAttributes =
      this.props.jobStages &&
      this.getStageAttributes(this.props.jobStages, activeStage);

    switch (subType) {
      case "hdfs":
        content = stageAttributes && (
          <HdfsSource
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "rdbms":
        content = stageAttributes && (
          <RdbmsSource
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "s3":
        content = stageAttributes && (
          <S3Source
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
    }
    return content;
  };

  determineTransformation = (subType, activeStage) => {
    let content = null;
    const stageAttributes =
      this.props.jobStages &&
      this.getStageAttributes(this.props.jobStages, activeStage);

    switch (subType) {
      case "zip":
        content = stageAttributes && (
          <Zip attributes={stageAttributes} callback={this.handleStageUpdate} />
        );
        break;
      case "top":
        content = stageAttributes && (
          <Top attributes={stageAttributes} callback={this.handleStageUpdate} />
        );
        break;
      case "bottom":
        content = stageAttributes && (
          <Bottom
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "sort":
        content = stageAttributes && (
          <Sort
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "merge":
        content = stageAttributes && (
          <Merge
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "split":
        content = stageAttributes && (
          <Split
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "union":
        content = stageAttributes && (
          <Union
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "typeConversion":
        content = stageAttributes && (
          <TypeConversion
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "repartition":
        content = stageAttributes && (
          <Repartition
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
    }
    return content;
  };

  determineSink = (subType, activeStage) => {
    let content = null;
    const stageAttributes =
      this.props.jobStages &&
      this.getStageAttributes(this.props.jobStages, activeStage);

    switch (subType) {
      case "hdfs":
        content = stageAttributes && (
          <HdfsSink
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "s3":
        content = stageAttributes && (
          <S3Sink
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
      case "rdbms":
        content = stageAttributes && (
          <RdbmsSink
            attributes={stageAttributes}
            callback={this.handleStageUpdate}
          />
        );
        break;
    }
    return content;
  };

  determineStageComponent = () => {
    const { activeStage } = this.props;
    let content = null;
    if (activeStage) {
      const { data } = activeStage;
      if (data.stageType === "source") {
        return this.determineSource(data.subType, activeStage);
      } else if (data.stageType === "transformation") {
        return this.determineTransformation(data.subType, activeStage);
      } else if (data.stageType === "sink") {
        return this.determineSink(data.subType, activeStage);
      }
    }
    return content;
  };
  render() {
    const content = this.props.activeStage && this.determineStageComponent();
    const showSampleDataModal = this.state.showSampleDataModal;
    return (
      <div>
        <Toast />
        {this.props.activeStage && (
          <SampleDataPreview
            open={showSampleDataModal}
            activeStage={this.props.activeStage}
            jobId={this.props.jobId}
            toggleModal={this.toggleSampleDataModal}
          />
        )}
        {/*<Button*/}
        {/*  className={"primary"}*/}
        {/*  onClick={() => this.toggleSampleDataModal()}*/}
        {/*>*/}
        {/*  Get Sample Data*/}
        {/*</Button>*/}
        {content}
        {/*{this.props.activeStage && <SampleDataPreview open={showSampleDataModal} activeStage={this.props.activeStage} toggleModal={this.toggleSampleDataModal} />}*/}
        {/*<Button className={"primary"} onClick={() => this.toggleSampleDataModal()}>Get Sample Data</Button>*/}
      </div>
    );
  }
}

export default connect(
  null,
  { saveOrUpdateStage }
)(StageIndex);
