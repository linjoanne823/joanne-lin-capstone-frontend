import React, { useState } from "react";
// import Modal from "react-modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const UseModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };
  return (
    <div>
      <Modal open={handleOpen} onClose={handleClose}>
        <Box sx={style} onClick={(e) => e.stopPropagation()}>
          <Button sx={{ right: "2rem" }} onClick={() => props.closeModal(-1)}>
            x
          </Button>

          <Typography>{props.children}</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UseModal;
