import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listListings } from "../actions/listingActions";
import { getVendorDetails } from "../actions/vendorActions";

const ListingScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.listingsList);
  const { loading: l, error: e, listings } = productList;

  const productDetails = useSelector((state) => state.vendorDetails);
  const { loading, error, vendor } = productDetails;

  useEffect(() => {
    dispatch(getVendorDetails(match.params.id));
    dispatch(listListings(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{e}</Message>
      ) : (
        <>
          <Row>
            <Col md={9}>
              <h2>Vendor Details</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{vendor.vendorName}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Vendor ID: {vendor.vendorId}</ListGroup.Item>
                <ListGroup.Item>
                  Vendor Address: {vendor.vendorAddress}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor Address 2: {vendor.vendorAddress2}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor City: {vendor.vendorCity}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor State: {vendor.vendorState}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor Zip Code: {vendor.vendorZip}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor FIPS: {vendor.vendorFips}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor Company: {vendor.vendorCompany}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor Code: {vendor.vendorCode}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor Email: {vendor.vendorEmail}
                </ListGroup.Item>
                <ListGroup.Item>Vendor Fax: {vendor.vendorFax}</ListGroup.Item>
                <ListGroup.Item>
                  Vendor Notes: {vendor.vendorNotes}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor Phone: {vendor.vendorPhone}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor Mobile: {vendor.vendorPhone2}
                </ListGroup.Item>
                <ListGroup.Item>
                  Vendor Website: {vendor.vendorWebsite}
                </ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>Vendor Listings</h2>
              {l ? (
                <Loader />
              ) : e ? (
                <Message variant="danger">{e}</Message>
              ) : (
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
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ListingScreen;
