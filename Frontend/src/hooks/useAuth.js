import { useDispatch, useSelector } from "react-redux";

import {
  login as loginAction,
  logout as logoutAction,
  updateUser,
} from "../redux/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const {
    user,
    token,
    role,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const login = (data) => {
    dispatch(loginAction(data));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const updateCurrentUser = (userData) => {
    dispatch(updateUser(userData));
  };

  return {
    user,
    token,
    role,
    isAuthenticated,
    login,
    logout,
    updateCurrentUser,
  };
};

export default useAuth;