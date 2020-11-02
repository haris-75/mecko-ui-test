import React from "react";

/**
 * SOURCE ICONS
 */

import S3Source from "../assets/canvas/100-s3-source.svg";
import HdfsSource from "../assets/canvas/101-hdfs-source.svg";
import RdbmsSource from "../assets/canvas/102-rdbms-source.svg";

/**
 * SOURCE ICONS
 */

import UnionTransformation from "../assets/canvas/000-union-transformation.svg";
import ZipTransformation from "../assets/canvas/010-zip-transformation.svg";
import SortTransformation from "../assets/canvas/006-sort-transformation.svg";
import RepartitionTransformation from "../assets/canvas/002-partition-transformation.svg";
import MergeTransformation from "../assets/canvas/003-merge-transformation.svg";
import SplitTransformation from "../assets/canvas/004-split-transformation.svg";
import TopTransformation from "../assets/canvas/007-top-transformation.svg";
import BottomTransformation from "../assets/canvas/008-bottom-transformation.svg";
import FormulaTransformation from "../assets/canvas/001-formula-transformation.svg";
import TypeConversionTransformation from "../assets/canvas/009-type-conversion-transformation.svg";
import FilterTransformation from "../assets/canvas/005-filter-transformation.svg";

/**
 * SOURCE ICONS
 */

import S3Sink from "../assets/canvas/200-s3-sink.svg";
import HdfsSink from "../assets/canvas/201-hdfs-sink.svg";
import RdbmsSink from "../assets/canvas/202-rdbms-sink.svg";

export const StageTypes = [
  {
    type: "source",
    subType: "hdfs",
    displayName: "Hadoop FS",
    icon: HdfsSource
  },
  {
    type: "source",
    subType: "rdbms",
    displayName: "RDBMS",
    icon: RdbmsSource
  },
  {
    type: "source",
    subType: "s3",
    displayName: "AWS S3",
    icon: S3Source
  },
  {
    type: "sink",
    subType: "hdfs",
    displayName: "Hadoop FS",
    icon: HdfsSink
  },
  {
    type: "sink",
    subType: "rdbms",
    displayName: "RDBMS",
    icon: RdbmsSink
  },
  {
    type: "sink",
    subType: "s3",
    displayName: "AWS S3",
    icon: S3Sink
  },
  {
    type: "transformation",
    subType: "zip",
    displayName: "Zip",
    icon: ZipTransformation
  },
  {
    type: "transformation",
    subType: "top",
    displayName: "Top",
    icon: TopTransformation
  },
  {
    type: "transformation",
    subType: "bottom",
    displayName: "Bottom",
    icon: BottomTransformation
  },
  {
    type: "transformation",
    subType: "merge",
    displayName: "Merge",
    icon: MergeTransformation
  },
  {
    type: "transformation",
    subType: "split",
    displayName: "Split",
    icon: SplitTransformation
  },
  {
    type: "transformation",
    subType: "sort",
    displayName: "Sort",
    icon: SortTransformation
  },
  {
    type: "transformation",
    subType: "union",
    displayName: "Union",
    icon: UnionTransformation
  },
  {
    type: "transformation",
    subType: "formula",
    displayName: "Formula",
    icon: FormulaTransformation
  },
  {
    type: "transformation",
    subType: "typeConversion",
    displayName: "Typecast",
    icon: TypeConversionTransformation
  },
  {
    type: "transformation",
    subType: "repartition",
    displayName: "Repartition",
    icon: RepartitionTransformation
  },
  {
    type: "transformation",
    subType: "filter",
    displayName: "Filter",
    icon: FilterTransformation
  }
  // {
  //   type: "transformation",
  //   subType: "dateTimeExtraction",
  //
  // },
  // {
  //   type: "transformation",
  //   subType: "columnRename"
  // },
  // {
  //   type: "transformation",
  //   subType: "dateTimeConversion"
  // },
  // {
  //   type: "transformation",
  //   subType: "pivot"
  // },
];

export const GRAPH_LABELS = [
  //   { displayName: "Filenames", value: "filename", filterValue: "ALL" },
  { displayName: "All", value: "all", filterValue: "ALL" },
  { displayName: "PII", value: "pii", filterValue: "PII" },
  { displayName: "Non-PII", value: "entities", filterValue: "SIMPLE" }
];
