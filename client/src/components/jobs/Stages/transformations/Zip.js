import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { FormikCustomCheckbox } from "../../../../containers/form-validations/FormikFields";
import { Label, Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import IntlMessages from "../../../../helpers/IntlMessages";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required field.")
});

class Zip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        name: this.props.attributes.name || "zip_transformation",
        comment: this.props.attributes.comment,
        with_index: this.props.attributes.with_index,
        with_unique_ids: this.props.attributes.with_unique_ids
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
            <h1>Zip Transformation</h1>
            <br></br>
            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="text" name="name" />
              <IntlMessages id={"stage.name"} />
            </Label>
            {errors.name && touched.name ? (
              <div className="invalid-feedback d-block">{errors.name}</div>
            ) : null}

            <FormGroup className="error-l-150">
              <FormikCustomCheckbox
                name="with_index"
                value={values.with_index}
                label="With Index"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
              {errors.with_index && touched.with_index ? (
                <div className="invalid-feedback d-block">
                  {errors.with_index}
                </div>
              ) : null}
            </FormGroup>

            <FormGroup className="error-l-150">
              <FormikCustomCheckbox
                name="with_unique_ids"
                value={values.with_unique_ids}
                label="With unique ids"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
              {errors.with_unique_ids && touched.with_unique_ids ? (
                <div className="invalid-feedback d-block">
                  {errors.with_unique_ids}
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

export default Zip;
