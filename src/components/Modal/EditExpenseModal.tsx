import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import HighlightOff from "@mui/icons-material/HighlightOff";
import { useTranslation } from "react-i18next";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { editExpense, getCategory } from "api/category";
import DateSelectContext from "utils/context";
import CircularProgress from "@mui/material/CircularProgress";
import CategoryContext from "utils/CategoryContext";

export default function EditExpenseModal(props) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const { listCategories } = useContext(CategoryContext);
  const { reloadPage } = useContext(DateSelectContext);
  const handleCreateExpense = async () => {
    if (name.length > 50) {
      alert(t("customize.over"));
    }
    if (name != "" && name.length <= 50) {
      setLoading(true);
      const res: any = await editExpense(
        props.item.id,
        name,
        props.item.count,
        name,
        name,
        name,
        name,
        name
      );
      const res1: any = await getCategory();
      listCategories[1](res1.categories);
      props.setListExpense(
        res1.categories.filter((item: any) => item.count < 900)
      );
      setLoading(false);
      props.setOpen(false);
      reloadPage[1](!reloadPage[0]);
    }
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
                <IconButton onClick={() => props.setOpen(false)}>
                  <HighlightOff
                    sx={{
                      fontSize: {
                        xs: 25,
                        md: 30,
                      },
                      color: "white",
                    }}
                  ></HighlightOff>
                </IconButton>
                <Typography
                  sx={{ color: "white", fontWeight: "bold", fontSize: 22 }}
                >
                  {t("customize.editTitle")}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "100%", px: "10px", py: "10px" }}>
              <TextField
                onChange={(e) => {
                  setName(e.target.value);
                }}
                sx={{ width: "100%" }}
                id="outlined-basic"
                variant="outlined"
                defaultValue={
                  i18n.language == "en" ? props.item.name : props.item.nameJP
                }
              />
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
                <Button
                  onClick={handleCreateExpense}
                  sx={{
                    width: "100%",
                    backgroundColor: "#729f03",
                    color: "white",
                    "&:hover": { backgroundColor: "#729f03" },
                    marginTop: "15px",
                  }}
                  variant="text"
                >
                  {t("detailModal.enter")}
                </Button>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
