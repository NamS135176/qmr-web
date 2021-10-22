import React, { useState } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import HighlightOff from "@mui/icons-material/HighlightOff";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { deleteExpense, getCategory } from "api/category";
import CircularProgress from "@mui/material/CircularProgress";
export default function DeleteModal(props) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteExpense(props.item.id);
    const res1: any = await getCategory();
    props.setListExpense(
      res1.categories.filter((item: any) => item.count < 900)
    );
    setLoading(false);
    props.setOpen(false);
  };

  return (
    <Box>
      <Modal
        sx={{ zIndex: 10005 }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // open='open'
        onClose={() => {
          props.setOpen(false);
        }}
        open={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              height: "100%",
              bgcolor: "background.paper",
              // border: '2px solid #000',
              boxShadow: 24,
              maxHeight: "200px",
              //   borderRadius: 2,
              maxWidth: "400px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                padding: {
                  xs: "5px",
                  md: "5px",
                  backgroundColor: "#729f03",
                },
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 22,
                    pl: "5px",
                  }}
                >
                  Confirm Delete
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                wordBreak: "break-word",
                fontSize: "15px",
                py: "5px",
                px: "10px",
              }}
            >
              Are you sure you want to delete this category?
            </Typography>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "15px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Box sx={{ px: "10px" }}>
                  <Button
                    onClick={handleDelete}
                    sx={{
                      width: "100%",
                      backgroundColor: "#729f03",
                      color: "white",
                      "&:hover": { backgroundColor: "#729f03" },
                      marginTop: "15px",
                    }}
                  >
                    Confirm
                  </Button>
                </Box>
                <Box sx={{ px: "10px" }}>
                  <Button
                    onClick={() => {
                      props.setOpen(false);
                    }}
                    sx={{
                      width: "100%",
                      backgroundColor: "#787877",
                      color: "white",
                      "&:hover": { backgroundColor: "#729f03" },
                      marginTop: "15px",
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
