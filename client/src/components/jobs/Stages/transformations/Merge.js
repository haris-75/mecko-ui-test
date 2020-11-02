import React, { Component } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { FormikCheckbox } from "../../../../containers/form-validations/FormikFields";
import { Label, Button, FormGroup, Row } from "reactstrap";
import * as Yup from "yup";
import IntlMessages from "../../../../helpers/IntlMessages";
import { Colxx } from "../../../common/CustomBootstrap";

class Merge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        name: this.props.attributes.name || "merge_transformations",
        resultant_column_name: this.props.attributes.r,
        splitter: this.props.attributes.splitter || 44,
        columns: this.props.attributes.columns || [],
        column_a: this.props.attributes.columns[0].column_name,
        column_b: this.props.attributes.columns[1].column_name,
        comment: this.props.attributes.comment
      }
    };
  }
  handleForm = values => {
    const { name, comment, ...data } = values;

    const payload = {
      name,
      comment,
      stage_attributes: {
        splitter: data.splitter,
        r: data.resultant_column_name,
        columns: data.columns
      }
    };
    this.props.callback(payload);
  };
  render() {
    const { callback } = this.props;
    const { initialValues } = this.state;
    return (
      <Formik initialValues={initialValues} onSubmit={this.handleForm}>
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
              <Field className="form-control" type="text" name="name" />
              <IntlMessages id={"stage.name"} />
            </Label>
            {errors.name && touched.name ? (
              <div className="invalid-feedback d-block">{errors.name}</div>
            ) : null}

            <FieldArray
              name="columns"
              render={arrayHelpers => (
                <div>
                  {values.columns.map((column, index) => (
                    <>
                      <Row key={index}>
                        <Colxx md={9} lg={9}>
                          <Field
                            className={"form-control md-2"}
                            type={"text"}
                            name={`columns.${index}.col_name`}
                          />
                        </Colxx>
                        <Colxx md={1} lg={1}>
                          <Button
                            className={"default"}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <i className={"simple-icon-trash"} />
                          </Button>
                        </Colxx>
                      </Row>
                      {index === values.columns.length - 1 ? null : <br></br>}
                    </>
                  ))}
                  <Button
                    color={"link"}
                    onClick={() => arrayHelpers.push({ col_name: "" })} // insert an empty string at a position
                  >
                    Add More
                  </Button>
                </div>
              )}
            />

            <FormGroup className="error-l-100">
              <Label className={"form-group has-float-label mb-4"}>
                <IntlMessages id={"stage.trans.split.splitter"} />
              </Label>
              <select
                name="splitter"
                className="form-control"
                value={values.splitter}
                onChange={handleChange}
                // onBlur={handleBlur}
              >
                <option value="44">,</option>
                <option value="59">;</option>
              </select>

              {errors.splitter && touched.splitter ? (
                <div className="invalid-feedback d-block">
                  {errors.splitter}
                </div>
              ) : null}
            </FormGroup>

            <Label className="form-group has-float-label mb-4">
              <Field
                className="form-control"
                type="text"
                name="resultant_column_name"
              />
              <IntlMessages id={"stage.trans.merge.resultant_column_name"} />
            </Label>
            {errors.resultant_column_name && touched.resultant_column_name ? (
              <div className="invalid-feedback d-block">
                {errors.resultant_column_name}
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

export default Merge;
