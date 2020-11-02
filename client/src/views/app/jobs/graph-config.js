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
  Example config for GraphView component
*/
import * as React from "react";

import S3SourceSymbol from "../../../components/jobs/Stages/CanvasShapes/sources/S3SourceShape";
import HadoopSourceSymbol from "../../../components/jobs/Stages/CanvasShapes/sources/HadoopSourceShape";
import RdbmsSourceSymbol from "../../../components/jobs/Stages/CanvasShapes/sources/RdbmsSourceShape";

import S3SinkSymbol from "../../../components/jobs/Stages/CanvasShapes/sinks/S3SinkShape";
import HadoopSinkSymbol from "../../../components/jobs/Stages/CanvasShapes/sinks/HadoopSinkShape";
import RdbmsSinkSymbol from "../../../components/jobs/Stages/CanvasShapes/sinks/RdbmsSinkShape";

import BottomTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/BottomTransformationShape";
import FilterTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/FilterTransformationShape";
import FormulaTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/FormulaTransformationShape";
import MergeTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/MergeTransformationShape";
import PartitionTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/PartitionTransformationShape";
import SortTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/SortTransformationShape";
import SplitTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/SplitTransformationShape";
import TopTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/TopTransformationShape";
import TypeTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/TypeTransformationShape";
import UnionTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/UnionTransformationShape";
import ZipTransformationSymbol from "../../../components/jobs/Stages/CanvasShapes/transformations/ZipTransformationShape";

export const NODE_KEY = "id";

/**
 * SOURCE SHAPES
 */
const S3SourceShape = <S3SourceSymbol />;
const HadoopSourceShape = <HadoopSourceSymbol />;
const RdbmsSourceShape = <RdbmsSourceSymbol />;

/**
 * TRANSFORMATION SHAPES
 */
const BottomTransformationShape = <BottomTransformationSymbol />;
const FilterTransformationShape = <FilterTransformationSymbol />;
const FormulaTransformationShape = <FormulaTransformationSymbol />;
const MergeTransformationShape = <MergeTransformationSymbol />;
const PartitionTransformationShape = <PartitionTransformationSymbol />;
const SortTransformationShape = <SortTransformationSymbol />;
const SplitTransformationShape = <SplitTransformationSymbol />;
const TopTransformationShape = <TopTransformationSymbol />;
const TypeTransformationShape = <TypeTransformationSymbol />;
const UnionTransformationShape = <UnionTransformationSymbol />;
const ZipTransformationShape = <ZipTransformationSymbol />;

/**
 * SINK SHAPES
 */
const S3SinkShape = <S3SinkSymbol />;
const HadoopSinkShape = <HadoopSinkSymbol />;
const RdbmsSinkShape = <RdbmsSinkSymbol />;

const SpecialShape = (
  <symbol viewBox="-27 0 154 154" id="special" width="154" height="154">
    <rect transform="translate(50) rotate(45)" width="109" height="109" />
  </symbol>
);

const EmptyEdgeShape = (
  <symbol viewBox="0 0 50 50" id="emptyEdge">
    <circle cx="25" cy="25" r="8" fill="currentColor" />
  </symbol>
);

const SpecialEdgeShape = (
  <symbol viewBox="0 0 50 50" id="specialEdge">
    <rect
      transform="rotate(45)"
      x="27.5"
      y="-7.5"
      width="15"
      height="15"
      fill="currentColor"
    />
  </symbol>
);

export const SPECIAL_TYPE = "special";
export const EMPTY_EDGE_TYPE = "emptyEdge";
export const SPECIAL_EDGE_TYPE = "specialEdge";

export const S3_SOURCE_TYPE = "s3Source";
export const HADOOP_SOURCE_TYPE = "hadoopSource";
export const RDBMS_SOURCE_TYPE = "rdbmsSource";

export const S3_SINK_TYPE = "s3Sink";
export const HADOOP_SINK_TYPE = "hadoopSink";
export const RDBMS_SINK_TYPE = "rdbmsSink";

export const BOTTOM_TRANSFORMATION_TYPE = "bottomTrans";
export const FILTER_TRANSFORMATION_TYPE = "filterTrans";
export const FORMULA_TRANSFORMATION_TYPE = "formulaTrans";
export const MERGE_TRANSFORMATION_TYPE = "mergeTrans";
export const PARTITION_TRANSFORMATION_TYPE = "partitionTrans";
export const SORT_TRANSFORMATION_TYPE = "sortTrans";
export const SPLIT_TRANSFORMATION_TYPE = "splitTrans";
export const TOP_TRANSFORMATION_TYPE = "topTrans";
export const TYPE_TRANSFORMATION_TYPE = "typeTrans";
export const UNION_TRANSFORMATION_TYPE = "unionTrans";
export const ZIP_TRANSFORMATION_TYPE = "zipTrans";

