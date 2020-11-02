import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { FormikCheckbox } from "../../../../containers/form-validations/FormikFields";
import { Label, Button, FormGroup } from "reactstrap";
import * as Yup from "yup";

import IntlMessages from "../../../../helpers/IntlMessages";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required field."),
  expression: Yup.string().required("Required field."),
  num_of_splits: Yup.number("Numerical value required").required(
    "Required field"
  )
});

class Split extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        name: this.props.attributes.name || "split_transformation",
        column_name: this.props.attributes.column_name,
        splitter: this.props.attributes.splitter || 44,
        regex: this.props.attributes.regex,
        expression: this.props.attributes.expression,
        comment: this.props.attributes.comment,
        num_of_splits: this.props.attributes.num_of_splits || 0
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
            <h1>Split Transformation </h1>
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

            <FormGroup className="error-l-100">
              <Label className="form-group has-float-label mb-4">
                <IntlMessages id={"stage.trans.split.splitter"} />
              </Label>
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

            <FormGroup className="error-l-150">
              {/*<Label className="d-block">Is Header</Label>*/}
              <FormikCheckbox
                name="regex"
                value={values.regex}
                label=" Regex"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
              {errors.regex && touched.regex ? (
                <div className="invalid-feedback d-block">{errors.regex}</div>
              ) : null}
            </FormGroup>

            <Label className="form-group has-float-label mb-4">
              <Field className="form-control" type="text" name="expression" />
              <IntlMessages id={"stage.trans.split.expression"} />
            </Label>
            {errors.expression && touched.expression ? (
              <div className="invalid-feedback d-block">
                {errors.expression}
              </div>
            ) : null}

            <Label className="form-group has-float-label mb-4">
              <Field
                className="form-control"
                type="number"
                name="num_of_splits"
              />
              <IntlMessages id={"stage.trans.split.num_of_splits"} />
            </Label>
            {errors.num_of_splits && touched.num_of_splits ? (
              <div className="invalid-feedback d-block">
                {errors.num_of_splits}
              </div>
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

export default Split;
