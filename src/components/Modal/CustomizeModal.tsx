import React, { useState } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import "./style.scss";
import Typography from "@mui/material/Typography";
import NoteAdd from "@mui/icons-material/NoteAdd";
import Button from "@mui/material/Button";
import HighlightOff from "@mui/icons-material/HighlightOff";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { deleteExpense } from "api/category";
import EditExpenseModal from "./EditExpenseModal";
import AddExpenseModal from "./AddExpenseModal";
import DeleteModal from "./DeleteModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
export default function CustomizeModal(props) {
  const [item, setItem] = useState<any>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdt] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openCfDel, setOpenCfDel] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      {openAdd ? (
        <AddExpenseModal
          setListExpense={props.setListExpense}
          lastCount={props.listAll[props.listAll.length - 1].count}
          setOpen={setOpenAdd}
        />
      ) : (
        <></>
      )}
      {openEdit ? (
        <EditExpenseModal
          setListExpense={props.setListExpense}
          item={item}
          setOpen={setOpenEdt}
        />
      ) : (
        <></>
      )}
      {openCfDel ? (
        <DeleteModal
          setListExpense={props.setListExpense}
          item={item}
          setOpen={setOpenCfDel}
        />
      ) : (
        <></>
      )}
      <Modal
        sx={{ zIndex: 10000 }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
              width: "100%",
              height: "100%",
              bgcolor: "background.paper",
              // border: '2px solid #000',
              boxShadow: 24,
              maxHeight: "800px",
              //   borderRadius: 2,
              maxWidth: "512px",
              //   overflow: "scroll",
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
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => props.setOpen(false)}>
                  <ArrowBackOutlinedIcon
                    sx={{
                      fontSize: {
                        xs: 25,
                        md: 30,
                      },
                      color: "white",
                    }}
                  ></ArrowBackOutlinedIcon>
                </IconButton>
                <Typography
                  sx={{ color: "white", fontWeight: "bold", fontSize: 22 }}
                >
                  Edit Category
                </Typography>
              </Box>

              {editMode ? (
                <Button
                  onClick={() => {
                    setEditMode(false);
                  }}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "white" },
                  }}
                >
                  Done
                </Button>
              ) : (
                <Box>
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon sx={{ color: "white" }}></MoreVertIcon>
                  </IconButton>
                  <Menu
                    sx={{ zIndex: 10006 }}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        setEditMode(true);
                        setAnchorEl(null);
                      }}
                    >
                      Edit
                    </MenuItem>
                  </Menu>
                </Box>
              )}
              {/* <Button
                onClick={() => {
                  setEditMode(!editMode);
                }}
                sx={{
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "white" },
                }}
              >
                Edit
              </Button> */}
            </Box>
            <Box sx={{ overflow: "scroll", height: "90%" }}>
              <List>
                {props.listAll.map((item, index) => {
                  if (editMode) {
                    return (
                      <ListItem
                        key={index}
                        disableGutters
                        secondaryAction={
                          <IconButton
                            onClick={() => {
                              setItem(item);
                              setOpenCfDel(true);
                            }}
                            sx={{ marginRight: "10px" }}
                          >
                            <HighlightOff />
                          </IconButton>
                        }
                      >
                        <ListItemButton
                          onClick={() => {
                            setItem(item);
                            setOpenEdt(true);
                          }}
                          sx={{ borderBottom: "1px solid #ddd", mx: "10px" }}
                        >
                          <ListItemText primary={`${item.name}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  } else {
                    return (
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setItem(item);
                            setOpenEdt(true);
                          }}
                          sx={{ borderBottom: "1px solid #ddd", mx: "10px" }}
                        >
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      </ListItem>
                    );
                  }
                })}
              </List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setOpenAdd(true);
                  }}
                  sx={{ borderBottom: "1px solid #ddd", mx: "10px" }}
                >
                  <ListItemText
                    sx={{ color: "#ddd", fontWeight: "bold" }}
                    primary="+ Add Expense Category"
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
