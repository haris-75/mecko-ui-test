import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { ThemeColors } from "../../helpers/ThemeColors";

import IntlMessages from "../../helpers/IntlMessages";
import { DoughnutChart } from "../../components/charts";
const colors = ThemeColors();

const PIICountDoughnut = ({ data }) => {
  const dataObj = {
    labels: ["Persons", "Emails", "SSNs"],
    datasets: [
      {
        label: "",
        borderColor: [
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1
        ],
        backgroundColor: [
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10
        ],
        borderWidth: 2,
        data: [
          data.person_count,
          data.email_count,
          data.ssn_count + data.ssn_with_dashes_count
        ]
      }
    ]
  };

  console.log("In PII Doghbut");
  console.log(data);

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.pii-doughnut" />
        </CardTitle>
        <div className="dashboard-donut-chart">
          <DoughnutChart shadow data={dataObj} />
        </div>
      </CardBody>
    </Card>
  );
};

export default PIICountDoughnut;
