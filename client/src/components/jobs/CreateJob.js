import React, {Component} from 'react';
import {Formik,Form, Field } from "formik";
import {Label, Button} from "reactstrap";
import * as Yup from "yup";
import IntlMessages from "../../helpers/IntlMessages";

const initialValues = {
    name: ""
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name required")
});

class CreateJob extends Component {
    render() {
        const {callback} = this.props;
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={callback}
            >
                {({
                      callback,
                      setFieldValue,
                      setFieldTouched,
                      values,
                      errors,
                      touched,
                      isSubmitting
                  }) => (
                    <Form>
                        <h1>Create Job </h1>
                        <Label className="form-group has-float-label mb-4">
                            Job Name
                            <Field className="form-control" type="text" name="name" />
                        </Label>
                        {errors.name && touched.name ? (
                            <div className="invalid-feedback d-block">{errors.name}</div>
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

export default CreateJob;