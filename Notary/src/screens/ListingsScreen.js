import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listListings } from "../actions/listingActions";

const ListingsScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const productList = useSelector((state) => state.listingsList);
  const { loading, error, listings } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listListings(productId));
    }
  }, [dispatch, history, userInfo, productId]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Vendors Listings</h1>
          <p>Vendor ID: {productId}</p>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={() => history.push(`/listings/${productId}`)}
          >
            <i className="fas fa-plus"></i> Add Listing
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>County ID</th>
                <th>Amount</th>
                <th>Created At</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Level</th>
                <th>Vendor ID</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((product, idx) => (
                <tr key={product.id}>
                  <td>{idx + 1}</td>
                  <td>{product.countyId}</td>
                  <td>{product.Amount}</td>
                  <td>{product.createDate}</td>
                  <td>{product.startDate}</td>
                  <td>{product.endDate}</td>
                  <td>{product.level}</td>
                  <td>{product.vendorId}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ListingsScreen;
