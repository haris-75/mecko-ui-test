import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { FormikCheckbox } from "../../../../containers/form-validations/FormikFields";
import { Label, Button, FormGroup } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required field."),
  column_name: Yup.string().required("Required field.")
});

class TypeConversion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        name: this.props.attributes.name || "type_conversion_transformation",
        column_name: this.props.attributes.column_mappings[0].column_name,
        data_type:
          this.props.attributes.column_mappings[0].data_type || "integer",
        comment: this.props.attributes.comment
      }
    };
  }
  handleForm = values => {
    const { name, comment, ...data } = values;
    this.props.callback({
      name,
      comment,
      stage_attributes: {
        column_mappings: [
          {
            column_name: data.column_name,
            data_type: data.data_type
          }
        ]
      }
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
            <h1>Type Conversion Transformation</h1>
            <br></br>
            <Label className="form-group has-float-label mb-4">
              Name
              <Field className="form-control" type="text" name="name" />
            </Label>
            {errors.name && touched.name ? (
              <div className="invalid-feedback d-block">{errors.name}</div>
            ) : null}

            <Label className="form-group has-float-label mb-4">
              Column Name
              <Field className="form-control" type="text" name="column_name" />
            </Label>
            {errors.column_name && touched.column_name ? (
              <div className="invalid-feedback d-block">
                {errors.column_name}
              </div>
            ) : null}

            <FormGroup className="error-l-100">
              <select
                name="data_type"
                className="form-control"
                value={values.data_type}
                onChange={handleChange}
                // onBlur={handleBlur}
              >
                <option value="integer">Integer</option>
                <option value="double">Double</option>
              </select>

              {errors.data_type && touched.data_type ? (
                <div className="invalid-feedback d-block">
                  {errors.data_type}
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

export default TypeConversion;
