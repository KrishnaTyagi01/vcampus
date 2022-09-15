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

export default function AddEvent({ eventOpen, handleClose }) {
  const [dateval, setDateval] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleDateChange = (newValue) => {
    setDateval(newValue);
  };
  const [detailsName, setDetailName] = useState("");
  const [details, setDetails] = useState([]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      console.log("Pressed: ", e.target.value);
      details.push(e.target.value);

      setDetailName("");
    }
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
            variant="standard"
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
                control={<Checkbox defaultChecked />}
                label="Name"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="phone no."
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="roll no."
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="email"
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Year"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Section"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
