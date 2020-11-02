import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, Jumbotron, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import {
  Colxx,
  Separator
} from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";

class CustomJumbotron extends Component {
  handleRedirection = () => {
    this.props.history.push(this.props.redirectionPath);
  };
  render() {
    const fullName = localStorage.getItem("user_name");
    const username = fullName == null ? "User" : fullName.split(" ")[0];
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <Jumbotron>
                  <h1 className="display-4">
                    {this.props.heading} {username}!
                  </h1>
                  <p className="lead">{this.props.lead}</p>
                  <hr className="my-4" />
                  <p>{this.props.leaddetail}</p>
                  {this.props.actionText && (
                    <p className="lead mb-0">
                      <Button
                        color="primary"
                        size="lg"
                        onClick={this.handleRedirection}
                      >
                        {this.props.actionText}
                      </Button>
                    </p>
                  )}
                </Jumbotron>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default withRouter(CustomJumbotron);
