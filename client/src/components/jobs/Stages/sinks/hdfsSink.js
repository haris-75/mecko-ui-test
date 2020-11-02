import React, {Component} from 'react';
import {Formik,Form, Field } from "formik";
import {
    FormikCheckbox
} from "../../../../containers/form-validations/FormikFields";
import {Label, Button, FormGroup} from "reactstrap";
import * as Yup from "yup";

class HdfsSink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                name: this.props.attributes.name || "hdfs_sink",
                host: this.props.attributes.access_key,
                port: this.props.attributes.secret_key,
                separator: this.props.attributes.separator,
                is_header: this.props.attributes.is_header,
                path: this.props.attributes.path,
                merge_output: this.props.attributes.merge_output,
                file_format: this.props.attributes.file_format,
                comment: this.props.attributes.comment,
                compression_codec: this.props.attributes.compression_codec
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
                        <h1>HDFS Sink</h1>
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
                            Path
                            <Field className="form-control" type="text" name="path" />
                        </Label>
                        {errors.path && touched.path ? (
                            <div className="invalid-feedback d-block">{errors.path}</div>
                        ) : null}

                        <FormGroup className="error-l-150">
                            {/*<Label className="d-block">Is Header</Label>*/}
                            <FormikCheckbox
                                name="is_header"
                                value={values.is_header}
                                label="Keep Schema On Header"
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                            />
                            {errors.is_header && touched.is_header ? (
                                <div className="invalid-feedback d-block">
                                    {errors.is_header}
                                </div>
                            ) : null}
                        </FormGroup>

                        <FormGroup className="error-l-100">
                            <select
                                name="separator"
                                className="form-control"
                                value={values.separator}
                                onChange={handleChange}
                                // onBlur={handleBlur}
                            >
                                <option value=",">,</option>
                                <option value=";">;</option>
                            </select>

                            {errors.separator && touched.separator ? (
                                <div className="invalid-feedback d-block">
                                    {errors.separator}
                                </div>
                            ) : null}
                        </FormGroup>

                        <Label className="form-group has-float-label mb-4">
                            File Format
                            <Field className="form-control" type="text" name="file_format" />
                        </Label>
                        {errors.file_format && touched.file_format ? (
                            <div className="invalid-feedback d-block">{errors.file_format}</div>
                        ) : null}

                        <FormGroup className="error-l-150">
                            {/*<Label className="d-block">Is Header</Label>*/}
                            <FormikCheckbox
                                name="merge_output"
                                value={values.merge_output}
                                label="Merge Output"
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                            />
                            {errors.merge_output && touched.merge_output ? (
                                <div className="invalid-feedback d-block">
                                    {errors.merge_output}
                                </div>
                            ) : null}
                        </FormGroup>


                        <FormGroup className="error-l-100">
                            <Label>Compression Codec</Label>
                            <select
                                name="compression_codec"
                                className="form-control"
                                value={values.compression_codec}
                                onChange={handleChange}
                                // onBlur={handleBlur}
                            >
                                <option value="bzip2">bzip2</option>
                                <option value="gzip">gzip</option>
                                <option value="Iz4">Iz4</option>
                                <option value="snappy">snappy</option>
                                <option value="none">none</option>
                            </select>

                            {errors.compression_codec && touched.compression_codec ? (
                                <div className="invalid-feedback d-block">
                                    {errors.compression_codec}
                                </div>
                            ) : null}
                        </FormGroup>

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

export default HdfsSink;