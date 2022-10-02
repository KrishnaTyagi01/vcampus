import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup, Typography } from "@mui/material";
import ChipsArray from "./chipArray";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function AddEvent({
  eventOpen,
  handleClose,
  mutate,
  userdata,
  userMutate,
}) {
  const userCollege = userdata[0].college;
  console.log("user data form add: ", userCollege);

  const [values, setValues] = useState({
    eventName: "",
    lastRegistrationDate: null,
    eventDetails: "",
  });

  const { data: session, status } = useSession();

  const [detailsName, setDetailName] = useState("");
  const [details, setDetails] = useState([]); //contains all the extraDetails needed from user

  const [checkedValues, setCheckedValues] = useState({
    namereq: false,
    phonereq: false,
    rollnoreq: false,
    emailreq: false,
    yearreq: false,
    sectionreq: false,
    deptreq: false,
  });

  const { eventName, lastRegistrationDate, eventDetails } = values;

  const {
    namereq,
    phonereq,
    rollnoreq,
    emailreq,
    yearreq,
    sectionreq,
    deptreq,
  } = checkedValues;

  const setToDefault = () => {
    setCheckedValues({
      namereq: false,
      phonereq: false,
      rollnoreq: false,
      emailreq: false,
      yearreq: false,
      sectionreq: false,
      deptreq: false,
    });

    setValues({
      eventName: "",
      lastRegistrationDate: null,
      eventDetails: "",
    });

    setDetails([]);
    setDetailName("");
  };

  // console.log("checkedValues", checkedValues);

  const handleDateChange = (newValue) => {
    setValues({ ...values, lastRegistrationDate: newValue });
  };

  const handleTextChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckedValues = (name) => (event) => {
    setCheckedValues({ ...checkedValues, [name]: event.target.checked });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      console.log("Pressed: ", e.target.value);
      details.push(e.target.value);

      setDetailName("");
    }
  };

  const handleSubmit = async () => {
    if (eventName === null || eventName.length < 3) {
      toast.error("Event Name should contain more than 3 characters", {
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

    if (lastRegistrationDate === null) {
      toast.error("Choose a last registration date", {
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

    const res = await axios.post("http://localhost:8000/api/newevent", {
      eventName,
      lastRegistrationDate,
      eventDetails,
      checkedValues,
      otherDetails: details,
      createdBy: session.user.email,
      college: userCollege,
    });

    if (res.status == 200) {
      toast.success("Event Added successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      mutate();
      handleClose();
    } else {
      // show the error statement
      toast.error(`${res.error}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("error: ", res.error);
    }
  };

  return (
    <div>
      {/* Same as */}
      <ToastContainer />
      <Dialog open={eventOpen} onClose={handleClose}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the following form to create new event.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Event Name"
            type="text"
            fullWidth
            value={eventName}
            variant="standard"
            onChange={handleTextChange("eventName")}
            style={{ marginBottom: "2rem" }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Event Details"
            value={eventDetails}
            onChange={handleTextChange("eventDetails")}
            fullWidth
            multiline
            style={{ marginBottom: "2rem" }}
            rows={3}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Last Registration Date"
              inputFormat="MM/DD/YYYY"
              value={lastRegistrationDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <DialogContentText className="mt-4">
            Select the infomation required to register for the event
          </DialogContentText>
          <FormGroup style={{}}>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={namereq}
                    onChange={handleCheckedValues("namereq")}
                  />
                }
                label="Name"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={phonereq}
                    onChange={handleCheckedValues("phonereq")}
                  />
                }
                label="phone no."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rollnoreq}
                    onChange={handleCheckedValues("rollnoreq")}
                  />
                }
                label="roll no."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailreq}
                    onChange={handleCheckedValues("emailreq")}
                  />
                }
                label="email"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={yearreq}
                    onChange={handleCheckedValues("yearreq")}
                  />
                }
                label="Year"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sectionreq}
                    onChange={handleCheckedValues("sectionreq")}
                  />
                }
                label="Section"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={deptreq}
                    onChange={handleCheckedValues("deptreq")}
                  />
                }
                label="Department"
              />
            </div>
          </FormGroup>
          <DialogContentText className="mt-4 mb-2">
            Need some more details? Type it below and press enter
          </DialogContentText>
          <TextField
            // onChange={(e) => handleEnter(e)}
            value={detailsName}
            onChange={(e) => {
              setDetailName(e.target.value);
            }}
            onKeyDown={handleEnter}
            id="skill"
            label="Extra details"
            placeholder=""
            variant="outlined"
            className="mb-4"
          />
          <ChipsArray details={details} setDetails={setDetails} />
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
          <Button onClick={() => handleSubmit()}>submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
