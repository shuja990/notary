import {
  LISTING_DETAILS_FAIL,
  LISTING_DETAILS_REQUEST,
  LISTING_DETAILS_SUCCESS,
  LISTING_LIST_FAIL,
  LISTING_LIST_REQUEST,
  LISTING_LIST_SUCCESS,
  LISTING_REGISTER_FAIL,
  LISTING_REGISTER_REQUEST,
  LISTING_REGISTER_SUCCESS,
  LISTING_UPDATE_PROFILE_FAIL,
  LISTING_UPDATE_PROFILE_REQUEST,
  LISTING_UPDATE_PROFILE_RESET,
  LISTING_UPDATE_PROFILE_SUCCESS,
} from "../constants/listingConstants";

export const listingsRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case LISTING_REGISTER_REQUEST:
      return { loading: true };
    case LISTING_REGISTER_SUCCESS:
      return { loading: false, listingsInfo: action.payload };
    case LISTING_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const listingListReducer = (state = { listings: [] }, action) => {
  switch (action.type) {
    case LISTING_LIST_REQUEST:
      return { loading: true };
    case LISTING_LIST_SUCCESS:
      return { loading: false, listings: action.payload };
    case LISTING_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listingDetailsReducer = (state = { listing: {} }, action) => {
  switch (action.type) {
    case LISTING_DETAILS_REQUEST:
      return { ...state, loading: true };
    case LISTING_DETAILS_SUCCESS:
      return { loading: false, listing: action.payload };
    case LISTING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listingUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case LISTING_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case LISTING_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, listingInfo: action.payload };
    case LISTING_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case LISTING_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};