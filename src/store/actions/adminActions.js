import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  creatNewUserApi,
  getAllUsers,
  deleteUserApi,
  editUserApi,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
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
      let response = await creatNewUserApi(inputData);
      if (response) {
        toast.success("Create a new user success!");
        dispatch({
          type: actionTypes.SAVE_USER_SUCCESS,
        });
        dispatch(fetchAllUserStart());
      } else {
        dispatch({
          type: actionTypes.SAVE_USER_FAIL,
        });
        toast.error("Create user error");
      }
    } catch (e) {
      dispatch({
        type: actionTypes.SAVE_USER_FAIL,
      });
      console.log("save user error", e);
    }
  };
};
export const saveUserFail = () => ({
  type: actionTypes.SAVE_USER_FAIL,
});
export const saveUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
});

//get all user redux
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users error"); //use library toast page
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

// EDIT USER REDUX
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserApi(data);
      if (res) {
        toast.success("Update the user success!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        console.log("check create user redux", res);
        toast.error("Fetch users error!");
        dispatch(editUserFail());
      }
    } catch (e) {
      toast.error("Fetch users error");
      dispatch(editUserFail());
      console.log("Edit user error", e);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      console.log("check doctor redux", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      console.log("Fetch doctors error", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
      });
    }
  };
};

//get all doctors
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      // console.log("check doctor redux", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      console.log("Fetch doctors error", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
      });
    }
  };
};

//save detail doctors
export const saveDetailDoctors = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        toast.success("Save detail doctor success!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        console.log("seave detail", res);
        toast.error("Save detail doctor fail");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      toast.error("Save detail doctor fail");
      console.log("save detail doctor error", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
      });
    }
  };
};

//get allcode schedule hour
export const fetAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
      });
    }
  };
};

//get all require of doctor info
export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START,
      });
      let price = await getAllCodeService("PRICE");
      let province = await getAllCodeService("PROVINCE");
      let payment = await getAllCodeService("PAYMENT");
      if (
        price &&
        price.errCode === 0 &&
        province &&
        province.errCode === 0 &&
        payment &&
        payment.errCode === 0
      ) {
        let data = {
          resPrice: price.data,
          resProvince: province.data,
          resPayment: payment.data,
        };
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFail());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInfoFail());
      console.log("fetch gender start error", e);
    }
  };
};
export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredDoctorInfoFail = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL,
});
