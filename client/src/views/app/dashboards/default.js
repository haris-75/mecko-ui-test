import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardTitle, Progress } from "reactstrap";
import { connect } from "react-redux";
class DefaultDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Row>
          <h1>Defulat</h1>
        </Row>
      </Fragment>
    );
  }
}

export default connect(
  null,
  null
)(injectIntl(DefaultDashboard));
