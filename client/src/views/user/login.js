import React, { Component } from "react";
import {
  Row,
  Card,
  CardTitle,
  Label,
  Input,
  Button,
  UncontrolledAlert
} from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../../redux/actions";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as qs from "query-string";

const initialValues = {
  email: "",
  password: ""
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.")
    .required("Please enter email."),
  password: Yup.string().required("Field required")
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFailed: false,
      loginErrorStatus: false,
      apiCalled: false
    };
  }

  handleLoginResponse = response => {
    // console.log("reached here");
    if (response.isError) {
      this.setState({
        loginFailed: true,
        loginErrorStatus: response.errorDetails.status
      });
    }
    this.setState({
      apiCalled: false
    });
  };

  handleLogin = payload => {
    this.setState({
      apiCalled: true,
      loginFailed: false
    });

    this.props.loginUser({
      data: payload,
      history: this.props.history,
      callback: response => this.handleLoginResponse(response)
    });
  };

  determineAlertContent = () => {
    let alertContent = null;
    if (this.state.loginFailed) {
      if (this.state.loginErrorStatus === 404) {
        alertContent = (
          <UncontrolledAlert color="danger">
            Invalid credentials.
          </UncontrolledAlert>
        );
      } else if (this.state.loginErrorStatus === 403) {
        alertContent = (
          <UncontrolledAlert color="danger">
            Please verify your account first to login.
          </UncontrolledAlert>
        );
      } else {
        alertContent = (
          <UncontrolledAlert color="danger">
            Something went wrong.
          </UncontrolledAlert>
        );
      }

      return alertContent;
    }

    const isNewUserValidated = qs.parse(this.props.location.search)
      .newUserValidated;

    if (isNewUserValidated) {
      alertContent = (
        <UncontrolledAlert color="success">
          Account verified. You can now login.
        </UncontrolledAlert>
      );
      return alertContent;
    }
  };
  render() {
    let alertContent = this.determineAlertContent();

    const { apiCalled } = this.state;

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2 mb-5">
                <span style={{ background: "#4A90E2" }}>
                  <IntlMessages id={"user.loginpage.heading"} />
                </span>
              </p>
              <p className="white mb-5 h5">
                Please use your
                <br />
                credentials to login.
                <br />
                If you are not a member, <br />
                Go ahead {"& "}
                <NavLink to={`/user/register`} className="white">
                  <span style={{ background: "#D0021B" }}>
                    <b>register</b>
                  </span>
                </NavLink>
                . <br />
              </p>
              <p className="white mb-0">* No credit card required.</p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />
              </CardTitle>

              <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={this.handleLogin}
              >
                {({
                  handleLogin,
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                  isSubmitting
                }) => (
                  <Form>
                    {alertContent}
                    <Label className="form-group has-float-label mb-4">
                      <Field
                        className="form-control"
                        type="text"
                        name="email"
                      />
                      <IntlMessages id="user.email" />
                    </Label>
                    {errors.email && touched.email ? (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    ) : null}

                    <Label className="form-group has-float-label mb-4">
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                      />
                      <IntlMessages id="user.password" />
                    </Label>
                    {errors.password && touched.password ? (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    ) : null}
                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to={`/user/forgot-password`}>
                        <IntlMessages id="user.forgot-password-question" />
                      </NavLink>
                      <Button
                        color="primary"
                        className="btn-shadow"
                        size="lg"
                        type="submit"
                        disabled={apiCalled}
                      >
                        {apiCalled ? (
                          <IntlMessages id="user.api-called" />
                        ) : (
                          <IntlMessages id="user.login-button" />
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(withRouter(Login));
