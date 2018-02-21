import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Template from "./Template";
import byNameAccess from "./byNameAccessProxy";

export default class Form extends PureComponent {
  static propTypes = {
    errors: PropTypes.array
  };

  static defaultProps = {
    errors: []
  };

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
    event.preventDefault();
    event.stopPropagation();

    const { target } = event;
    console.log("Form.onBlur target:", target);
    // Do not propagate event on not-named controls (button, etc.)
    target.name && this.props.onBlur && this.props.onBlur(target);
  };

  render() {
    const { Layout, errors: passedErrorsList, ...rest } = this.props;
    // console.log("Form.render passedErrorsList: ", passedErrorsList);

    // const errors = new Proxy(passedErrorsList, byNameAccess);
    const errors = passedErrorsList.reduce((acc, error) => {
      return {
        ...acc,
        [error.dataPath.replace(/^\./, "")]: passedErrorsList
          .filter(e => e.dataPath === error.dataPath)
          .map(
            error =>
              "data path: " + error.dataPath + " keyword: " + error.keyword
          )
      };
    }, {});

    const children = React.Children.map(this.props.children, children => {
      return React.cloneElement(children, {
        onChange: this.onChange,
        onBlur: this.onBlur
      });
    });
    // debugger;
    return (
      <form
        noValidate
        {...rest}
        onSubmit={this.onSubmit}
        ref={this.saveFormRef}
      >
        <Template Layout={this.props.Layout} errors={errors}>
          {children}
        </Template>
      </form>
    );
  }

  saveFormRef = node => {
    this.formRef = node || this.formRef;
  };
}
