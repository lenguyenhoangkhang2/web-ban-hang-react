import React from "react";
import { Button } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

export default function YesNoQuestion({ isOpen, onClickYes, onClickNo }) {
  const handleOnYes = () => {
    onClickYes();
  };

  const handleOnNo = () => {
    onClickNo();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleOnNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Xác nhận xóa sản phẩm"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn thực sự muốn xóa sản phẩm
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnYes} color="primary">
          Đồng ý
        </Button>
        <Button onClick={handleOnNo} color="primary" autoFocus>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

YesNoQuestion.defaultProps = {
  open: false,
};

YesNoQuestion.propTypes = {
  open: PropTypes.bool.isRequired,
  onClickYes: PropTypes.func,
  onClickNo: PropTypes.func,
};
