import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = ({ currentUser, isAdmin, logOut }) => {
  return (
    <Navbar bg="dark" className="mb-4" variant="dark">
      <Navbar.Brand>
        <Nav.Link as={Link} to="/">
          UIT 2018
        </Nav.Link>
      </Navbar.Brand>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/home">
            Trang chủ
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/smartphone">
            Điện Thoại
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/laptop">
            Laptop
          </Nav.Link>
        </Nav.Item>
        {isAdmin && (
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/add-product">
              Thêm sản phẩm
            </Nav.Link>
          </Nav.Item>
        )}
        {isAdmin && (
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/orders">
              Danh sách đơn hàng
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
      {currentUser ? (
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/cart" className="relative">
              Giỏ Hàng
              <AiOutlineShoppingCart size="30px" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/profile">
              {currentUser.name}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/login" onClick={() => logOut()}>
              LogOut
            </Nav.Link>
          </Nav.Item>
        </Nav>
      ) : (
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
    </Navbar>
  );
};

export default Header;
