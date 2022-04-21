import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAllVendors, listVendors } from "../actions/vendorActions";

const VendorScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.vendorList);
  const { loading, error, vendors } = productList;
  const vendorList = useSelector((state) => state.vendorListAll);
  const { loading: l, error: e, vendors: all } = vendorList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo) {
      history.push("/login");
    } else if (userInfo?.role_id === 1) {
      dispatch(listAllVendors());
    } else {
      dispatch(listVendors());
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Vendors</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => history.push("/vendors/addvendor")}>
            <i className="fas fa-plus"></i> Add Vendor
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : e ? (
        <Message variant="danger">{e}</Message>
      ) : l ? (
        <Message variant="danger">{l}</Message>
      ) : (
        <>
          {userInfo?.role_id === 1
            ? all.map((product) => (
                <Card>
                  <Card.Header>{product.vendorId}</Card.Header>
                  <Card.Body>
                    <Card.Title>{product.vendorName}</Card.Title>

                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Vendor Address: {product.vendorAddress}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Address 2: {product.vendorAddress2}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor City: {product.vendorCity}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor State: {product.vendorState}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Zip Code: {product.vendorZip}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor FIPS: {product.vendorFips}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Company: {product.vendorCompany}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Code: {product.vendorCode}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Email: {product.vendorEmail}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Fax: {product.vendorFax}
                      </ListGroupItem>
                      <ListGroupItem>{product.vendorNotes}</ListGroupItem>
                      <ListGroupItem>
                        Vendor Phone: {product.vendorPhone}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Mobile: {product.vendorPhone2}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Website: {product.vendorWebsite}
                      </ListGroupItem>
                      <ListGroupItem>
                        <LinkContainer to={`/vendors/edit/${product.vendorId}`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i> Edit Vendor
                          </Button>
                        </LinkContainer>
                        <LinkContainer to={`/listings/${product.vendorId}`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-plus"></i> Add Listing
                          </Button>
                        </LinkContainer>
                        <LinkContainer
                          to={`/vendorlistings/${product.vendorId}`}
                        >
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-eye"></i> View Listings
                          </Button>
                        </LinkContainer>
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </Card>
              ))
            : vendors.map((product) => (
                <Card>
                  <Card.Header>{product.vendorId}</Card.Header>
                  <Card.Body>
                    <Card.Title>{product.vendorName}</Card.Title>

                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Vendor Address: {product.vendorAddress}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Address 2: {product.vendorAddress2}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor City: {product.vendorCity}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor State: {product.vendorState}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Zip Code: {product.vendorZip}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor FIPS: {product.vendorFips}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Company: {product.vendorCompany}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Code: {product.vendorCode}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Email: {product.vendorEmail}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Fax: {product.vendorFax}
                      </ListGroupItem>
                      <ListGroupItem>{product.vendorNotes}</ListGroupItem>
                      <ListGroupItem>
                        Vendor Phone: {product.vendorPhone}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Mobile: {product.vendorPhone2}
                      </ListGroupItem>
                      <ListGroupItem>
                        Vendor Website: {product.vendorWebsite}
                      </ListGroupItem>
                      <ListGroupItem>
                        <LinkContainer to={`/vendors/edit/${product.vendorId}`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i> Edit Vendor
                          </Button>
                        </LinkContainer>
                        <LinkContainer to={`/listings/${product.vendorId}`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-plus"></i> Add Listing
                          </Button>
                        </LinkContainer>
                        <LinkContainer
                          to={`/vendorlistings/${product.vendorId}`}
                        >
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-eye"></i> View Listings
                          </Button>
                        </LinkContainer>
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </Card>
              ))}
        </>
      )}
    </>
  );
};

export default VendorScreen;
