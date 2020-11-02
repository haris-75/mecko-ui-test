import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ReactTable from "react-table";
import PerfectScrollbar from "react-perfect-scrollbar";
import NumberFormat from "react-number-format";
import classnames from "classnames";

import { Card, CardBody, CardTitle, Button } from "reactstrap";
const CustomTbodyComponent = props => (
  <div {...props} className={classnames("rt-tbody", props.className || [])}>
    <PerfectScrollbar option={{ suppressScrollX: true }}>
      {props.children}
    </PerfectScrollbar>
  </div>
);

class CatalogReportDownloadTable extends Component {
  constructor(props) {
    super(props);
  }

  getTdProps = (state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        const catalogId = rowInfo.original.catalog_id;

        this.props.downloadFiles(catalogId, column.Header().props.children);

        // IMPORTANT! React-Table uses onClick internally to trigger
        // events like expanding SubComponents and pivots.
        // By default a custom 'onClick' handler will override this functionality.
        // If you want to fire the original onClick handler, call the
        // 'handleOriginal' function.
        // if (handleOriginal) {
        //   handleOriginal()
        // }
      }
    };
  };

  render() {
    const dataTableColumns = [
      {
        Header: () => <p>Catalog Name</p>,
        accessor: "catalog_name",
        Cell: props => (
          <NavLink to={`/app/catalogs/${props.original.catalog_id}`}>
            <span
              style={{ fontSize: "18px", color: "#3589BF", cursor: "pointer" }}
            >
              {" "}
              {props.original.catalog_name}
            </span>
          </NavLink>
        )
      },
      {
        Header: () => <p style={{ textAlign: "center" }}>Files</p>,
        accessor: "total_files",
        Cell: props => (
          <p className="list-item-heading" style={{ textAlign: "center" }}>
            <NumberFormat
              value={props.value}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
        )
      },
      {
        Header: () => <p style={{ textAlign: "center" }}>Entities</p>,
        accessor: "total_entities",
        Cell: props => (
          <p className="list-item-heading" style={{ textAlign: "center" }}>
            <NumberFormat
              value={props.value}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
        )
      },
      // {
      //   Header: () => (
      //     <p style={{ textAlign: "center" }}>Data Processed (kbs)</p>
      //   ),
      //   accessor: "total_data_processed",
      //   Cell: props => (
      //     <p className="list-item-heading" style={{ textAlign: "center" }}>
      //       {props.value}
      //     </p>
      //   )
      // },
      {
        Header: () => <p style={{ textAlign: "center" }}>PII</p>,
        accessor: "pii_count",
        Cell: props => (
          <p className="list-item-heading" style={{ textAlign: "center" }}>
            <NumberFormat
              value={props.value}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
        )
      },
      {
        Header: () => <p style={{ textAlign: "center" }}>Non-PII</p>,
        accessor: "non_pii_count",
        Cell: props => (
          <p className="list-item-heading" style={{ textAlign: "center" }}>
            <NumberFormat
              value={props.value}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
        )
      },
      {
        Header: () => <p style={{ textAlign: "center" }}>Time Taken (Mins)</p>,
        accessor: "time_taken",
        Cell: props => (
          <p className="list-item-heading" style={{ textAlign: "center" }}>
            <NumberFormat
              value={props.value}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
        )
      },
      {
        Header: () => <p style={{ textAlign: "center" }}>Summary</p>,
        accessor: "catalog_id",
        Cell: props => (
          <center>
            <i
              className={"iconsminds-download-1"}
              style={{ fontSize: "18px", cursor: "pointer" }}
            />
          </center>
        )
      },
      {
        Header: () => <p style={{ textAlign: "center" }}>Masked Files</p>,
        accessor: "catalog_id",
        Cell: props => (
          <center>
            <i
              className={"iconsminds-download-1"}
              style={{ fontSize: "18px", cursor: "pointer" }}
            />
          </center>
        )
      }
    ];

    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>Catalog Reports</CardTitle>
          <ReactTable
            data={this.props.data}
            TbodyComponent={CustomTbodyComponent}
            columns={dataTableColumns}
            defaultPageSize={20}
            showPageJump={false}
            showPageSizeOptions={false}
            showPagination={false}
            className={"react-table-fixed-height"}
            getTdProps={this.getTdProps}
          />
        </CardBody>
      </Card>
    );
  }
}

export default CatalogReportDownloadTable;
