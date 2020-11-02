import React, { Component } from "react";
import {
  Row,
  Card,
  CardTitle,
  Label,
  Input,
  FormGroup,
  Button,
  UncontrolledAlert
} from "reactstrap";
import { NavLink, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, validateNewUser } from "../../redux/actions";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import qs from "query-string";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirm: ""
};

const RegisterUserSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your first name"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(5, "Password should atleast be 5 charcters.")
    .required("Please set a password."),
  password_confirm: Yup.string().oneOf(
    [Yup.ref("password")],
    "Should be same as password field."
  )
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiCalled: false,
      registrationResponse: {
        error: false,
        status: null,
        message: null
      },
      userValidationResponse: {
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
        registrationResponse: {
          ...this.state.registrationResponse,
          error: true,
          status: response.errorDetails.status,
          message: response.errorDetails.message
        }
      });
    } else {
      this.setState({
        ...this.state,
        apiCalled: false,
        registrationResponse: {
          ...this.state.registrationResponse,
          error: false,
          message: response.message
        }
      });
    }
  };

  handleSubmit = values => {
    const { password_confirm, ...user } = values;
    this.setState({
      ...this.state,
      apiCalled: true,
      registrationResponse: {
        ...this.state.registrationResponse,
        error: false,
        message: null
      }
    });
    this.props.registerUser({
      user,
      history: this.props.history,
      callback: response => this.handleSignupResponse(response)
    });
  };

  getAlertContent = () => {
    let content = null;
    let response = null;

    const verifToken = qs.parse(this.props.location.search).validationToken;

    if (verifToken) {
      // User is expecting account verification.
      response = this.state.userValidationResponse;
    } else {
      response = this.state.registrationResponse;
    }

    if (response.error && response.message) {
      // There was an error registering user.
      if (response.status === 409) {
        // console.log("came in conflifct");
        content = (
          <UncontrolledAlert color="danger">
            User Already Exists.
          </UncontrolledAlert>
        );
      } else {
        content = (
          <UncontrolledAlert color="danger">
            {response.message}
          </UncontrolledAlert>
        );
      }
    }

    if (!response.error && response.message) {
      // Error is false but there is a message. That's success case.
      content = (
        <UncontrolledAlert color="success">
          {response.message}
        </UncontrolledAlert>
      );
    }

    return content;
  };

  handleNewUserValidationResponse = response => {
    if (response.isError) {
      this.setState({
        ...this.state,
        userValidationResponse: {
          ...this.state.userValidationResponse,
          error: true,
          message: response.errorDetails.message
        }
      });
    } else {
      this.setState({
        ...this.state,
        userValidationResponse: {
          ...this.state.userValidationResponse,
          error: false,
          message: response.message
        }
      });
    }
  };

  componentDidMount() {
    const validationToken = qs.parse(this.props.location.search)
      .validationToken;
    if (validationToken) {
      this.props.validateNewUser({
        validationToken,
        callback: response => this.handleNewUserValidationResponse(response)
      });
    }
  }

  shouldRedirectToLogin = () => {
    const resp = this.state.userValidationResponse;
    if (!resp.error && resp.message) {
      return true;
    }

    return false;
  };

  render() {
    const newUserValidated = this.shouldRedirectToLogin();
    const alertContent = this.getAlertContent();
    if (newUserValidated) {
      // console.log("Came in redirection.");
      return <Redirect to="/user/login?newUserValidated=true" />;
    } else {
      return (
        <React.Fragment>
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
                    Please use this
                    <br />
                    form to register.
                    <br />
                    If you are a member <br />
                    already, Go ahead {"&"}{" "}
                    <NavLink to={`/user/login`} className="white">
                      <span style={{ background: "#D0021B" }}>
                        <b>login</b>
                      </span>
                    </NavLink>
                    .<br />
                  </p>
                </div>
                <div className="form-side">
                  <NavLink to={`/`} className="white">
                    <span className="logo-single" />
                  </NavLink>
                  <CardTitle className="mb-4">
                    <IntlMessages id="user.register" />
                  </CardTitle>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterUserSchema}
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

                        <FormGroup row>
                          <Colxx sm={6}>
                            <Label className="form-group has-float-label mb-4">
                              <Field
                                className="form-control"
                                type="text"
                                name="first_name"
                              />
                              <IntlMessages id="user.firstname" />
                            </Label>
                            {errors.first_name && touched.first_name ? (
                              <div className="invalid-feedback d-block">
                                {errors.first_name}
                              </div>
                            ) : null}
                          </Colxx>
                          <Colxx sm={6}>
                            <Label className="form-group has-float-label mb-4">
                              <Field
                                className="form-control"
                                type="text"
                                name="last_name"
                              />
                              <IntlMessages id="user.lastname" />
                            </Label>
                            {errors.last_name && touched.last_name ? (
                              <div className="invalid-feedback d-block">
                                {errors.last_name}
                              </div>
                            ) : null}
                          </Colxx>
                        </FormGroup>

                        <Label className="form-group has-float-label mb-4">
                          <Field
                            className="form-control"
                            type="email"
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
                              <IntlMessages id="user.register-button" />
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
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser,
    validateNewUser
  }
)(withRouter(Register));
