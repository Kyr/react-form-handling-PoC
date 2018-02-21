import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import View from "./View";
import Form from "../lib/Form";

const Phone = props => <input {...props} />;

export default class Container extends PureComponent {
  static propTypes = {
    values: PropTypes.object
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    const { values } = props;

    this.state = {
      values: values
    };
  }

  render() {
    const { state: { values } } = this;
    console.log("Container.render. Values: ", values);
    return (
      <Form Layout={View} onSubmit={this.onSubmit} onChange={this.onChange}>
        <Phone slot="phone" name="phone" value={values.phone} />
        <button slot="cancel" type="button" onClick={this.onCancel}>
          Cancel
        </button>
      </Form>
    );
  }

  onCancel = () => {
    console.log("cancel clicked");
  };

  onSubmit = args => {
    console.log("Container.onSubmit. args: ", args);
    console.log("values: ", this.state.values);
  };

  onChange = (name, value) => {
    console.log("Container.onChange. args:", name, value);
    this.setState(
      prevState => {
        return {
          values: {
            ...prevState.values,
            [name]: value
          }
        };
      },
      () => console.log("Container.onChange. newState: ", this.state.values)
    );
  };
}
