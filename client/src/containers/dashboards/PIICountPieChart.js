import React from "react";
import ChartComponent, { Chart } from "react-chartjs-2";

import { ThemeColors } from "../../helpers/ThemeColors";
const colors = ThemeColors();

export const chartTooltip = {
  backgroundColor: ThemeColors().foregroundColor,
  titleFontColor: ThemeColors().primaryColor,
  borderColor: ThemeColors().separatorColor,
  borderWidth: 0.5,
  bodyFontColor: ThemeColors().primaryColor,
  bodySpacing: 10,
  xPadding: 15,
  yPadding: 15,
  cornerRadius: 0.15
};

export const pieChartOptions = {
  legend: {
    position: "bottom",
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false
  },
  layout: {
    padding: {
      bottom: 20
    }
  },
  tooltips: chartTooltip
};

export default class PIICountPieChart extends React.Component {
  componentWillMount() {
    if (this.props.shadow) {
      Chart.defaults.pieWithShadow = Chart.defaults.pie;
      Chart.controllers.pieWithShadow = Chart.controllers.pie.extend({
        draw: function(ease) {
          Chart.controllers.pie.prototype.draw.call(this, ease);
          let ctx = this.chart.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.15)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 10;
          ctx.responsive = true;
          Chart.controllers.pie.prototype.draw.apply(this, arguments);
          ctx.restore();
        }
      });
    }
  }

  prepareDataObj = data => {
    return {
      labels: ["Persons", "Emails", "SSNs"],
      datasets: [
        {
          label: "",
          borderColor: [
            colors.themeColor1,
            colors.themeColor2,
            colors.themeColor3
          ],
          backgroundColor: [
            colors.themeColor1_10,
            colors.themeColor2_10,
            colors.themeColor3_10
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
  };
  render() {
    const { data, shadow } = this.props;
    const dataObj = this.prepareDataObj(data);
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type={shadow ? "pieWithShadow" : "pie"}
        options={{
          ...pieChartOptions
        }}
        data={dataObj}
      />
    );
  }
}
