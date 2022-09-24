import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

function Register({ openRegister, handleClose, event }) {
  const {
    eventName,
    lastRegistrationDate,
    eventDetails,
    namereq,
    phonereq,
    rollnoreq,
    emailreq,
    yearreq,
    sectionreq,
    deptreq,
    otherDetails,
  } = event;

  const [values, setValues] = useState({
    name: "",
    phone: "",
    roll: "",
    email: "",
    year: "",
    section: "",
    dept: "",
  });
  const { name, phone, roll, email, year, section, dept } = values;

  const [extra, setExtra] = useState({});

  const handleChange = (label) => (event) => {
    setValues({ ...values, [label]: event.target.value });
  };

  const handleExtra = (label) => (event) => {
    setExtra({ ...extra, [label]: event.target.value });
  };

  const setToDefault = () => {
    setValues({
      name: "",
      phone: "",
      roll: "",
      email: "",
      year: "",
      section: "",
      dept: "",
    });
    setExtra({});
  };

  //   console.log("extra: ", extra);
  console.log("values: ", values);
  return (
    <>
      <Dialog open={openRegister} onClose={handleClose}>
        <DialogTitle>
          Register for{" "}
          <span className="text-primary underline decoration-solid ">
            {eventName}
          </span>
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{ mb: 1, mt: 1.5 }}
            // color="text.secondary"
            className="text-base font-roboto tracking-wider capitalize"
          >
            Event Details
          </Typography>
          <Typography className="text-sm  ">{event.eventDetails}</Typography>
          {namereq && (
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              onChange={handleChange("name")}
              value={name}
              type="text"
              fullWidth
              variant="standard"
            />
          )}
          {phonereq && (
            <TextField
              autoFocus
              margin="dense"
              label="phone number"
              onChange={handleChange("phone")}
              value={phone}
              type="text"
              fullWidth
              variant="standard"
            />
          )}

          {emailreq && (
            <TextField
              autoFocus
              margin="dense"
              label="email"
              onChange={handleChange("email")}
              value={email}
              type="text"
              fullWidth
              variant="standard"
            />
          )}

          {rollnoreq && (
            <TextField
              autoFocus
              margin="dense"
              label="Roll Number"
              onChange={handleChange("roll")}
              value={roll}
              type="text"
              fullWidth
              variant="standard"
            />
          )}
          {yearreq && (
            <TextField
              autoFocus
              margin="dense"
              label="Year"
              onChange={handleChange("year")}
              value={year}
              type="text"
              fullWidth
              variant="standard"
            />
          )}
          {sectionreq && (
            <TextField
              autoFocus
              margin="dense"
              label="Section"
              onChange={handleChange("section")}
              value={section}
              type="text"
              fullWidth
              variant="standard"
            />
          )}
          {deptreq && (
            <TextField
              autoFocus
              margin="dense"
              label="Department"
              onChange={handleChange("dept")}
              value={dept}
              type="text"
              fullWidth
              variant="standard"
            />
          )}

          {otherDetails.map((name, key) => (
            <TextField
              key={key}
              autoFocus
              margin="dense"
              value={extra.name}
              onChange={handleExtra(name)}
              label={name}
              type="text"
              fullWidth
              variant="standard"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setToDefault();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleClose}>Register</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Register;
