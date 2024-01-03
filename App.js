import React from "react";
import ReactDOM from "react-dom/client";

//React Element
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Namaste React using React Element"
);

//JSX
const jsxHeading = <h1 className="head">Namaste React using JSX</h1>;

const Title = () => (
  <h1 className="head">Namaste React using JSX</h1>
);

//React Component
const HeadingComponent = () => (
  <div className="container">
    <Title />
    <h1>Namaste React Functinal Component</h1>;
  </div>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);
