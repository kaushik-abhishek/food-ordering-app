import { createContext } from "react";
import User from "../component/User";

const UserContext = createContext({
  loggedInUser: "Default User",
});
export default UserContext;
