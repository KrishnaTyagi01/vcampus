import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Register from "./Register";

export default function BasicCard({
  event,
  allRegistrations,
  refreshRegistrations,
}) {
  const { eventName } = event;
  const { data: session, status } = useSession();
  const lastDate = dayjs(`${event.lastRegistrationDate}`).toString();
  // console.log("Event id :", event._id);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    for (let i = 0; i < allRegistrations.length; i++) {
      if (
        allRegistrations[i].event == event._id &&
        allRegistrations[i].username == session.user.email
      ) {
        setRegistered(true);
      }
    }
  }, []);

  const [openRegister, setOpenRegister] = React.useState(false);

  const handleClickOpen = () => {
    setOpenRegister(true);
  };

  const handleClose = () => {
    setOpenRegister(false);
  };

  return (
    <>
      {event && (
        <>
          <Register
            event={event}
            openRegister={openRegister}
            handleClose={handleClose}
            setRegistered={setRegistered}
            refreshRegistrations={refreshRegistrations}
          />
          <Card sx={{ minWidth: 275, mb: "1.2rem" }}>
            <CardContent>
              {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
              <Typography
                variant="h5"
                component="div"
                className=" font-bold font-kanit"
              >
                {eventName}
              </Typography>
              <Typography
                sx={{ mb: 1, mt: 1.5 }}
                color="text.secondary"
                className="text-sm opacity-70 capitalize"
              >
                Last Registration dates
              </Typography>
              <Typography>
                <span className="flex items-center">
                  <CalendarTodayIcon className="text-primary w-4z" />
                  <span className="text-sm font-bold ml-2 opacity-90 capitalize font-roboto">
                    {lastDate}
                  </span>
                </span>
              </Typography>
              <Typography
                sx={{ mb: 1, mt: 1.5 }}
                color="text.secondary"
                className="text-sm opacity-70 capitalize"
              >
                Details
              </Typography>
              <Typography className="text-sm  ">
                {event.eventDetails}
              </Typography>
            </CardContent>
            <CardActions className="flex justify-end mb-3">
              <div className="mr-12">
                {/* <Button
                  variant="outlined"
                  size="medium"
                  className=" border-primary"
                >
                  <span className="text-primary">Learn More</span>
                </Button> */}
                {!registered && (
                  <Button
                    variant="outlined"
                    className="ml-4 border-primary"
                    size="medium"
                  >
                    <span className="text-primary" onClick={handleClickOpen}>
                      Register
                    </span>
                  </Button>
                )}
                {registered && (
                  <span className="py-4 px-4 bg-primary flex justify-center items-center text-white uppercase text-sm rounded-md">
                    <TaskAltIcon className="mr-2" />
                    Registered
                  </span>
                )}
              </div>
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
}
