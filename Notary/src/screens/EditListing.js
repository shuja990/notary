import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  getListingDetails,
  updateListingProfile,
} from "../actions/listingActions";

const ListingEdit = ({ match, history }) => {
  const productId = match.params.id;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [countyId, setCountyId] = useState("");
  const [level, setLevel] = useState("");
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.listingDetails);
  const { loading, error, listing } = productDetails;
  const productUpdate = useSelector((state) => state.listingUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getListingDetails(productId));
      setCountyId(listing.countyId)
      setLevel(listing.level)
      setAmount(listing.Amount)

    }
  }, [dispatch, history, productId, listing.vendorId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    let list = {
      listingId:listing.ListingId,
      countyId: countyId,
      level: level,
      vendorId: productId,
      createDate: listing.createDate,
      startDate: listing.startDate,
      endDate: listing.endDate,
      Amount: amount,
    };
    dispatch(updateListingProfile(list,productId));
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
      <h1>Edit Listing</h1>
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
          Update
        </Button>
      </Form>
    </FormContainer>
    </>
  );
};

export default ListingEdit;
