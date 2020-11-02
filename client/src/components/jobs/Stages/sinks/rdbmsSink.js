import React, {Component} from 'react';
import {Formik,Form, Field } from "formik";
import {
    FormikCheckbox
} from "../../../../containers/form-validations/FormikFields";
import {Label, Button, FormGroup} from "reactstrap";
import * as Yup from "yup";

class RdbmsSink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                name: this.props.attributes.name || "rdbms_sink",
                host: this.props.attributes.host,
                port: this.props.attributes.port,
                domain: this.props.attributes.domain,
                driver_type: this.props.attributes.driver_type,
                database_name: this.props.attributes.database_name,
                user_name: this.props.attributes.user_name,
                password: this.props.attributes.password,
                table_name: this.props.attributes.table_name,
                comment: this.props.attributes.comment
            }
        }
    }
    handleSubmit = values => {
        const {name, comment, ...stage_attributes} = values;
        this.props.callback({
            name,
            comment,
            stage_attributes
        })
    }
    render() {
        const {callback} = this.props;
        const {initialValues} = this.state;
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
            >
                {({
                      callback,
                      setFieldValue,
                      setFieldTouched,
                      handleChange,
                      values,
                      errors,
                      touched,
                      isSubmitting
                  }) => (
                    <Form>
                        <h1>RDBMS Sink </h1>
                        <br></br>
                        <Label className="form-group has-float-label mb-4">
                            Name
                            <Field className="form-control" type="text" name="name" />
                        </Label>
                        {errors.name && touched.name ? (
                            <div className="invalid-feedback d-block">{errors.name}</div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                            Host
                            <Field className="form-control" type="text" name="host" />
                        </Label>
                        {errors.host && touched.host ? (
                            <div className="invalid-feedback d-block">{errors.host}</div>
                        ) : null}


                        <Label className="form-group has-float-label mb-4">
                            Port
                            <Field className="form-control" type="text" name="port" />
                        </Label>
                        {errors.port && touched.port ? (
                            <div className="invalid-feedback d-block">{errors.port}</div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                            Domain
                            <Field className="form-control" type="text" name="domain" />
                        </Label>
                        {errors.domain && touched.domain ? (
                            <div className="invalid-feedback d-block">{errors.domain}</div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                            Database Name
                            <Field className="form-control" type="text" name="database_name" />
                        </Label>
                        {errors.database_name && touched.database_name ? (
                            <div className="invalid-feedback d-block">{errors.database_name}</div>
                        ) : null}

                        <FormGroup className="error-l-150">
                            {/*<Label className="d-block">Is Header</Label>*/}
                            <FormikCheckbox
                                name="driver_type"
                                value={values.driver_type}
                                label="Driver Type"
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                            />
                            {errors.driver_type && touched.driver_type ? (
                                <div className="invalid-feedback d-block">
                                    {errors.driver_type}
                                </div>
                            ) : null}
                        </FormGroup>

                        <Label className="form-group has-float-label mb-4">
                            User name
                            <Field className="form-control" type="text" name="user_name" />
                        </Label>
                        {errors.user_name && touched.user_name ? (
                            <div className="invalid-feedback d-block">{errors.user_name}</div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                            Password
                            <Field className="form-control" type="text" name="password" />
                        </Label>
                        {errors.password && touched.password ? (
                            <div className="invalid-feedback d-block">{errors.password}</div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                            Table Name
                            <Field className="form-control" type="text" name="table_name" />
                        </Label>
                        {errors.table_name && touched.table_name ? (
                            <div className="invalid-feedback d-block">{errors.table_name}</div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                            Comments
                            <Field className="form-control" type="text" name="comments" />
                        </Label>
                        {errors.comments && touched.comments ? (
                            <div className="invalid-feedback d-block">{errors.comments}</div>
                        ) : null}


                        <div className="d-flex justify-content-between align-items-center">
                            <Button
                                color="primary"
                                className="btn-shadow"
                                size="lg"
                                block
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default RdbmsSink;