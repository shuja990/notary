import {
  VENDOR_DETAILS_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_RESET,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_RESET,
  VENDOR_REGISTER_FAIL,
  VENDOR_REGISTER_REQUEST,
  VENDOR_REGISTER_SUCCESS,
  VENDOR_UPDATE_PROFILE_FAIL,
  VENDOR_UPDATE_PROFILE_REQUEST,
  VENDOR_UPDATE_PROFILE_SUCCESS,
  VENDOR_UPDATE_PROFILE_RESET,
} from "../constants/vendorConstants";

export const vendorRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDOR_REGISTER_REQUEST:
      return { loading: true };
    case VENDOR_REGISTER_SUCCESS:
      return { loading: false, vendorInfo: action.payload };
    case VENDOR_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const vendorDetailsReducer = (state = { vendor: {} }, action) => {
  switch (action.type) {
    case VENDOR_DETAILS_REQUEST:
      return { ...state, loading: true };
    case VENDOR_DETAILS_SUCCESS:
      return { loading: false, vendor: action.payload };
    case VENDOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case VENDOR_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const vendorUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDOR_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case VENDOR_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, vendorInfo: action.payload };
    case VENDOR_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case VENDOR_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const vendorListReducer = (state = { vendors: [] }, action) => {
  switch (action.type) {
    case VENDOR_LIST_REQUEST:
      return { loading: true };
    case VENDOR_LIST_SUCCESS:
      return { loading: false, vendors: action.payload };
    case VENDOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    case VENDOR_LIST_RESET:
      return { vendors: [] };
    default:
      return state;
  }
};
