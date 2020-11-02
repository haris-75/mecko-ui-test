import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { FormikCheckbox } from "../../../../containers/form-validations/FormikFields";
import { Label, Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import IntlMessages from "../../../../helpers/IntlMessages";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required field.")
});

class S3Source extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        name: this.props.attributes.name || "s3_source",
        access_key: this.props.attributes.access_key,
        secret_key: this.props.attributes.secret_key,
        separator: this.props.attributes.separator || "44",
        is_header: this.props.attributes.is_header,
        bucket: this.props.attributes.bucket,
        path: this.props.attributes.path,
        file_format: this.props.attributes.file_format,
        comment: this.props.attributes.comment,
        compression_codec: this.props.attributes.compression_codec || "none"
      }
    };
  }
  handleForm = values => {
    const { name, comment, ...stage_attributes } = values;
    this.props.callback({
      name,
      comment,
      stage_attributes
    });
  };
  render() {
    const { callback } = this.props;
    const { initialValues } = this.state;
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
            <h1>S3 Source </h1>
            <br></br>
            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="text" name="name" />
              <IntlMessages id={"stage.name"} />
            </Label>
            {errors.name && touched.name ? (
              <div className="invalid-feedback d-block">{errors.name}</div>
            ) : null}

            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="text" name="access_key" />
              <IntlMessages id={"stage.s3.access_key"} />
            </Label>
            {errors.access_key && touched.access_key ? (
              <div className="invalid-feedback d-block">
                {errors.access_key}
              </div>
            ) : null}

            <Label className="form-group has-float-label mb-4">
              <Field
                className="form-control"
                type="password"
                name="secret_key"
              />
              <IntlMessages id={"stage.s3.secret_key"} />
            </Label>
            {errors.secret_key && touched.secret_key ? (
              <div className="invalid-feedback d-block">
                {errors.secret_key}
              </div>
            ) : null}

            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="text" name="bucket" />
              <IntlMessages id={"stage.s3.bucket"} />
            </Label>
            {errors.bucket && touched.bucket ? (
              <div className="invalid-feedback d-block">{errors.bucket}</div>
            ) : null}

            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="text" name="path" />
              <IntlMessages id={"stage.s3.path"} />
            </Label>
            {errors.path && touched.path ? (
              <div className="invalid-feedback d-block">{errors.path}</div>
            ) : null}

            <FormGroup className="error-l-150">
              {/*<Label className="d-block">Is Header</Label>*/}
              <FormikCheckbox
                name="is_header"
                value={values.is_header}
                label=" Is Header"
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
              <Label className={"form-group has-float-label mb-4"}>
                <IntlMessages id={"stage.separator"} />
              </Label>
              <select
                name="separator"
                className="form-control"
                value={values.separator}
                onChange={handleChange}
                // onBlur={handleBlur}
              >
                <option value="44">,</option>
                <option value="59">;</option>
              </select>

              {errors.separator && touched.separator ? (
                <div className="invalid-feedback d-block">
                  {errors.separator}
                </div>
              ) : null}
            </FormGroup>

            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="text" name="file_format" />
              <IntlMessages id={"stage.file_format"} />
            </Label>
            {errors.file_format && touched.file_format ? (
              <div className="invalid-feedback d-block">
                {errors.file_format}
              </div>
            ) : null}

            <FormGroup className="error-l-100">
              <Label className={"form-group has-float-label mb-4"}>
                <IntlMessages id={"stage.compression_codec"} />
              </Label>
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
              <Field className="form-control" type="text" name="comment" />
              <IntlMessages id={"stage.comments"} />
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

export default S3Source;
