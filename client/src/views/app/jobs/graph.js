// @flow
/*
  Copyright(c) 2018 Uber Technologies, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

          http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/*
  Example usage of GraphView component
*/

import React from "react";
import { StageTypes } from "../../../config/graph";
import StagesPanel from "../../../components/jobs/Stages/StagesPanel";

import * as qs from "query-string";

import {
  GraphView,
  type IEdgeType as IEdge,
  type INodeType as INode,
  type LayoutEngineType
} from "react-digraph";
import GraphConfig, {
  EMPTY_EDGE_TYPE,
  NODE_KEY,
  SPECIAL_EDGE_TYPE,
  SPECIAL_TYPE,
  S3_SOURCE_TYPE,
  HADOOP_SOURCE_TYPE,
  RDBMS_SOURCE_TYPE,
  S3_SINK_TYPE,
  HADOOP_SINK_TYPE,
  RDBMS_SINK_TYPE,
  ZIP_TRANSFORMATION_TYPE,
  TOP_TRANSFORMATION_TYPE,
  BOTTOM_TRANSFORMATION_TYPE,
  MERGE_TRANSFORMATION_TYPE,
  SPLIT_TRANSFORMATION_TYPE,
  SORT_TRANSFORMATION_TYPE,
  UNION_TRANSFORMATION_TYPE,
  FORMULA_TRANSFORMATION_TYPE,
  PARTITION_TRANSFORMATION_TYPE,
  FILTER_TRANSFORMATION_TYPE,
  TYPE_TRANSFORMATION_TYPE
} from "./graph-config";
import RightSidebarModal from "../../../components/common/Modals/RightSidebar";
import { toast } from "react-toastify";
import Toast from "../../../components/common/Toast"; // Configures node/edge types

type IGraph = {
  nodes: INode[],
  edges: IEdge[]
};

// NOTE: Edges must have 'source' & 'target' attributes
// In a more realistic use case, the graph would probably originate
// elsewhere in the App or be generated from some other state upstream of this component.
type IGraphState = {
  graph: any,
  selected: any,
  totalNodes: number,
  copiedNode: any,
  layoutEngineType?: LayoutEngineType
};

class Graph extends React.Component<IGraphProps, IGraphState> {
  GraphView;

  constructor(props) {
    super(props);
    this.state = {
      copiedNode: null,
      nodeCreated: null,
      nodeClicked: {
        count: 0,
        id: null
      },
      mousePosition: {
        x: 0,
        y: 0
      },
      modalOpen: false,
      modalTitle: "",
      graph: this.props.canvas,
      layoutEngineType: undefined,
      selected: null
    };
    this.GraphView = React.createRef();
  }

