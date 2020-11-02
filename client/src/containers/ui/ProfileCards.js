import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

class ProfileCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <center>
          <Row>
            <h1>Profile Card</h1>
            <Colxx>
              <CardTitle>
                {/* <IntlMessages id="cards.user-card" /> */}
              </CardTitle>
              <Row>
                <Colxx>
                  <Card className="mb-4 ">
                    <CardBody>
                      <div className="text-center">
                        <CardImg
                          top
                          src="/assets/img/mecku-profile-icon.png"
                          alt="Card image cap"
                          className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
                        />
                        <CardSubtitle className="mb-1">
                          {localStorage.getItem("user_name")}
                        </CardSubtitle>
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div>
                        <h3>Recommend Polymer to a friend! </h3>
                        <br></br>

                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={this.props.sendInvite}
                        >
                          {({
                            handleLogin,
                            setFieldValue,
                            setFieldTouched,
                            values,
                            errors,
                            touched,
                            isSubmitting
                          }) => (
                            <Form>
                              <center>
                                <Label className="form-group has-float-label mb-4">
                                  <Field
                                    className="form-control"
                                    type="text"
                                    name="email"
                                  />
                                  <IntlMessages id="user.email" />
                                </Label>
                                {errors.email && touched.email ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.email}
                                  </div>
                                ) : null}
                                <div>
                                  <center>
                                    <Button
                                      align="center"
                                      // valign="middle"
                                      color="primary"
                                      className="btn-shadow text-align-center"
                                      style={{
                                        textAlign: "center",
                                        valign: "middle"
                                        // ,marginLeft: "256%"
                                      }}
                                      size="lg"
                                      center
                                      type="submit"
                                      disabled={apiCalled}
                                    >
                                      {apiCalled
                                        ? "Sending Invite"
                                        : "Send Invite"}
                                    </Button>
                                  </center>
                                </div>
                              </center>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </Colxx>
          </Row>
        </center>
      </Fragment>
    );
  }
}

export default ProfileCards;
