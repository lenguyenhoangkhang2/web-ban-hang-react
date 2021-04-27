import React, { useState } from "react";
import { Col, Form, Button, Spinner, Card, Alert } from "react-bootstrap";
import AsyncSelect from "react-select/async";

import CategoryService from "../services/category.service";
import BrandService from "../services/brand.service";
import { postProduct } from "../services/product.service";

const initState = {
  name: "",
  description: "",
  categoryId: undefined,
  brandId: undefined,
  price: "",
  quantity: "",
  discount: "",
};

const SaveProduct = (props) => {
  const [product, setProduct] = useState(initState);
  const [productImage, setProductImage] = useState({ file: null, preview: undefined });
  const [message, setMessage] = useState({ success: undefined, error: undefined });
  const [loading, setLoading] = useState(false);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    setMessage({ success: undefined, error: undefined });
    setLoading(true);

    const formData = new FormData();
    formData.append("product_image", productImage.file);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], {
        type: "application/json",
      })
    );

    postProduct(formData)
      .then((response) => {
        console.log(response.data);
        setMessage({ success: response.data.name + " has been added!" });
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage({ error: errorMessage });
      });
  };

  const loadCategoryOptions = async (categoryInput) => {
    const response = await CategoryService.findByCategoryName(categoryInput);
    const optionsCategoryCustom = response.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    return optionsCategoryCustom;
  };

  const loadBrandOptions = async (brandInput) => {
    const response = await BrandService.findByBrandName(brandInput);
    const optionsBrandCustom = response.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    return optionsBrandCustom;
  };

  return (
    <Col className="align-items-center">
      <Card as={Col} md="8">
        <Card.Header>
          <h3 className="text-center">Add new product</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSaveProduct}>
            <Form.Row>
              <Form.Group as={Col} md="8">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Category</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  onChange={(e) => setProduct({ ...product, categoryId: e.value })}
                  placeholder="category options"
                  loadOptions={loadCategoryOptions}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Brands</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  onChange={(e) => setProduct({ ...product, brandId: e.value })}
                  placeholder="brand options"
                  loadOptions={loadBrandOptions}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  value={product.discount}
                  onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                  required
                  min={0}
                  max={100}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={product.quantity}
                  onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  setProductImage({
                    file: e.target.files[0],
                    preview: URL.createObjectURL(e.target.files[0]),
                  });
                }}
              />
              {productImage.preview && (
                <Card as={Col} md="8">
                  <Card.Img src={productImage.preview} width="50%" />
                </Card>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border"></Spinner>
                ) : (
                  <span>Add Product</span>
                )}
              </Button>
            </Form.Group>

            {message.error && (
              <Form.Group>
                <Alert variant="danger">{message.error}</Alert>
              </Form.Group>
            )}

            {message.success && (
              <Form.Group>
                <Alert variant="success">{message.success}</Alert>
              </Form.Group>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SaveProduct;
