import actionTypes from "../actions/actionTypes";

const initialState = {
  gender: [],
  roles: [],
  positions: [],
  isLoadingGender: true,
  isLoadingPosition: true,
  isLoadingRole: true,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      state.isLoadingGender = true;
      console.log("gender redux start", action);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      console.log("gender redux success", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = false;
      state.genders = [];
      console.log("gender redux fail", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      state.isLoadingPosition = false;
      console.log("position redux fail", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.isLoadingPosition = false;
      state.positions = [];
      console.log("position redux fail", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      state.isLoadingRole = false;
      console.log("role redux fail", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.isLoadingRole = false;
      state.roles = [];
      console.log("role redux fail", action);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
