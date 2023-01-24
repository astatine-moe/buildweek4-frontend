import { combineReducers } from "@reduxjs/toolkit";
import users from "./users";
import activeUser from "./activeUser";

export default combineReducers({
    users,
    activeUser,
});
