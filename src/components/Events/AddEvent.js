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

export default function AddEvent({ eventOpen, handleClose }) {
  const [dateval, setDateval] = React.useState(undefined);

  const [values, setValues] = useState({
    eventName: "",
    lastRegistrationDate: dayjs("2022-08-18T21:11:54"),
  });

  const [checkedValues, setCheckedValues] = useState({
    namereq: false,
    phonereq: false,
    rollnoreq: false,
    emailreq: false,
    yearreq: false,
    sectionreq: false,
    deptreq: false,
  });

  const { eventName, lastRegistrationDate } = values;
  console.log("reg date: ", lastRegistrationDate);
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
  };

  // console.log("checkedValues", checkedValues);

  const handleDateChange = (newValue) => {
    setValues({ ...values, lastRegistrationDate: newValue });
    setDateval(newValue);
  };

  const handleTextChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckedValues = (name) => (event) => {
    setCheckedValues({ ...checkedValues, [name]: event.target.checked });
  };
  const [detailsName, setDetailName] = useState("");
  const [details, setDetails] = useState([]); //contains all the extraDetails needed from user

  console.log("details: ", details);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      console.log("Pressed: ", e.target.value);
      details.push(e.target.value);

      setDetailName("");
    }
  };

  const handleSubmit = async () => {
    if (eventName.length < 3) {
      console.log("The lenght of eventName must be greater than 3");
      return;
    }

    const res = await axios.post("http://localhost:8000/api/newevent", {
      eventName,
      lastRegistrationDate,
      checkedValues,
      otherDetails: details,
    });

    if (res.status == 200) {
      console.log("Event registered successfully");
      handleClose();
    } else {
      // show the error statement
      console.log("error: ", res.error);
    }

    console.log("on event save: ", res);
  };

  return (
    <div>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Last Registration Date"
              inputFormat="MM/DD/YYYY"
              value={dateval}
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
              console.log("skillName: ", detailsName);
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