  toggleModal = () => {
    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen
    });
  };

  // Helper to find the index of a given node
  getNodeIndex(searchNode: INode | any) {
    return this.state.graph.nodes.findIndex(node => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  }

  // Helper to find the index of a given edge
  getEdgeIndex(searchEdge: IEdge) {
    return this.state.graph.edges.findIndex(edge => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  }

  // Given a nodeKey, return the corresponding node
  getViewNode(nodeKey: string) {
    const searchNode = {};

    searchNode[NODE_KEY] = nodeKey;
    const i = this.getNodeIndex(searchNode);

    return this.state.graph.nodes[i];
  }

  makeItLarge = () => {
    const graph = this.state.graph;
    // const generatedSample = generateSample(this.state.totalNodes);

    this.setState(this.state);
  };

  addStartNode = () => {
    const graph = this.state.graph;

    // using a new array like this creates a new memory reference
    // this will force a re-render
    graph.nodes = [
      {
        id: Date.now(),
        title: "Node A",
        type: SPECIAL_TYPE,
        x: 0,
        y: 0
      },
      ...this.state.graph.nodes
    ];
    this.setState(
      {
        graph
      },
      () => {
        this.saveUpdatedCanvas();
      }
    );
  };
  deleteStartNode = () => {
    const graph = this.state.graph;

    graph.nodes.splice(0, 1);
    // using a new array like this creates a new memory reference
    // this will force a re-render
    graph.nodes = [...this.state.graph.nodes];
    this.setState(
      {
        graph
      },
      () => {
        this.saveUpdatedCanvas();
      }
    );
  };

  handleChange = (event: any) => {
    this.setState(
      {
        totalNodes: parseInt(event.target.value || "0", 10)
      },
      this.makeItLarge
    );
  };

  /*
   * Handlers/Interaction
   */

  // Called by 'drag' handler, etc..
  // to sync updates from D3 with the graph
  onUpdateNode = (viewNode: INode) => {
    console.log("Came in update handler");
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({ graph }, () => {
      this.saveUpdatedCanvas();
    });
  };

  // Node 'mouseUp' handler
  onSelectNode = (viewNode: INode | null, event) => {
    if (viewNode) {
      this.setState(
        {
          ...this.state,
          selected: viewNode
        },
        () => {
          if (event && event.srcElement) {
            if (event.srcElement.className === "simple-icon-pencil") {
              this.setState(
                {
                  selected: viewNode
                },
                () => {
                  this.toggleModal();
                }
              );
            } else if (event.srcElement.className === "simple-icon-close") {
              let newNodes = [...this.state.graph.nodes];
              newNodes = newNodes.filter(k => k.id !== viewNode.id);
              this.onDeleteNode(viewNode, viewNode.id, newNodes);
            }
          }
        }
      );
    }
  };

  // Edge 'mouseUp' handler
  onSelectEdge = (viewEdge: IEdge) => {
    this.setState({ selected: viewEdge });
  };

  determineNodeShapeType = (type, subType) => {
    if (type === "source") {
      switch (subType) {
        case "s3":
          return S3_SOURCE_TYPE;
        case "hdfs":
          return HADOOP_SOURCE_TYPE;
        case "rdbms":
          return RDBMS_SOURCE_TYPE;
      }
    } else if (type === "transformation") {
      switch (subType) {
        case "zip":
          return ZIP_TRANSFORMATION_TYPE;
        case "top":
          return TOP_TRANSFORMATION_TYPE;
        case "bottom":
          return BOTTOM_TRANSFORMATION_TYPE;
        case "merge":
          return MERGE_TRANSFORMATION_TYPE;
        case "split":
          return SPLIT_TRANSFORMATION_TYPE;
        case "sort":
          return SORT_TRANSFORMATION_TYPE;
        case "union":
          return UNION_TRANSFORMATION_TYPE;
        case "formula":
          return FORMULA_TRANSFORMATION_TYPE;
        case "typeConversion":
          return TYPE_TRANSFORMATION_TYPE;
        case "repartition":
          return PARTITION_TRANSFORMATION_TYPE;
        case "filter":
          return FILTER_TRANSFORMATION_TYPE;
      }
    } else if (type === "sink") {
      switch (subType) {
        case "s3":
          return S3_SINK_TYPE;
        case "hdfs":
          return HADOOP_SINK_TYPE;
        case "rdbms":
          return RDBMS_SINK_TYPE;
      }
    }

    return SPECIAL_TYPE;
  };

  // Updates the graph with a new node
  onCreateNode = (x: number, y: number, event, payload) => {
    if (event.type === "drop") {
      const graph = this.state.graph;

      console.log("on creation node");
      const graphDiv = document.getElementById("graph");
      const position = graphDiv.getBoundingClientRect();

      const xPos = this.state.mousePosition.x; // - position.x;
      const yPos = this.state.mousePosition.y; // - position.y;

      console.log(x + " >> " + y);
      const viewNode = {
        id: Date.now(),
        title: payload.subType,
        x,
        y,
        type: this.determineNodeShapeType(payload.stageType, payload.subType),
        data: {
          ...payload
        }
      };

      console.log(viewNode);
      graph.nodes = [...graph.nodes, viewNode];
      this.setState({ graph }, () => {
        this.saveUpdatedCanvas();
        this.props.createStage({
          jobId: this.props.jobId,
          stageType: payload.stageType,
          subType: payload.subType,
          stageId: viewNode.id,
          callback: response => this.handleCreateStageResponse(response)
        });
      });
    }
  };

  // Deletes a node from the graph
  onDeleteNode = (viewNode: INode, nodeId: string, nodeArr: INode[]) => {
    const graph = this.state.graph;
    // Delete any connected edges
    const newEdges = graph.edges.filter((edge, i) => {
      return (
        edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
      );
    });

    graph.nodes = nodeArr;
    graph.edges = newEdges;

    this.setState({ graph, selected: null }, () => {
      this.props.deleteStage({
        jobId: this.props.jobId,
        stageId: viewNode.id,
        callback: response => this.handleDeleteStageResponse(response)
      });
    });
  };

  shouldCreateEdge = (source, target) => {
    const sourceNodeType = source.data.stageType;
    const targetNodeType = target.data.stageType;

    if (sourceNodeType === "source" && targetNodeType === "sink") {
      return true;
    }

    if (sourceNodeType === "source" && targetNodeType === "transformation") {
      return true;
    }

    if (sourceNodeType === "transformation" && targetNodeType === "sink") {
      return true;
    }

    if (
      sourceNodeType === "transformation" &&
      targetNodeType === "transformation"
    ) {
      return true;
    }

    return false;
  };

  canCreateEdge = (startNode, endNode) => {
    return true;
  };

  // Creates a new node between two edges
  onCreateEdge = (sourceViewNode: INode, targetViewNode: INode) => {
    const graph = this.state.graph;
    // This is just an example - any sort of logic
    // could be used here to determine edge type
    const type =
      sourceViewNode.type === SPECIAL_TYPE
        ? SPECIAL_EDGE_TYPE
        : EMPTY_EDGE_TYPE;

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type: EMPTY_EDGE_TYPE
    };

    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      if (this.shouldCreateEdge(sourceViewNode, targetViewNode)) {
        graph.edges = [...graph.edges, viewEdge];
        this.setState(
          {
            graph,
            selected: viewEdge
          },
          () => {
            this.saveUpdatedCanvas("edge_created", {
              sourceId: viewEdge.source,
              targetId: viewEdge.target
            });
          }
        );
      } else {
        toast.warn("Invalid edge type.");
      }
    }
  };

  // Called when an edge is reattached to a different target.
  onSwapEdge = (
    sourceViewNode: INode,
    targetViewNode: INode,
    viewEdge: IEdge
  ) => {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    graph.edges[i] = edge;
    // reassign the array reference if you want the graph to re-render a swapped edge
    graph.edges = [...graph.edges];

    this.setState(
      {
        graph,
        selected: edge
      },
      () => {
        this.saveUpdatedCanvas();
      }
    );
  };

  // Called when an edge is deleted
  onDeleteEdge = (viewEdge: IEdge, edges: IEdge[]) => {
    const graph = this.state.graph;

    graph.edges = edges;
    this.setState(
      {
        graph,
        selected: null
      },
      () => {
        this.saveUpdatedCanvas("edge_deleted", {
          sourceId: viewEdge.source,
          targetId: viewEdge.target
        });
      }
    );
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDragStart = (e, payload) => {
    e.dataTransfer.setData("payload", JSON.stringify(payload));
  };

  onDropElement = e => {
    e.preventDefault();

    // console.log("Graph Div");

    const graphDiv = document.getElementById("graph");
    let position = graphDiv.getBoundingClientRect();
    // console.log(position);
    //
    // console.log(graphDiv);
    const payload = JSON.parse(e.dataTransfer.getData("payload"));
    this.setState({
      ...this.state,
      nodeCreated: payload.nType
    });

    this.onCreateNode(e.pageX - position.x, e.pageY - position.y, e, payload);
  };

  saveUpdatedCanvas = (opType = null, opPayload = null) => {
    let payload = {
      jobId: this.props.jobId,
      updatedCanvas: this.state.graph
    };

    if (
      opType === "edge_created" ||
      opType === "edge_deleted" ||
      opType === "stage_deleted"
    ) {
      payload["info"] = {
        type: opType,
        data: opPayload
      };
    }
    this.props.updateCanvas(payload);
  };

  handleDeleteStageResponse = response => {
    if (!response.isError) {
      toast.success("Stage has been deleted successfully.");
      this.saveUpdatedCanvas("stage_deleted", {
        stageId: response.stageId
      });
    }
  };
  handleCreateStageResponse = response => {
    if (!response.isError) {
      toast.success("Stage has been created successfully.");
    }
  };

  handleMouseMove = e => {
    const graphDiv = document.getElementById("graph");
    const position = graphDiv.getBoundingClientRect();
    // console.log(`${e.pageX - position.x} >> ${e.pageY - position.y}`);
    this.setState({
      ...this.state,
      mousePosition: {
        ...this.state.mousePosition,
        x: Math.abs(e.pageX - position.x),
        y: Math.abs(e.pageY - position.y)
      }
    });
  };

  /*
   * Render
   */

  render() {
    const { nodes, edges } = this.state.graph;
    const { modalOpen, modalTitle } = this.state;
    const selected = this.state.selected;
    const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

    return (
      <React.Fragment>
        <Toast />
        <div>
          <StagesPanel
            onDragStart={this.onDragStart}
            startJob={this.props.startJob}
            selectedNode={selected}
            jobId={this.props.jobId}
          />
        </div>
        <br></br>
        <div
          id="graph"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDropElement(e)}
          onMouseMove={e => this.handleMouseMove(e)}
        >
          <GraphView
            ref={el => (this.GraphView = el)}
            nodeKey={NODE_KEY}
            readOnly={false}
            nodes={nodes}
            edges={edges}
            selected={selected}
            nodeTypes={NodeTypes}
            nodeSubtypes={NodeSubtypes}
            edgeTypes={EdgeTypes}
            onSelectNode={this.onSelectNode}
            onCreateNode={this.onCreateNode}
            onUpdateNode={this.onUpdateNode}
            onDeleteNode={this.onDeleteNode}
            onSelectEdge={this.onSelectEdge}
            onCreateEdge={this.onCreateEdge}
            canCreateEdge={this.canCreateEdge}
            onSwapEdge={this.onSwapEdge}
            onDeleteEdge={this.onDeleteEdge}
            showGraphControls={true}
            minZoom={0}
            maxZoom={0}
            gridDotSize={1}
            renderNodeText={data => {
              const { selected } = this.state;
              if (selected) {
                if (data.id === this.state.selected.id) {
                  let x = -35,
                    y = -125;
                  data && data.data && data.data.stageType === "sink"
                    ? (y = -110)
                    : (y = -125);
                  return (
                    <React.Fragment>
                      <foreignObject x={x} y={y} width="200" height="50">
                        <div
                          className="node"
                          style={{
                            float: "left",
                            backgroundColor: "grey",
                            padding: "8px",
                            borderRadius: "2px"
                          }}
                        >
                          <i
                            className={"simple-icon-pencil"}
                            style={{
                              cursor: "pointer",
                              color: "white",
                              fontSize: "1.5rem"
                            }}
                          />
                          <i
                            className={"simple-icon-close"}
                            style={{
                              cursor: "pointer",
                              color: "white",
                              fontSize: "1.5rem"
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: "-20px",
                              left: "20px",
                              width: "0px",
                              height: "0px",
                              border:
                                "solid 2px #a0c7ff transparent transparent transparent"
                            }}
                          ></div>
                        </div>
                      </foreignObject>
                    </React.Fragment>
                  );

                  // if (data.data.stageType === "sink") {
                  //   return (
                  //     <React.Fragment>
                  //       <foreignObject x="-40" y="-105" width="200" height="50">
                  //         <div className="node" style={{float: "left", backgroundColor: "#4A90E1", padding: "8px", borderRadius: "5px"}}>
                  //           <i
                  //             className={"simple-icon-pencil"}
                  //             style={{
                  //               cursor: "pointer",
                  //               color: "white",
                  //               fontSize: "1.5rem"
                  //             }}
                  //           />
                  //           <i
                  //               className={"simple-icon-trash"}
                  //               style={{
                  //                 cursor: "pointer",
                  //                 color: "white",
                  //                 fontSize: "1.5rem"
                  //               }}
                  //           />
                  //           <div style={{position: "absolute", bottom: "-20px", left: "20px", width: "0px", height: "0px", border : "solid 2px #a0c7ff transparent transparent transparent"}}></div>
                  //         </div>
                  //       </foreignObject>
                  //
                  //     </React.Fragment>
                  //   );
                  // } else {
                  //   return (
                  //     <React.Fragment>
                  //       <foreignObject x="-80" y="-50" width="200" height="50">
                  //         <div className="node">
                  //           <i
                  //             className={"simple-icon-pencil"}
                  //             style={{
                  //               cursor: "pointer",
                  //               color: "grey",
                  //               fontSize: "2rem"
                  //             }}
                  //           />
                  //         </div>
                  //       </foreignObject>
                  //       <foreignObject x="55" y="-50" width="200" height="50">
                  //         <div className="node">
                  //           <i
                  //             className={"simple-icon-trash"}
                  //             style={{
                  //               cursor: "pointer",
                  //               color: "red",
                  //               fontSize: "2rem"
                  //             }}
                  //           />
                  //         </div>
                  //       </foreignObject>
                  //     </React.Fragment>
                  //   );
                  // }
                }
              }
            }}
          />
        </div>
        <RightSidebarModal
          context={"job_canvas"}
          title={modalTitle}
          toggleModal={this.toggleModal}
          modalOpen={modalOpen}
          activeStage={selected}
          jobStages={this.props.jobStages}
          jobId={this.props.jobId}
        />
      </React.Fragment>
    );
  }
}

export default Graph;
