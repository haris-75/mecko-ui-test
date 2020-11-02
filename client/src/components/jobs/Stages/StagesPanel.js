import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "../../../helpers/IntlMessages";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Button,
  ModalHeader,
  ModalBody,
  Modal
} from "reactstrap";

import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx } from "../../common/CustomBootstrap";
import { StageTypes } from "../../../config/graph";
import { fetchStageSampleData } from "../../../redux/actions";
import IconCard from "../../cards/IconCard";

import playButton from "../../../assets/canvas/play-button.svg";

class StagesPanel extends Component {
  constructor(props) {
    super(props);

    this.toggleFirstTab = this.toggleFirstTab.bind(this);
    this.toggleSecondTab = this.toggleSecondTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      activeSecondTab: "1",
      sampleDataModalOpen: false
    };
  }

  toggleFirstTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }
  toggleSecondTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeSecondTab: tab
      });
    }
  }

  handleFetchSampleDataResponse = response => {
    console.log("Sample data response");
    console.log(response);
  };

  fetchSampleData = () => {
    const { selectedNode } = this.props;
    if (selectedNode) {
      this.props.fetchStageSampleData({
        stageId: selectedNode.id,
        jobId: this.props.jobId,
        callback: response => this.handleFetchSampleDataResponse(response)
      });
    }
  };

  toggleSampleDataModal = (initiatedFrom = null) => {
    this.setState(
      {
        ...this.state,
        sampleDataModalOpen: !this.state.sampleDataModalOpen
      },
      () => {
        if (initiatedFrom) {
          if (initiatedFrom === "open") {
            this.fetchSampleData();
          }
        }
      }
    );
  };

  getSources = () => {
    const res = StageTypes.filter(k => k.type === "source");
    return res.map((k, i) => {
      return (
        <figure style={{ display: "inline-block" }} key={`source_shape_${i}`}>
          <img
            src={k.icon}
            alt={k.type}
            style={{
              width: "92px",
              height: "80px",
              marginBottom: "4px",
              cursor: "pointer"
            }}
            draggable={true}
            onDragStart={e =>
              this.props.onDragStart(e, {
                subType: k.subType,
                stageType: k.type
              })
            }
          />
          <figcaption style={{ textAlign: "center" }}>
            {k.displayName}
          </figcaption>
        </figure>
      );
    });
  };

  getTransformations = () => {
    const res = StageTypes.filter(k => k.type === "transformation");
    return res.map((k, i) => {
      return (
        <figure style={{ display: "inline-block" }} key={`trans_shape_${i}`}>
          <img
            src={k.icon}
            alt={k.type}
            style={{
              width: "92px",
              height: "80px",
              marginBottom: "4px",
              cursor: "pointer"
            }}
            draggable={true}
            onDragStart={e =>
              this.props.onDragStart(e, {
                subType: k.subType,
                stageType: k.type
              })
            }
          />
          <figcaption style={{ textAlign: "center" }}>
            {k.displayName}
          </figcaption>
        </figure>
      );
    });
  };

  getSinks = () => {
    const res = StageTypes.filter(k => k.type === "sink");

    return res.map((k, i) => {
      return (
        <figure style={{ display: "inline-block" }} key={`sink_shape_${i}`}>
          <img
            src={k.icon}
            alt={k.type}
            style={{
              width: "92px",
              height: "80px",
              marginBottom: "4px",
              padding: "8px",
              cursor: "pointer"
            }}
            draggable={true}
            onDragStart={e =>
              this.props.onDragStart(e, {
                subType: k.subType,
                stageType: k.type
              })
            }
          />
          <figcaption style={{ textAlign: "center" }}>
            {k.displayName}
          </figcaption>
        </figure>
      );
    });
  };
  render() {
    const { selectedNode } = this.props;
    const { sampleDataModalOpen } = this.state;
    const sources = this.getSources();
    const transformations = this.getTransformations();
    const sinks = this.getSinks();
    const previewSampleButtonEnabled = !!selectedNode;
    return (
      <Row>
        <Colxx xxs="12" lg={"12"}>
          <Modal
            isOpen={sampleDataModalOpen}
            size={"lg"}
            modalClassName={"sampleDataPreviewModal"}
            style={{ width: "100%" }}
            toggle={this.toggleSampleDataModal}
          >
            <ModalHeader toggle={this.toggleSampleDataModal}>
              Modal title
            </ModalHeader>
            <ModalBody>111</ModalBody>
          </Modal>
          {/*<CardTitle className="mb-4">*/}
          {/*    <IntlMessages id="cards.tab-card" />*/}
          {/*</CardTitle>*/}
          <Row>
            <Colxx lg="11">
              <Card className="mb-4">
                <CardHeader>
                  <Nav tabs className="card-header-tabs ">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeFirstTab === "1",
                          "nav-link": true
                        })}
                        onClick={() => {
                          this.toggleFirstTab("1");
                        }}
                        to="#"
                      >
                        Sources
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeFirstTab === "2",
                          "nav-link": true
                        })}
                        onClick={() => {
                          this.toggleFirstTab("2");
                        }}
                        to="#"
                      >
                        Transformations
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeFirstTab === "3",
                          "nav-link": true
                        })}
                        onClick={() => {
                          this.toggleFirstTab("3");
                        }}
                        to="#"
                      >
                        Sinks
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <TabContent activeTab={this.state.activeFirstTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Colxx sm="12">
                        <CardBody
                          style={{ padding: "0.5rem 1.5rem 0.2rem 1.5rem" }}
                        >
                          {sources}
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Colxx sm="12">
                        <CardBody
                          style={{ padding: "0.5rem 1.5rem 0.2rem 1.5rem" }}
                        >
                          {transformations}
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Colxx sm="12">
                        <CardBody
                          style={{ padding: "0.5rem 1.5rem 0.2rem 1.5rem" }}
                        >
                          {sinks}
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                </TabContent>
              </Card>
            </Colxx>
            <Colxx lg="1">
              <Row className="mb-2">
                <Card>
                  <CardBody>
                    <img
                      src={playButton}
                      alt={"Run job"}
                      style={{ width: "100%", cursor: "pointer" }}
                      onClick={this.props.startJob}
                    />
                    {/*<Button*/}
                    {/*    className={"btn-shadow btn btn-primary btn-sm"}*/}
                    {/*    onClick={this.props.startJob}*/}
                    {/*>*/}
                    {/*  <i className="simple-icon-control-play" />*/}
                    {/*</Button>*/}
                  </CardBody>
                </Card>
              </Row>
              {/*<Row>*/}
              {/*  <Button*/}
              {/*    className={"btn-shadow btn btn-primary btn-sm"}*/}
              {/*    disabled={!previewSampleButtonEnabled}*/}
              {/*    onClick={() => this.toggleSampleDataModal("open")}*/}
              {/*  >*/}
              {/*    <i className="simple-icon-magnifier" />{" "}*/}
              {/*  </Button>*/}
              {/*</Row>*/}
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    );
  }
}

export default connect(
  null,
  { fetchStageSampleData }
)(StagesPanel);
