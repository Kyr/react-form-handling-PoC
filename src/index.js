import React from "react";
import { render } from "react-dom";
import FormExamples from "./form";

const stars = "\u2728";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <FormExamples
      values={{ phone: "123-45-67" }}
      onSubmit={values => console.log("root action. values:", values)}
    />
  </div>
);

render(<App />, document.getElementById("root"));
