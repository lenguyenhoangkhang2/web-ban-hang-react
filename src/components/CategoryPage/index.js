import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import ProductList from "../Product-List";

const CategoryPage = ({ isAuth, type, isAdmin }) => {
  const [price, setPrice] = useState({ min: 0, max: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSorBy] = useState("createdDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const onChangePrice = (e) => {
    if (e.target.value === "all") {
      setPrice({ min: null, max: null });
      return;
    }
    const { min, max } = JSON.parse(e.target.value);
    setPrice({ min: min, max: max });
  };

  const onChangeSorted = (e) => {
    switch (e.target.value) {
      case "latest":
        setSorBy("createdDate");
        setSortDirection("desc");
        break;
      case "priceAsc":
        setSorBy("price");
        setSortDirection("asc");
        break;
      case "priceDesc":
        setSorBy("price");
        setSortDirection("desc");
        break;
      default:
        break;
    }
  };

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Form.Row className="justify-content-between">
        <Form.Group as={Col} md="8" controlId="formSearch">
          <Form.Label>
            <strong>TÌM KIẾM</strong>
          </Form.Label>
          <Form.Control type="text" onChange={onChangeSearchTerm} />
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="formPrice">
          <Form.Label>Giá sản phẩm</Form.Label>
          <Form.Control as="select" onChange={onChangePrice}>
            <option value="all">Tất cả</option>
            <option value={JSON.stringify({ max: 5000000 })}>Dưới 5 Triệu</option>
            <option value={JSON.stringify({ min: 5000000, max: 10000000 })}>
              5 - 10 Triệu
            </option>
            <option value={JSON.stringify({ min: 10000000, max: 20000000 })}>
              10 - 20 Triệu
            </option>
            <option value={JSON.stringify({ min: 20000000 })}>Hơn 20 Triệu</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="formSortBy">
          <Form.Label>Sắp xếp theo</Form.Label>
          <Form.Control as="select" onChange={onChangeSorted}>
            <option value="latest">Mới nhất</option>
            <option value="priceAsc">Giá thấp đến cao</option>
            <option value="priceDesc">Giá cao đến thấp</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <ProductList
        page={page}
        size={1}
        sortBy={sortBy}
        minPrice={price.min}
        maxPrice={price.max}
        sortDirection={sortDirection}
        name={searchTerm}
        category={type}
        isAdmin={isAdmin}
        isAuth={isAuth}
        enableBtnAddToCard={true}
        enablePagination={true}
        handleWithTotalPage={(totalPage) => setTotalPage(totalPage)}
      />
      <Row className="justify-content-center product-list-pagination">
        <Col md="5">
          <ReactPaginate
            pageCount={totalPage}
            pageRangeDisplayed={size}
            marginPagesDisplayed={5}
            nextLabel={<FaAngleRight />}
            previousLabel={<FaAngleLeft />}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
            disabledClassName={"disabled"}
            onPageChange={(e) => setPage(e.selected)}
          />
        </Col>
      </Row>
    </>
  );
};

export default CategoryPage;
