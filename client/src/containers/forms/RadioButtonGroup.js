import React, { Component } from "react";

export default class RadioButtonGroup extends Component {
  handleChange = val => {
    this.props.onChange(this.props.name, val);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <React.Fragment>
        {options.map((child, index) => {
          return (
            <div
              key={`${name}_${child.value}_${index}`}
              className={`position-relative form-check ${
                inline ? "form-check-inline" : ""
              }`}
            >
              <label className="form-check-label">
                <input
                  id={child.value}
                  name={name}
                  type="radio"
                  className="form-check-input"
                  onChange={() => this.handleChange(child.value)}
                  onBlur={this.handleBlur}
                  defaultChecked={value === child.value}
                  disabled={child.disabled}
                />
                {child.label}
              </label>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
