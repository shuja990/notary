import axios from "axios";
import {
  VENDOR_DETAILS_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_REGISTER_FAIL,
  VENDOR_REGISTER_REQUEST,
  VENDOR_REGISTER_SUCCESS,
  VENDOR_UPDATE_PROFILE_FAIL,
  VENDOR_UPDATE_PROFILE_REQUEST,
  VENDOR_UPDATE_PROFILE_SUCCESS,
} from "../constants/vendorConstants";

export const addVendor =
  (
    vendorAddress,
    vendorAddress2,
    vendorCity,
    vendorCode,
    vendorCompany,
    vendorEmail,
    vendorFax,
    vendorFips,
    vendorHours,
    vendorMobile,
    vendorName,
    vendorNotes,
    vendorPassword,
    vendorPhone,
    vendorPhone2,
    vendorState,
    vendorUserId,
    vendorWebsite,
    vendorZip
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: VENDOR_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://api.notary.ink/api.php/records/vendors",
        {
          vendorAddress,
          vendorAddress2,
          vendorCity,
          vendorCode,
          vendorCompany,
          vendorEmail,
          vendorFax,
          vendorFips,
          vendorHours,
          vendorMobile,
          vendorName,
          vendorNotes,
          vendorPassword,
          vendorPhone,
          vendorPhone2,
          vendorState,
          vendorUserId,
          vendorWebsite,
          vendorZip,
        },
        config
      );
      const d = await axios.get(
        `https://api.notary.ink/api.php/records/vendors/${data}`
      );
      console.log(d);

      dispatch({
        type: VENDOR_REGISTER_SUCCESS,
        payload: d.data,
      });
    } catch (error) {
      dispatch({
        type: VENDOR_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getVendorDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_DETAILS_REQUEST,
    });

    const {
      vendorInfo: { vendorInfo },
    } = getState();

    const { data } = await axios.get(
      `https://api.notary.ink/api.php/records/vendors/${vendorInfo.id}`
    );

    dispatch({
      type: VENDOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: VENDOR_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateVendorProfile = (vendor) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axios.put(
      `https://api.notary.ink/api.php/records/vendors/${vendor.id}`,
      vendor
    );
    const d = await axios.get(
      `https://api.notary.ink/api.php/records/vendors/${vendor.id}`
    );
    console.log(d);
    dispatch({
      type: VENDOR_UPDATE_PROFILE_SUCCESS,
      payload: d.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: VENDOR_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const listVendors = (user) => async (dispatch) => {
  try {
    dispatch({
      type: VENDOR_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `https://api.notary.ink/api.php/records/vendors/`
    );
    let d = data.filter((e) => e.vendorUserID === user.id);

    dispatch({
      type: VENDOR_LIST_SUCCESS,
      payload: d,
    });
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
