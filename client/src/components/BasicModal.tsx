import { Box, Modal, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
export interface IBasicModal {
  isOpen: boolean;
  handleClose: () => void;
  headerContent: ReactNode;
  children: ReactNode;
}
export default function BasicModal({
  isOpen,
  handleClose,
  headerContent,
  children,
}: IBasicModal) {
  if (!isOpen) return null;
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="flex justify-center"
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            {headerContent}
          </Typography>
          {children}
        </Box>
      </Modal>
    </>
  );
}
