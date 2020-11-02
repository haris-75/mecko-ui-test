import React, { Component } from "react";
import {
  Row,
  Card,
  CardTitle,
  Label,
  UncontrolledAlert,
  Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { forgotPasswordInitiate } from "../../redux/actions";

const initialValues = {
  email: ""
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.")
    .required("Required field.")
});

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiCalled: false,
      forgotPasswordResponse: {
        isError: false,
        message: null
      }
    };
  }

  handleResponse = response => {
    console.log(response);
    this.setState({
      apiCalled: false
    });

    if (response.isError) {
      this.setState({
        ...this.state,
        forgotPasswordResponse: {
          ...this.state.forgotPasswordResponse,
          isError: true,
          message: response.errorDetails.message
        }
      });
    } else {
      this.setState({
        ...this.state,
        forgotPasswordResponse: {
          ...this.state.forgotPasswordResponse,
          isError: false,
          message: response.message
        }
      });
    }
  };

  handleSubmit = payload => {
    this.setState({
      apiCalled: true,
      forgotPasswordResponse: {
        ...this.state.forgotPasswordResponse,
        isError: false,
        message: null
      }
    });
    this.props.forgotPasswordInitiate({
      data: payload,
      callback: response => this.handleResponse(response)
    });
  };

  getAlertContent = () => {
    let content = null;
    const response = this.state.forgotPasswordResponse;

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
  render() {
    const alertContent = this.getAlertContent();
    const { apiCalled } = this.state;
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2 mb-5">
                <span style={{ background: "#4A90E2" }}>Welcome to Mecku</span>
              </p>
              <p className="white mb-5 h5">
                Please use your
                <br />
                email to reset password.
                <br />
                If you are not a member yet, <br />
                Go ahead,{" "}
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
                <IntlMessages id="user.forgot-password" />
              </CardTitle>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.handleSubmit}
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

                    <div className="d-flex justify-content-end align-items-center">
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
    );
  }
}
export default connect(
  null,
  { forgotPasswordInitiate }
)(ForgotPassword);
