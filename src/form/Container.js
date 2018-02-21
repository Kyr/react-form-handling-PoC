import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import View from "./View";
import Form from "../lib/Form";
import withValidate from "../lib/withValidate";
import alwaysTrue from "./validate_t";
import alwaysFalse from "./validate_f";

const FormWithSuccessValidation = withValidate(alwaysTrue)(Form);
const FormWithFailedValidation = withValidate(alwaysFalse)(Form);

const Phone = props => <input {...props} />;

export default class Container extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
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
      <Fragment>
        <h2>Just simple form</h2>
        <Form Layout={View} onSubmit={this.onSubmit} onChange={this.onChange}>
          <Phone slot="phone" name="phone" value={values.phone} />
          <button slot="cancel" type="button" onClick={this.onCancel}>
            Cancel
          </button>
        </Form>
        <h2>Same form, with validation (always true)</h2>
        <FormWithSuccessValidation
          Layout={View}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        >
          <Phone slot="phone" name="phone" value={values.phone} />
          <button slot="cancel" type="button" onClick={this.onCancel}>
            Cancel
          </button>
          />
        </FormWithSuccessValidation>
        <h2>Same form for validation (always false)</h2>
        <FormWithFailedValidation
          Layout={View}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          errors={[{ dataPath: ".phone", keyword: "backend" }]}
        >
          <Phone slot="phone" name="phone" value={values.phone} />
          <button slot="cancel" type="button" onClick={this.onCancel}>
            Cancel
          </button>
          />
        </FormWithFailedValidation>
        <h2>Same form, with validation and passed errors.</h2>
        <Form
          Layout={View}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          errors={[{ dataPath: ".phone", keyword: "backend" }]}
        >
          <Phone slot="phone" name="phone" value={values.phone} />
          <button slot="cancel" type="button" onClick={this.onCancel}>
            Cancel
          </button>
        </Form>
        <hr />
      </Fragment>
    );
  }

  onCancel = () => {
    console.log("cancel clicked");
  };

  onSubmit = args => {
    console.log("Container.onSubmit. args: ", args);
    console.log("values: ", this.state.values);

    this.props.onSubmit(this.state.values);
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
