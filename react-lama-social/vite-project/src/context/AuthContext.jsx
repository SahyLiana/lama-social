/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user: {
  //   _id: "66f184f5d93da6c5705f33ca",
  //   username: "jane",
  //   email: "jane@gmail.com",
  //   profilePicture: "",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  // },
  user: null,
  isFecthing: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFecthing: state.isFecthing,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
