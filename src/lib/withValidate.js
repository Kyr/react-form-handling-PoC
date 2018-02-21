import React from 'react';

export default function withValidate(validateFunc){
  return function (Wrapped) {
    return class extends React.PureComponent {
      state = {
        isValid: void 0,
        isComplete: false,
        errors: [],
      }

      onBlur = (target) => {
        const isValid = validateFunc(this.props.values);
        this.setState(() => ({isValid}));
        this.props.onBlur && this.props.onBlur(target);
      }

      onSubmit = () => {
        const isValid = validateFunc(this.props.values);
        this.setState(() => ({isValid}));
        if(isValid){
          this.props.onSubmit && this.props.onSubmit(); 
        } else {
          this.props.onValidationFailed && this.props.onValidationFailed();
        }
      }

      render () {
        return (
          <Wrapped
            {...this.props}
            onSubmit={this.onSubmit} // should override passed onSubmit and onBlur
            onBlur={this.onBlur} 
          >
            {this.props.children}
          </Wrapped>
        )
      }
    }
  }
}