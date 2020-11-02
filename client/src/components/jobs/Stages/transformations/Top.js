import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { FormikCustomCheckbox } from "../../../../containers/form-validations/FormikFields";
import { Label, Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import IntlMessages from "../../../../helpers/IntlMessages";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required field."),
  values: Yup.number("Numerical value required")
    .integer("Numerical value required.")
    .required("Required field")
});

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        name: this.props.attributes.name || "top_transformation",
        column_name: this.props.attributes.column_name,
        values: this.props.attributes.values || 1,
        comment: this.props.attributes.comment
      }
    };
  }
  handleForm = values => {
    const { name, comment, ...stage_attributes } = values;
    this.props.callback({
      name,
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
            <h1>Top Transformation</h1>
            <br></br>
            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="text" name="name" />
              <IntlMessages id={"stage.name"} />
            </Label>
            {errors.name && touched.name ? (
              <div className="invalid-feedback d-block">{errors.name}</div>
            ) : null}

            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="text" name="column_name" />
              <IntlMessages id={"stage.trans.column_name"} />
            </Label>
            {errors.column_name && touched.column_name ? (
              <div className="invalid-feedback d-block">
                {errors.column_name}
              </div>
            ) : null}

            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="number" name="values" />
              <IntlMessages id={"stage.trans.values"} />
            </Label>
            {errors.values && touched.values ? (
              <div className="invalid-feedback d-block">{errors.values}</div>
            ) : null}

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

export default Top;
