import axios from "axios";
import {
  LISTING_LIST_FAIL,
  LISTING_LIST_REQUEST,
  LISTING_LIST_SUCCESS,
  LISTING_REGISTER_FAIL,
  LISTING_REGISTER_REQUEST,
  LISTING_REGISTER_SUCCESS,
} from "../constants/listingConstants";

export const addListing = (listing) => async (dispatch) => {
  try {
    dispatch({
      type: LISTING_REGISTER_REQUEST,
    });

    const { data } = await axios.post(
      "https://api.notary.ink/api.php/records/listings",
      listing
    );
    const d = await axios.get(
      `https://api.notary.ink/api.php/records/listings`
    );

    let l = data.records.filter((e) => e.vendorId === listing.vendorId);

    dispatch({
      type: LISTING_REGISTER_SUCCESS,
      payload: l,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LISTING_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listListings = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LISTING_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `https://api.notary.ink/api.php/records/listings`
    );
    console.log(data);
    let d = data.records.filter((e) => e.vendorId == id);
console.log(d);
    dispatch({
      type: LISTING_LIST_SUCCESS,
      payload: d,
    });
  } catch (error) {
    dispatch({
      type: LISTING_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
