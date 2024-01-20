import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from "../utils/userContext";

class About extends Component {
  constructor(props) {
    super(props);
    console.log("Parent contstruct call");
  }

  componentDidMount() {
    console.log("Parent Component did mount");
  }

  render() {
    console.log("Parent render call");
    return (
      <div>
        <h1>About</h1>
        <div>
          <UserContext.Consumer>
            {(({loggedInUser}) => (
              <h1>{loggedInUser}</h1>
            ))}
          </UserContext.Consumer>
        </div>
        <h2>this is food ordering app</h2>
        <UserClass name={"Abhishek"} location={"Yamunanagar"} />
      </div>
    );
  }
}
export default About;
