import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { FormikCheckbox } from "../../../../containers/form-validations/FormikFields";
import { Label, Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import IntlMessages from "../../../../helpers/IntlMessages";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required field.")
});

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        name: this.props.attributes.name || "sort_transformations",
        column_name: this.props.attributes.column_mappings[0].column_name,
        sort_order:
          this.props.attributes.column_mappings[0].sort_order || "ascending",
        comment: this.props.attributes.comment
      }
    };
  }
  handleForm = values => {
    // const {name, column_name, sort ...stage_attributes} = values;
    const { name, comment, ...data } = values;
    this.props.callback({
      name,
      comment,
      stage_attributes: {
        column_mappings: [
          {
            column_name: data.column_name,
            sort_order: data.sort_order
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
            <h1>Sort Transformation</h1>
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
              <Label className={"form-group has-float-label mb-4"}>
                <IntlMessages id={"stage.trans.sort_order"} />
              </Label>
              <select
                name="sort_order"
                className="form-control"
                value={values.sort_order}
                onChange={handleChange}
                // onBlur={handleBlur}
              >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>

              {errors.sort_order && touched.sort_order ? (
                <div className="invalid-feedback d-block">
                  {errors.sort_order}
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

export default Sort;
