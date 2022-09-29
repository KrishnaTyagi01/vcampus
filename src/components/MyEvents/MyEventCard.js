import React, { useState, useEffect } from "react";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ViewRegistrations from "./ViewRegistrations";
import dayjs from "dayjs";

export default function MyEventCard({ event, allRegistrations }) {
  const theme = useTheme();
  const [registration, setRegistration] = React.useState(false);
  const lastDate = dayjs(`${event.lastRegistrationDate}`).toString();
  const [registrationcount, setRegistrationCount] = useState(0);
  // console.log("event id ", event._id);
  const [entries, setEntries] = React.useState();
  // console.log("allRegistrations", allRegistrations);
  const getRegistrations = () => {
    for (let i = 0; i < allRegistrations.length; i++) {
      if (event._id == allRegistrations[i].event) {
        setRegistrationCount(registrationcount + 1);
        console.log("inside loop");
        setEntries(allRegistrations[i]);
      }
    }
  };

  React.useEffect(() => {
    getRegistrations();
  }, []);

  const handleRegOpen = () => {
    setRegistration(true);
  };

  const handleRegClose = () => {
    setRegistration(false);
  };

  return (
    <>
      <ViewRegistrations
        registration={registration}
        handleRegClose={handleRegClose}
        entries={entries}
        event={event}
      />
      <Card
        sx={{ display: "flex", justifyContent: "space-between" }}
        className="my-4 rounded-xl"
      >
        <div className="flex">
          <Avatar
            // green[500]
            sx={{ bgcolor: "#256D85", width: 156, height: 156 }}
            variant="square"
          >
            <BookOnlineOutlinedIcon sx={{ width: 156, height: 156 }} />
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {event.eventName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                className="text-base"
              >
                {lastDate}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                <HowToRegIcon />
              </IconButton>{" "}
              <span>{registrationcount}</span>
            </Box>
          </Box>
        </div>
        <div className="flex flex-col justify-between">
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            className="mt-4 mr-4 border-red-500 text-red-500 hover:bg-red-100/10 hover:border-red-500"
          >
            Delete
          </Button>
          <Button
            variant="contained"
            endIcon={<VisibilityIcon />}
            onClick={handleRegOpen}
            className="mb-4 mr-4 bg-primary hover:bg-primary"
          >
            View Participants
          </Button>
        </div>
      </Card>
    </>
  );
}
