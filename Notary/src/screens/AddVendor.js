// vendorAddress,
// vendorAddress2,
// vendorCity,
// vendorCode,
// vendorCompany,
// vendorEmail,
// vendorFax,
// vendorFips,
// vendorHours,
// vendorId,
// vendorMobile,
// vendorName,
// vendorNotes,
// vendorPassword,
// vendorPhone,
// vendorPhone2,
// vendorState,
// vendorUserId,
// vendorWebsite,
// vendorZip
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { addVendor } from "../actions/vendorActions";
import FormContainer from "../components/FormContainer";

const VendorScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const vendorRegister = useSelector((state) => state.vendorRegister);
  const { loading, error, vendorInfo } = vendorRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [vendorAddress, setVendorAddress] = useState("");
  const [vendorAddress2, setVendorAddress2] = useState("");
  const [vendorCity, setVendorCity] = useState("");
  const [vendorCode, setVendorCode] = useState("");
  const [vendorCompany, setVendorCompany] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorFax, setVendorFax] = useState("");
  const [vendorFips, setVendorFips] = useState("");
  const [vendorHours, setVendorHours] = useState("");
  const [vendorMobile, setVendorMobile] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorNotes, setVendorNotes] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [vendorPhone2, setVendorPhone2] = useState("");
  const [vendorState, setVendorState] = useState("");
  const [vendorUserId, setVendorUserId] = useState(userInfo.id);
  const [vendorWebsite, setVendorWebsite] = useState("");
  const [vendorZip, setVendorZip] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    let vendor = {
      vendorAddress: vendorAddress.toString(),
      vendorAddress2 : vendorAddress2.toString(),
      vendorCity: vendorCity.toString(),
      vendorCode:vendorCode.toString(),
      vendorCompany:vendorCompany.toString(),
      vendorEmail:vendorEmail.toString(),
      vendorFax:vendorFax.toString(),
      // vendorFips:vendorFips.toString(),
      vendorHours:vendorHours.toString(),
      // vendorMobile:vendorMobile.toString(),
      vendorName:vendorName.toString(),
      vendorNotes:vendorNotes.toString(),
      vendorPassword:vendorPassword.toString(),
      vendorPhone:vendorPhone.toString(),
      vendorPhone2:vendorPhone2.toString(),
      vendorState:vendorState.toString(),
      vendorUserId:vendorUserId,
      vendorWebsite:vendorWebsite.toString(),
      vendorZip:vendorZip.toString(),
    }
    console.log(vendor);
    dispatch(
      addVendor(vendor)
    );
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Vendor Name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Vendor Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={vendorEmail}
            onChange={(e) => setVendorEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Website"
            value={vendorWebsite}
            onChange={(e) => setVendorWebsite(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Vendor Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={vendorAddress}
            onChange={(e) => setVendorAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Vendor Address 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address 2"
            value={vendorAddress2}
            onChange={(e) => setVendorAddress2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            value={vendorCity}
            onChange={(e) => setVendorCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={vendorState}
            onChange={(e) => setVendorState(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Zip Code"
            value={vendorZip}
            onChange={(e) => setVendorZip(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>FIPS</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter FIPS Code"
            value={vendorFips}
            onChange={(e) => setVendorFips(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Vendor Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Vendor Code"
            value={vendorCode}
            onChange={(e) => setVendorCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={vendorCompany}
            onChange={(e) => setVendorCompany(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Vendor Hours</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter hours"
            value={vendorHours}
            onChange={(e) => setVendorHours(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter mobile number"
            value={vendorMobile}
            onChange={(e) => setVendorMobile(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Vendor Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone"
            value={vendorPhone}
            onChange={(e) => setVendorPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Vendor Phone 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone 2"
            value={vendorPhone2}
            onChange={(e) => setVendorPhone2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Fax</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Fax Number"
            value={vendorFax}
            onChange={(e) => setVendorFax(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={vendorNotes}
            onChange={(e) => setVendorNotes(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default VendorScreen;
