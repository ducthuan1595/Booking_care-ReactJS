import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  creatNewUserApi,
  getAllUsers,
  deleteUserApi,
} from "../../services/userService"; //get all information from api
import { toast } from "react-toastify"; //user library toast page

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("fetch gender start error", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_POSITION_START,
      });
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log("fetch position start error", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ROLE_START,
      });
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("fetch role start error", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

//create user redux
export const createNewUser = (inputData) => {
  return async (dispatch, getState) => {
    try {
      let res = await creatNewUserApi(inputData);
      if (res && res.errCode === 0) {
        toast.success("Create a new user success!");
        dispatch(saveUseSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFail());
      }
    } catch (e) {
      dispatch(saveUserFail());
      console.log("save user error", e);
    }
  };
};
export const saveUserFail = () => ({
  type: actionTypes.SAVE_USER_FAIL,
});
export const saveUseSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
});

//edid user redux
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ROLE_START,
      });
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users error!"); //use library toast page
        dispatch(fetchAllUserFail());
      }
    } catch (e) {
      toast.error("Fetch all users error!"); //use library toast page
      dispatch(fetchAllUserFail());
      console.log("fetch role start error", e);
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIL,
});

// DELETE USER REDUX
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserApi(userId);
      console.log("check create user redux", res);
      if (res && res.errCode === 0) {
        toast.success("Delete the user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        console.error("Fetch users error");
        dispatch(deleteUserFail());
      }
    } catch (e) {
      console.error("Fetch users error");
      dispatch(deleteUserFail());
      console.log("delete user error", e);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});
