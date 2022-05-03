import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listAllVendors } from "../actions/vendorActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import TextField from "@mui/material/TextField";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";

const HomePage = () => {
  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state.vendorListAll);
  let { loading, error, vendors } = vendorList;
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(listAllVendors());
    fetch(`https://api.notary.ink/api.php/records/counties`, {
      method: "get",
    })
      .then((r) => r.json())
      .then((res) => {
        let c = [];
        res.records.forEach((element) => {
          c.push(element.countyName);
        });
        setData(res.records);
      })
      .catch((err) => {
        error=err
    });
  }, [dispatch]);
  return (
    <>
      <h1>Notaries</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Autocomplete
            freeSolo
            value={search}
            onChange={(event, newValue) => {
              setSearch(newValue);
            }}
            id="free-solo-2-demo"
            disableClearable
            options={data.map((option) => option.countyId.toString())}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="Search Counties"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              );
            }}
          />
          <Row>
            {vendors
              .filter((s) => s.vendorFips == search)
              .map((product) => (
                <Col key={product.vendorId} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
