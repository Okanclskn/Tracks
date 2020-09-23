import { AsyncStorage } from "@react-native-community/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: " ", token: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    //make api request to sign up with that email and password
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });

      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up!",
      });
    }
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    //Try to signin
    //handle success by updating state
    //handle failure by showing error message
  };
};

const signout = (dispatch) => {
  return ({ email, password }) => {
    //
  };
};
export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signup, signout },
  { token: null, errorMessage: "" }
);
