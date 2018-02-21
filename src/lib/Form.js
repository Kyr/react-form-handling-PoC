import React, { PureComponent } from "react";
import Template from "./Template";

export default class Form extends PureComponent {

  onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();

    console.log("Form.onSubmit", this);
    this.props.onSubmit && this.props.onSubmit({ form: this.formRef, event });
  };
  /**
   * @param {Event} event
   */
  onChange = event => {
    event.preventDefault();
    event.stopPropagation();

    const { target: { name, value } } = event;
    console.log("Form.onChange", name, value);
    this.props.onChange && this.props.onChange(name, value);
  };

  onBlur = event => {
    const { target } = event;

    this.props.onBlur && this.props.onBlur(target);
  };

  render() {
    const { Layout, ...rest } = this.props;

    const children = React.Children.map(this.props.children, children => {
      return React.cloneElement(children, {
        onChange: this.onChange,
        onBlur: this.onBlur
      });
    });

    return (
      <form
        noValidate
        {...rest}
        onSubmit={this.onSubmit}
        ref={this.saveFormRef}
      >
        <Template Layout={this.props.Layout}>{children}</Template>
      </form>
    );
  }

  saveFormRef = node => {
    this.formRef = node || this.formRef;
  };
}