export const nodeTypes = [
  SPECIAL_TYPE,

  // SOURCE SYMBOL TYPES
  S3_SOURCE_TYPE,
  HADOOP_SOURCE_TYPE,
  RDBMS_SOURCE_TYPE,

  // TRANSFORMATION SYMBOL TYPES
  BOTTOM_TRANSFORMATION_TYPE,
  FILTER_TRANSFORMATION_TYPE,
  FORMULA_TRANSFORMATION_TYPE,
  MERGE_TRANSFORMATION_TYPE,
  PARTITION_TRANSFORMATION_TYPE,
  SORT_TRANSFORMATION_TYPE,
  SPLIT_TRANSFORMATION_TYPE,
  TOP_TRANSFORMATION_TYPE,
  TYPE_TRANSFORMATION_TYPE,
  UNION_TRANSFORMATION_TYPE,
  ZIP_TRANSFORMATION_TYPE,

  // SINK SYMBOL TYPES
  S3_SINK_TYPE,
  HADOOP_SINK_TYPE,
  RDBMS_SINK_TYPE
];

export const edgeTypes = [EMPTY_EDGE_TYPE, SPECIAL_EDGE_TYPE];

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: "#emptyEdge"
    },
    specialEdge: {
      shape: SpecialEdgeShape,
      shapeId: "#specialEdge"
    }
  },
  NodeSubtypes: {},
  NodeTypes: {
    special: {
      shape: SpecialShape,
      shapeId: "#special",
      typeText: "Special"
    },
    /**
     * SOURCES
     */
    s3Source: {
      shape: S3SourceShape,
      shapeId: "#s3SourceShapeId",
      typeText: "AWS S3"
    },
    hadoopSource: {
      shape: HadoopSourceShape,
      shapeId: "#hadoopSourceShapeId",
      typeText: "Hadoop FS"
    },
    rdbmsSource: {
      shape: RdbmsSourceShape,
      shapeId: "#rdbmsSourceShapeId",
      typeText: "RDBMS"
    },
    /**
     * SINKS
     */
    s3Sink: {
      shape: S3SinkShape,
      shapeId: "#s3SinkShapeId",
      typeText: "AWS S3"
    },
    hadoopSink: {
      shape: HadoopSinkShape,
      shapeId: "#hadoopSinkShapeId",
      typeText: "Hadoop FS"
    },
    rdbmsSink: {
      shape: RdbmsSinkShape,
      shapeId: "#rdbmsSinkShapeId",
      typeText: "RDBMS"
    },
    /**
     * TRANSFORMATIONS
     */
    bottomTrans: {
      shape: BottomTransformationShape,
      shapeId: "#bottomTransformationShapeId",
      typeText: "Bottom"
    },
    filterTrans: {
      shape: FilterTransformationShape,
      shapeId: "#filterTransformationShapeId",
      typeText: "Filter"
    },
    formulaTrans: {
      shape: FormulaTransformationShape,
      shapeId: "#formulaTransformationShapeId",
      typeText: "f(x)"
    },
    mergeTrans: {
      shape: MergeTransformationShape,
      shapeId: "#mergeTransformationShapeId",
      typeText: "Merge"
    },
    partitionTrans: {
      shape: PartitionTransformationShape,
      shapeId: "#partitionTransformationShapeId",
      typeText: "Partition"
    },
    sortTrans: {
      shape: SortTransformationShape,
      shapeId: "#sortTransformationShapeId",
      typeText: "Sort"
    },
    splitTrans: {
      shape: SplitTransformationShape,
      shapeId: "#splitTransformationShapeId",
      typeText: "Split"
    },
    topTrans: {
      shape: TopTransformationShape,
      shapeId: "#topTransformationShapeId",
      typeText: "Top"
    },
    typeTrans: {
      shape: TypeTransformationShape,
      shapeId: "#typeTransformationShapeId",
      typeText: "Type"
    },
    unionTrans: {
      shape: UnionTransformationShape,
      shapeId: "#unionTransformationShapeId",
      typeText: "Union"
    },
    zipTrans: {
      shape: ZipTransformationShape,
      shapeId: "#zipTransformationShapeId",
      typeText: "Zip"
    }
  }
};
