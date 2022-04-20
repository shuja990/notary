import {
  LISTING_LIST_FAIL,
  LISTING_LIST_REQUEST,
  LISTING_LIST_SUCCESS,
  LISTING_REGISTER_FAIL,
  LISTING_REGISTER_REQUEST,
  LISTING_REGISTER_SUCCESS,
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
