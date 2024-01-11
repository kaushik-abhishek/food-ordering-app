import { useState } from "react";

const User = ({ name, location }) => {
  const [count] = useState(0);
  const [count2] = useState(1);
  return (
    <div className="user-fun">
      <h3>count: {count}</h3>
      <h3>count2: {count2}</h3>
      <h3>Name: {name}</h3>
      <h3>Contact: @abhishekkaushik</h3>
      <h3>Location: {location}</h3>
    </div>
  );
};
export default User;
