import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardTitle } from "reactstrap";
import Moment from "react-moment";

const UserActivity = ({ activities }) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Recent Activity</CardTitle>
          <div className="dashboard-logs">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <table className="table table-sm table-borderless">
                <tbody>
                  {activities.length > 0 ? (
                    <React.Fragment>
                      {activities.map((log, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <span
                                className={`log-indicator align-middle ${log.color}`}
                              />
                            </td>
                            <td>
                              <span className="font-weight-medium">
                                {log.action_name === "Searched" ? (
                                  <span>
                                    Searched{" "}
                                    <strong>{log.action_details}</strong>
                                  </span>
                                ) : (
                                  log.action_name
                                )}
                              </span>
                            </td>
                            {/* <td className="text-right">
                              <span className="text-muted">
                                <Moment toNow>{log.logged_at}</Moment>
                              </span>
                            </td> */}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    <h4 className="text-muted">
                      You will see your catalog related activities here.
                    </h4>
                  )}
                </tbody>
              </table>
            </PerfectScrollbar>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default UserActivity;
