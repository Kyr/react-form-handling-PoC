import React, { Fragment } from "react";

export default function View(props) {
  // debugger
  const { slots: { phone, cancel }, errors = [] } = props;
  // console.log(phone);
  // console.log('View. Phoen.value:', Phone.props.value);
  return (
    <Fragment>
      <div className="label">
        <label htmlFor="phone">Phone:</label>
      </div>
      <div className="control">
        <phone.type {...phone.props} id="phone" className="phone-input" />
        <div style={{ color: "red" }}>{errors.phone}</div>
      </div>
      <footer>
        {cancel}
        <button type="submit">Save</button>
      </footer>
      
    </Fragment>
  );
}
