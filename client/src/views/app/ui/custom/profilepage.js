import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../../../../components/common/Toast";
import { Row, Card, CardTitle } from "reactstrap";
import {
  Colxx,
  Separator
} from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import ProfileCards from "../../../../containers/ui/ProfileCards";
import IntlMessages from "../../../../helpers/IntlMessages";
import { validateNewUser } from "../../../../redux/actions";

class CardsUi extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <Toast />
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.profile" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default connect(
  null,
  null
)(CardsUi);
