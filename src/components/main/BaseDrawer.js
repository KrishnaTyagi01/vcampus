import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import nouser from "../../assets/nouser.jpg";
import Image from "next/image";
import EventIcon from "@mui/icons-material/Event";
import ChatIcon from "@mui/icons-material/Chat";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BasicCard from "./../Events/Card";
import EventSection from "./../Events/index";
import ProfilePage from "./../profile/index";
import Button from "@mui/material/Button";
import MyEventCard from "../MyEvents/MyEventCard";
import EventsPage from "../MyEvents";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
const drawerWidth = 300;

export default function BaseDrawer({ email, allRegistrations }) {
  const [active, setActive] = useState("events");
  const [session, setSession] = useState({});

  async function loadSession() {
    const res = await getSession();
    setSession(res);
  }

  useEffect(() => {
    loadSession();
  }, []);
  console.log("Session: ", session);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        sd
        anchor="left"
      >
        <div className="flex flex-col justify-between  h-screen">
          {/* show user  */}
          <div>
            <div className="flex flex-col justify-items-center items-center mt-8">
              <Image
                src={session?.user?.image}
                height="130px"
                width="130px"
                layout="fixed"
                className="justify-self-center	justify-items-center"
                style={{ borderRadius: "50%" }}
              />

              <span className="font-roboto font-bold capitalize">
                {session?.user?.name}
              </span>
              <span className="font-Mono font-extralight text-sm	opacity-50	 capitalize text-[#DCDCDC	]">
                new delhi, India
              </span>
            </div>

            <Toolbar />
            <Divider />
            <List className="font-roboto">
              <ListItem
                disablePadding
                onClick={() => setActive("events")}
                style={{ marginBottom: ".5rem" }}
                className={
                  active === "events" ? "text-[#3f51b5] font-bold text-3xl" : ""
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <EventIcon
                      style={active === "events" ? { color: "#3f51b5" } : {}}
                    />
                  </ListItemIcon>
                  <span
                    className={
                      active === "events"
                        ? "font-roboto text-base capitalize "
                        : "text-base capitalize"
                    }
                  >
                    Events
                  </span>
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                onClick={() => setActive("cafe")}
                style={{ marginBottom: ".5rem" }}
                className={
                  active === "cafe" ? "text-[#3f51b5] font-bold text-3xl" : ""
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ChatIcon
                      style={active === "cafe" ? { color: "#3f51b5" } : {}}
                    />
                  </ListItemIcon>
                  <span
                    className={
                      active === "cafe"
                        ? "font-roboto text-base capitalize "
                        : "text-base capitalize"
                    }
                  >
                    Cafeteria Talks
                  </span>
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                onClick={() => setActive("profile")}
                style={{ marginBottom: ".5rem" }}
                className={
                  active === "profile"
                    ? "text-[#3f51b5] font-bold text-3xl"
                    : ""
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ManageAccountsIcon
                      style={active === "profile" ? { color: "#3f51b5" } : {}}
                    />
                  </ListItemIcon>
                  <span
                    className={
                      active === "profile"
                        ? "font-roboto text-base capitalize "
                        : "text-base capitalize"
                    }
                  >
                    Profile
                  </span>
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                onClick={() => setActive("myevents")}
                style={{ marginBottom: ".5rem" }}
                className={
                  active === "myevents"
                    ? "text-[#3f51b5] font-bold text-3xl"
                    : ""
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <NewspaperIcon
                      style={active === "myevents" ? { color: "#3f51b5" } : {}}
                    />
                  </ListItemIcon>
                  <span
                    className={
                      active === "myevents"
                        ? "font-roboto text-base capitalize "
                        : "text-base capitalize"
                    }
                  >
                    My Events
                  </span>
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={signOut}
          style={{
            backgroundColor: "#ff1744",
            outline: "none",
            border: "none",
          }}
          className="mb-8"
        >
          Logout
        </Button>
      </Drawer>
      {/* bg-cyan-50/25 */}
      <Box
        className="bg-gray-100/75	min-h-screen"
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        {/* bgcolor: "rgb(243 244 246)" */}
        {active == "events" && (
          <EventSection allRegistrations={allRegistrations} />
        )}
        {/* {active == 'cafe' && (
          <ProfilePage />

        )} */}
        {active == "profile" && <ProfilePage />}
        {active == "myevents" && (
          <MyEventCard allRegistrations={allRegistrations} />
        )}
        {/* <ProfilePage /> */}
        {/* <MyEventCard /> */}
        {/* <EventsPage /> */}
      </Box>
      <Box style={{ width: "25rem" }} component="main">
        <div>Hellow world</div>
      </Box>
    </Box>
  );
}
