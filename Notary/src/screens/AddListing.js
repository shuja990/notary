import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { addListing } from "../actions/listingActions";
import FormContainer from "../components/FormContainer";

const AddVendorListing = ({ location, history, match }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;

  const vendorRegister = useSelector((state) => state.vendorRegister);
  const { loading, error, vendorInfo } = vendorRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [countyId, setCountyId] = useState("");
  const [level, setLevel] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    let s = new Date()
    console.log(s.toISOString());
    console.log(s.toLocaleDateString());
    console.log(s.toISOString());
    console.log(s.toLocaleString());
    console.log(s.toUTCString());
    
    let listing = {
      countyId: countyId,
      level: level,
      vendorId: productId,
      createDate: new Date().toISOString().split('T')[0],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      Amount: amount,
    };
    dispatch(addListing(listing));
  };

  return (
    <FormContainer>
      <h1>Add Listing</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>County ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter County ID"
            value={countyId}
            onChange={(e) => setCountyId(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Level</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Add Listing
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AddVendorListing;
