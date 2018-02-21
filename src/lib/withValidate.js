import React from "react";
import PropTypes from 'prop-types';

export default function withValidate(validateFunc) {
  return function(Wrapped) {
    return class extends React.PureComponent {
      static propTypes = {
        errors: PropTypes.array,
      };

      static defaultProps = {
        errors: [],
      };

      state = {
        isValid: void 0,
        isComplete: false,
        errors: []
      };

      onBlur = target => {
        const { isValid, errors } = validateFunc(this.props.values, {trigger: target.name});
        this.setState(
          () => ({ isValid, errors }),
          () => {
            console.group("withValidate.onBlur");
            console.log("isValid: %s", isValid);
            console.log("Errors:", errors);
            console.groupEnd();
          }
        );

        this.props.onBlur && this.props.onBlur(target);
      };

      onSubmit = (...args) => {
        const { isValid, errors } = validateFunc(this.props.values);
        this.setState(() => ({ isValid, errors }));

        console.log("withValidation.onSubmit isValid:", isValid);

        if (isValid) {
          this.props.onSubmit && this.props.onSubmit(...args);
        } else {
          this.props.onValidationFailed &&
            this.props.onValidationFailed(errors);
        }
      };

      render() {
        const {
          props: {
            errors: passedErrorsList,
            ...rest,
          },
          state: {
            errors: validationErrorsList,
          }
        } = this;

        return (
          <Wrapped
            {...rest}
            errors={[...passedErrorsList, ...validationErrorsList]}
            onSubmit={this.onSubmit} // should override passed onSubmit and onBlur
            onBlur={this.onBlur}
          >
            {this.props.children}
          </Wrapped>
        );
      }
    };
  };
}
