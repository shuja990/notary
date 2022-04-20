import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listVendors } from "../actions/vendorActions";

const VendorScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.vendorList);
  const { loading, error, vendors } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo) {
      history.push("/login");
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
          <Button className="my-3" onClick={() => history.push("/addvendor")}>
            <i className="fas fa-plus"></i> Add Vendor
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
                <th>Vendor Address</th>
                <th>Vendor Address 2</th>
                <th>Vendor City</th>
                <th>Vendor Code</th>
                <th>Vendor Company</th>
                <th>Vendor Email</th>
                <th>Vendor Fax</th>
                <th>Vendor Fips</th>
                <th>Vendor Name</th>
                <th>Vendor Notes</th>
                <th>Vendor Phone</th>
                <th>Vendor Phone2</th>
                <th>Vendor State</th>
                <th>Vendor Website</th>
                <th>Vendor Zip</th>
                <th>Edit Vendor/Add Listing</th>

              </tr>
            </thead>
            <tbody>
              {vendors.map((product,idx) => (
                <tr key={product.id}>
                  <td>{idx+1}</td>
                  <td>{product.vendorAddress}</td>
                  <td>{product.vendorAddress2}</td>
                  <td>{product.vendorCity}</td>
                  <td>{product.vendorCode}</td>
                  <td>{product.vendorCompany}</td>
                  <td>{product.vendorEmail}</td>
                  <td>{product.vendorFax}</td>
                  <td>{product.vendorFips}</td>
                  <td>{product.vendorName}</td>
                  <td>{product.vendorNotes}</td>
                  <td>{product.vendorPhone}</td>
                  <td>{product.vendorPhone2}</td>
                  <td>{product.vendorState}</td>
                  <td>{product.vendorWebsite}</td>
                  <td>{product.vendorZip}</td>
                  <td>
                    <LinkContainer to={`/vendors/edit/${product.vendorId}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/listings/${product.vendorId}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-plus"></i>
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/vendorlistings/${product.vendorId}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-eye"></i>
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default VendorScreen;
