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
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { addVendor } from "../actions/vendorActions";
import FormContainer from "../components/FormContainer";

const AddVendorScreen = ({ location, history }) => {
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
  const [vendorHours, setVendorHours] = useState({
    days: "",
    startTime: "",
    endTime: "",
  });
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
      vendorAddress: vendorAddress,
      vendorAddress2: vendorAddress2,
      vendorCity: vendorCity,
      vendorCode: vendorCode,
      vendorCompany: vendorCompany,
      vendorEmail: vendorEmail,
      vendorFax: vendorFax,
      vendorFips: vendorFips,
      // vendorHours: vendorHours,
      vendorMobile: vendorMobile,
      vendorName: vendorName,
      vendorNotes: vendorNotes,
      vendorPassword: vendorPassword,
      vendorPhone: vendorPhone,
      vendorPhone2: vendorPhone2,
      vendorState: vendorState,
      vendorUserId: vendorUserId,
      vendorWebsite: vendorWebsite,
      vendorZip: vendorZip,
    };
    console.log(vendor);
    dispatch(addVendor(vendor));
  };

  return (
    <FormContainer>
      <h1>Add Vendor</h1>
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
            as="select"
            onChange={(e) => setVendorState(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </Form.Control>
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
          <Form.Label>Days of the Week you are Open</Form.Label>
          <Form.Control
            type="text"
            placeholder="Mon-Fri"
            value={vendorHours.days}
            onChange={(e) =>
              setVendorHours({ ...vendorHours, days: e.target.value })
            }
          ></Form.Control>
          <Form.Label>Office Hours Start</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Start time"
            value={vendorHours.startTime}
            onChange={(e) =>
              setVendorHours({ ...vendorHours, startTime: e.target.value })
            }
          ></Form.Control>
          <Form.Label>Office Hours End</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter End time"
            value={vendorHours.endTime}
            onChange={(e) =>
              setVendorHours({ ...vendorHours, endTime: e.target.value })
            }
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
          <Form.Label>Mobile Office</Form.Label>
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

export default AddVendorScreen;
