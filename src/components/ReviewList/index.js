import React, { useState, useEffect } from "react";
import ProductApi from "../../api/product";
import { Button, Form } from "react-bootstrap";
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import ReactPaginate from "react-paginate";

import Alert from "react-s-alert";

import Review from "../Review";

const ReviewList = ({ isAuth, productId, closeButton }) => {
  const [listReview, setListReview] = useState(undefined);
  const [isReviewed, setIsReviewed] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hasNewReview, setHasNewReview] = useState(false);

  useEffect(() => {
    const getListReview = async () => {
      try {
        const response = await ProductApi.getProductReview(productId);
        setListReview(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const checkIsReviewed = async () => {
      try {
        const response = await ProductApi.checkProductIsReviewed(productId);
        setIsReviewed(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (isAuth) {
      checkIsReviewed();
    }
    getListReview();
    setHasNewReview(false);
  }, [productId, hasNewReview, isAuth]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ProductApi.createProductReview(productId, comment, rating);
      setHasNewReview(true);
      Alert.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {listReview &&
        (listReview.content.length > 0 ? (
          <>
            {listReview.content.map((review) => (
              <Review review={review} closeButton={closeButton} key={review.id} />
            ))}
            <ReactPaginate
              pageCount={listReview.totalPages}
              pageRangeDisplayed={listReview.size}
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
            />
          </>
        ) : (
          <h4 className="text-center mb-5">Chưa có đánh giá</h4>
        ))}

      {isAuth &&
        (isReviewed ? (
          <h4 className="text-center">Bạn đã đánh giá sản phẩm</h4>
        ) : (
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Label>
                <b>Đánh giá của bạn</b>
                <Rating
                  step={1}
                  fractions={2}
                  onChange={(value) => setRating(value)}
                  emptySymbol={<BsStar size="30px" />}
                  fullSymbol={<BsStarFill size="30px" />}
                />
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit">Thêm nhận xét</Button>
          </Form>
        ))}
    </>
  );
};

export default ReviewList;
