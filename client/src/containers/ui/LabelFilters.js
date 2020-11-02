import React, { Component } from "react";

export class LabelFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: "ALL"
    };
  }

  setActiveFilter = value => {
    this.setState({
      ...this.state,
      activeFilter: value
    });
  };

  resetFilter = () => {
    this.setActiveFilter("ALL");
  };
  render() {
    return (
      <React.Fragment>
        {this.props.render(
          this.state.activeFilter,
          this.setActiveFilter,
          this.resetFilter
        )}
      </React.Fragment>
    );
  }
}

export default LabelFilters;
