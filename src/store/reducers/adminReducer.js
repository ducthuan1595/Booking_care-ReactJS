import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: true,
  users: [],
  topDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfo: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      state.isLoadingGender = true;
      // console.log("gender redux start", action);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      // console.log("gender redux success", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = false;
      state.genders = [];
      // console.log("gender redux fail", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      // state.isLoadingPosition = false;
      // console.log("position redux fail", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      // state.isLoadingPosition = false;
      state.positions = [];
      // console.log("position redux fail", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      // state.isLoadingRole = false;
      // console.log("role redux fail", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      // state.isLoadingRole = false;
      state.roles = [];
      // console.log("role redux fail", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAIL:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAIL:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      state.allRequiredDoctorInfo = action.data;
      // console.log("check required data doctor", state, action);
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAIL:
      state.allRequiredDoctorInfo = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
