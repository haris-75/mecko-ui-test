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
import { getEmailFromToken, resetPassword } from "../../redux/actions";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import qs from "query-string";

const initialValues = {
  password: "",
  password_confirm: ""
};

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Password should atleast be 5 charcters.")
    .required("Please set a password."),
  password_confirm: Yup.string().oneOf(
    [Yup.ref("password")],
    "Should be same as password field."
  )
});

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiCalled: false,
      email: null,
      resetPasswordResponse: {
        error: false,
        message: null
      }
    };
  }

  handleSignupResponse = response => {
    if (response.isError) {
      // registration failed.
      this.setState({
        ...this.state,
        apiCalled: false,
        resetPasswordResponse: {
          ...this.state.resetPasswordResponse,
          error: true,
          message: response.errorDetails.message
        }
      });
    } else {
      this.setState({
        ...this.state,
        apiCalled: false,
        resetPasswordResponse: {
          ...this.state.resetPasswordResponse,
          error: false,
          message: response.message
        }
      });
    }
  };

  handleSubmit = values => {
    const { password: new_password } = values;
    const email = this.state.email;

    const data = {
      new_password,
      email,
      token: qs.parse(this.props.location.search).validationToken
    };

    this.setState({
      ...this.state,
      apiCalled: true,
      resetPasswordResponse: {
        ...this.state.resetPasswordResponse,
        error: false,
        message: null
      }
    });
    this.props.resetPassword({
      data,
      callback: response => this.handlePasswordResetResponse(response)
    });
  };

  getAlertContent = () => {
    let content = null;
    let response = null;

    const verifToken = qs.parse(this.props.location.search).validationToken;

    if (verifToken) {
      response = this.state.resetPasswordResponse;
    } else {
      response = this.state.registrationResponse;
    }

    if (response.isError && response.message) {
      // There was an error registering user.
      content = (
        <UncontrolledAlert color="danger">{response.message}</UncontrolledAlert>
      );
    }

    if (!response.isError && response.message) {
      // Error is false but there is a message. That's success case.
      content = (
        <UncontrolledAlert color="success">
          {response.message}
        </UncontrolledAlert>
      );
    }

    return content;
  };

  handlePasswordResetResponse = response => {
    this.setState({
      ...this.state,
      apiCalled: false
    });
    if (response.isError) {
      this.setState({
        ...this.state,
        resetPasswordResponse: {
          ...this.state.resetPasswordResponse,
          error: true,
          message: response.errorDetails.message
        }
      });
    } else {
      this.setState({
        ...this.state,
        resetPasswordResponse: {
          ...this.state.resetPasswordResponse,
          error: false,
          message: response.message
        }
      });
    }
  };

  handleEmailFromTokenResp = response => {
    console.log("responseee");
    console.log(response);
    if (!response.isError) {
      this.setState({
        ...this.state,
        email: response.data.email
      });
    }
  };

  componentDidMount() {
    const validationToken = qs.parse(this.props.location.search)
      .validationToken;
    if (validationToken) {
      this.props.getEmailFromToken({
        validationToken,
        callback: response => this.handleEmailFromTokenResp(response)
      });
    }
  }

  render() {
    let alertContent = this.getAlertContent();
    let { email } = this.state;
    return (
      <React.Fragment>
        {email ? (
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
                    You can now
                    <br />
                    reset your password.
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
                    <IntlMessages id="user.reset-password" />
                  </CardTitle>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={this.handleSubmit}
                  >
                    {({
                      handleSubmit,
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
                            value={email}
                            disabled
                            type="text"
                            name="email"
                          />
                          <IntlMessages id="user.email" />
                        </Label>

                        <Label className="form-group has-float-label mb-4">
                          <Field
                            className="form-control"
                            type="password"
                            name="password"
                          />
                          <IntlMessages id="user.new-password" />
                        </Label>
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                          <Field
                            className="form-control"
                            type="password"
                            name="password_confirm"
                          />
                          <IntlMessages id="user.password_confirm" />
                        </Label>
                        {errors.password_confirm && touched.password_confirm ? (
                          <div className="invalid-feedback d-block">
                            {errors.password_confirm}
                          </div>
                        ) : null}

                        <div className="d-flex justify-content-end align-items-center">
                          <Button
                            color="primary"
                            className="btn-shadow"
                            size="lg"
                            type="submit"
                            disabled={this.state.apiCalled}
                          >
                            {this.state.apiCalled ? (
                              <IntlMessages id="user.api-called" />
                            ) : (
                              <IntlMessages id="user.reset-password-button" />
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
        ) : (
          <div className="loading" />
        )}
      </React.Fragment>
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
    getEmailFromToken,
    resetPassword
  }
)(withRouter(ResetPassword));
