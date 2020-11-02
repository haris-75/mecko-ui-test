import React, {Component} from 'react';
import {Formik,Form, Field } from "formik";
import {
    FormikCheckbox
} from "../../../../containers/form-validations/FormikFields";
import {Label, Button, FormGroup} from "reactstrap";
import * as Yup from "yup";

class Repartition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                name: this.props.attributes.name || "repartition_transformation",
                coalesce: this.props.attributes.coalesce,
                num_partitions: this.props.attributes.num_partitions,
                comment: this.props.attributes.comment,
            }
        }
    }
    handleForm = values => {
        const {name,comment, ...stage_attributes} = values;
        this.props.callback({
            name,
            comment,
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
                        <h1>Repartition Transformation</h1>
                        <br></br>
                        <Label className="form-group has-float-label mb-4">
                            Name
                            <Field className="form-control" type="text" name="name" />
                        </Label>
                        {errors.name && touched.name ? (
                            <div className="invalid-feedback d-block">{errors.name}</div>
                        ) : null}


                        <FormGroup className="error-l-150">
                            {/*<Label className="d-block">Is Header</Label>*/}
                            <FormikCheckbox
                                name="coalesce"
                                value={values.coalesce}
                                label="Coalesce"
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                            />
                            {errors.coalesce && touched.coalesce ? (
                                <div className="invalid-feedback d-block">
                                    {errors.coalesce}
                                </div>
                            ) : null}
                        </FormGroup>

                        {/*<Label className="form-group has-float-label mb-4">*/}
                        {/*    Is Header*/}
                        {/*    <Field className="form-control" type="text" name="is_header" />*/}
                        {/*</Label>*/}
                        {/*{errors.is_header && touched.is_header ? (*/}
                        {/*    <div className="invalid-feedback d-block">{errors.is_header}</div>*/}
                        {/*) : null}*/}


                        <Label className="form-group has-float-label mb-4">
                            Values
                            <Field className="form-control" type="text" name="num_partitions" />
                        </Label>
                        {errors.num_partitions && touched.num_partitions ? (
                            <div className="invalid-feedback d-block">{errors.num_partitions}</div>
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

export default Repartition;