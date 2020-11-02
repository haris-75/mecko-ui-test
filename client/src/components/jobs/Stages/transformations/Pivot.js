import React, {Component} from 'react';
import {Formik,Form, Field } from "formik";
import {
    FormikCheckbox
} from "../../../../containers/form-validations/FormikFields";
import {Label, Button, FormGroup} from "reactstrap";
import * as Yup from "yup";

class Pivot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                name: this.props.attributes.name || "pivot_transformations",
                resultant_column_name: this.props.attributes.resultant_column_name,
                splitter: this.props.attributes.splitter,
                column_a: this.props.attributes.column_a,
                column_b: this.props.attributes.column_b,
                comment: this.props.attributes.comment,
            }
        }
    }
    handleForm = values => {
        const {name, ...stage_attributes} = values;
        this.props.callback({
            name,
            stage_attributes
        });
    }
    render() {
        const {callback} = this.props;
        const {initialValues} = this.state;
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={this.handleForm}
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
                        <h1>Merge Transformation</h1>
                        <br></br>
                        <Label className="form-group has-float-label mb-4">
                            Name
                            <Field className="form-control" type="text" name="name" />
                        </Label>
                        {errors.name && touched.name ? (
                            <div className="invalid-feedback d-block">{errors.name}</div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                            Column A
                            <Field className="form-control" type="text" name="column_a" />
                        </Label>
                        {errors.column_a && touched.column_a ? (
                            <div className="invalid-feedback d-block">{errors.column_a}</div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                            Column B
                            <Field className="form-control" type="text" name="column_b" />
                        </Label>
                        {errors.column_b && touched.column_b ? (
                            <div className="invalid-feedback d-block">{errors.column_b}</div>
                        ) : null}



                        <FormGroup className="error-l-100">
                            <select
                                name="splitter"
                                className="form-control"
                                value={values.splitter}
                                onChange={handleChange}
                                // onBlur={handleBlur}
                            >
                                <option value=",">,</option>
                                <option value=";">;</option>
                            </select>

                            {errors.splitter && touched.splitter ? (
                                <div className="invalid-feedback d-block">
                                    {errors.splitter}
                                </div>
                            ) : null}
                        </FormGroup>

                        <Label className="form-group has-float-label mb-4">
                            Resultant Column Name
                            <Field className="form-control" type="text" name="resultant_column_name" />
                        </Label>
                        {errors.resultant_column_name && touched.resultant_column_name ? (
                            <div className="invalid-feedback d-block">{errors.resultant_column_name}</div>
                        ) : null}

                        <Label className="form-group has-float-label mb-4">
                            Comments
                            <Field className="form-control" type="text" name="comment" />
                        </Label>
                        {errors.comment && touched.comment ? (
                            <div className="invalid-feedback d-block">{errors.comment}</div>
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

export default Pivot;