import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Register({
  openRegister,
  handleClose,
  event,
  setRegistered,
  refreshRegistrations,
}) {
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

  // console.log("otherDetails", otherDetails);
  const { data: session, status } = useSession();

  const username = session?.user.email;

  // console.log("Session Data: ", session);
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

  // console.log("extra: ", extra);
  // console.log("values: ", values);

  const handleRegister = async () => {
    if (namereq && name.length < 3) {
      toast.error("Name should contain more than 2 characters", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (phonereq && phone.length != 10) {
      toast.error("Phone no should contain 10 digits", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (emailreq && !email.includes("@")) {
      toast.error("Enter a valid email", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (
      (rollnoreq && roll.length < 1) ||
      (yearreq && year.length < 1) ||
      (deptreq && dept.length < 1)
    ) {
      toast.error("Please Enter all the details", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const res = await axios.post(
      "https://bulletinapi.onrender.com/api/register",
      {
        event: event._id,
        username: username,
        name,
        phone,
        roll,
        email,
        year,
        section,
        dept,
        otherDetails: extra,
      }
    );

    if (res.status == 200) {
      toast.success("Registration completed", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // location.reload();
      setRegistered(true);
      refreshRegistrations();
      handleClose();
    } else {
      toast.error(`${res.data.error}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
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
          <Typography className="text-sm  ">{eventDetails}</Typography>
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
            style={{
              color: "#3f51b5",
            }}
            onClick={() => {
              setToDefault();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              color: "#3f51b5",
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Register;
