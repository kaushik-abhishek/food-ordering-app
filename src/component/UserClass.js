import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
    //console.log("child constructor call");
  }
  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/kaushik-abhishek");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
    console.log(json);
  }

  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    //console.log("Child Render Call");
    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: @kaushik-abhishek</h4>
      </div>
    );
  }
}
export default UserClass;
