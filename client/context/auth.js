import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (typeof window !== "undefined" && localStorage.getItem("jwtToken")) {
  const token = jwtDecode(localStorage.getItem("jwtToken"));
  console.log(token);
  if (token.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = token;
  }
}
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
  authReady: false,
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({ type: "LOGIN", payload: userData });
  }
  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
