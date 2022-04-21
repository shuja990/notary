import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  vendorDetailsReducer,
  vendorListAllReducer,
  vendorListReducer,
  vendorRegisterReducer,
  vendorUpdateProfileReducer,
} from "./reducers/vendorReducer";
import {
  listingDetailsReducer,
  listingListReducer,
  listingsRegisterReducer,
  listingUpdateProfileReducer,
} from "./reducers/listingsReducer";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  vendorDetails: vendorDetailsReducer,
  vendorUpdate: vendorUpdateProfileReducer,
  vendorRegister: vendorRegisterReducer,
  vendorList: vendorListReducer,
  vendorListAll: vendorListAllReducer,
  listingsList: listingListReducer,
  listingRegister: listingsRegisterReducer,
  listingDetails: listingDetailsReducer,
  listingUpdate: listingUpdateProfileReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
