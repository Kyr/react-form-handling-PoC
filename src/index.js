import React from "react";
import { render } from "react-dom";
import Form from "./form/Container";

const stars = "\u2728";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <h2>Just simple form</h2>
    <Form
      values={{ phone: "123-45-67" }}
      onSubmit={values => console.log("root action. values:", values)}
    />
    <h2>Same form, with validation (always true)</h2>
    #TODO
    <h2>Same form for validation (always false)</h2>
    #TODO
    <h2>Same form, with validation and passed errors.</h2>
    #TODO
  </div>
);

render(<App />, document.getElementById("root"));
