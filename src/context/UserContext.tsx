import React, { useReducer } from "react";
interface IUserInfo {
  userEmail: string;
  token: string;
}

const reducer = (
  state: IUserInfo,
  action: { type: string; payload: { email: string; token: string } }
) => {
  switch (action.type) {
    case "SAVE":
      return {
        ...state,
        userEmail: action.payload.email,
        token: action.payload.token,
      };
    case "REMOVE":
      return {};
    default:
      return state;
  }
};
export const UserContext = React.createContext<any>(null);
export const UserContextProvider = (props: any) => {
  const [userState, dispatch] = useReducer<IUserInfo | any>(reducer, {});

  return (
    <UserContext.Provider value={{ dispatch, userState }}>
      {props.children}
    </UserContext.Provider>
  );
};
