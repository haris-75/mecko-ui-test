import React from "react";
import { Badge, Card, CardBody } from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";
import GradientCard from "../../components/cards/GradientCard";

const CustomGradientCard = ({ data }) => {
  return (
    <GradientCard>
      <CardBody>
        <div>
          {" "}
          <p>
            <br></br>
            <Badge color={"warning"} pill>
              Catalogs {data.catalogs}
            </Badge>{" "}
            <Badge color={"info"} pill>
              Entities {data.total_entities}
            </Badge>{" "}
          </p>
          <p>
            <Badge color={"secondary"} pill>
              Total PII {data.total_piis}
            </Badge>
          </p>
        </div>
        <div className="justify-content-between d-flex flex-row align-items-center">
          <p className="h4 text-white d-inline-block">
            <IntlMessages id="dashboards.magic-is-in-the-details" />
          </p>
        </div>
      </CardBody>
      {/* <p className=“text-white”>
       <IntlMessages id=“dashboards.yes-it-is-indeed” />
     </p> */}
    </GradientCard>
  );
};
export default CustomGradientCard;
