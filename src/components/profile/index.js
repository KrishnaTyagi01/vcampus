import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Typography, TextField, Button } from "@mui/material";
import Image from "next/image";
import nouser from "../../assets/nouser.jpg";
import ChooseCollegeForm from "./ChooseCollege";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useSWR from "swr";
import { fetcher } from "../../helpers";

function ProfilePage() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();
  const userEmail = session.user.email;

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:8000/api/getuser/${userEmail}`
      );
      setUser(res.data[0]);
    })();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (label) => (e) => {
    setUser({ ...user, [label]: e.target.value });
  };

  const handleSubmit = async () => {
    if (user.name.length < 3) {
      toast.error("Name should contain more than 3 characters", {
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

    if (user.phone.length != 10) {
      toast.error("Phone should contain 10 characters", {
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

    const resp = await axios.post("http://localhost:8000/api/updateuser", {
      email: user.email,
      name: user.name,
      image: user.image,
      phone: user.phone,
      college: user.phone,
      roll: user.roll,
    });

    if (resp.status == 200) {
      toast.success("Data saved successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`${resp.error}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    console.log("saved data: ", resp);
  };

  console.log("user: ", user);
  return (
    <>
      <ToastContainer />
      {user && (
        <Container className="bg-white rounded-xl">
          <ChooseCollegeForm open={open} handleClose={handleClose} />
          <div className="flex justify-between items-center px-4">
            <div className="px-10 py-10 flex items-center">
              <Image
                src={session ? session.user.image : nouser}
                style={{
                  borderRadius: "50%",
                  // outline: "4px solid #000",
                }}
                height="150px"
                width="150px"
                layout="fixed"
              ></Image>
              <div className="ml-4">
                <Typography className="font-bold text-3xl font-roboto mb-2">
                  Profile
                </Typography>
                <span className="capitalize text-gray-500 ">
                  Check and Update your personal details
                </span>
              </div>
            </div>

            <div>
              <Button
                variant="outlined"
                size="small"
                // sx={{ borderColor: "#3f51b5" }}
                className="text-primary border-primary "
              >
                cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                className="ml-4 bg-primary"
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </div>
          </div>
          <div className="px-4 py-4 flex justify-between items-center">
            <Typography>Full Name</Typography>
            <TextField
              id="fullWidth"
              value={user?.name}
              onChange={handleChange("name")}
              style={{ width: "60%", borderRadius: "50%" }}
              variant="outlined"
            />
          </div>
          <div className="px-4 py-4 flex justify-between items-center">
            <Typography>Email</Typography>
            <TextField
              id="fullWidth"
              value={user?.email}
              disabled
              onChange={handleChange("email")}
              style={{ width: "60%" }}
              variant="outlined"
            />
          </div>
          <div className="px-4 py-4 flex justify-between items-center">
            <Typography>Phone Number</Typography>
            <TextField
              value={user?.phone}
              onChange={handleChange("phone")}
              id="fullWidth"
              style={{ width: "60%" }}
              variant="outlined"
            />
          </div>
          <div className="px-4 py-4 flex justify-between items-center">
            <Typography>community</Typography>
            <TextField
              id="fullWidth"
              style={{ width: "60%" }}
              onChange={handleChange("college")}
              value={user?.college}
              disabled
              variant="outlined"
            />
          </div>
          <div className="flex justify-end px-4">
            <span>
              <span className="text-gray-500 font-roboto text-sm capitalize pr-2	">
                Not your university?
              </span>
              <Button
                sx={{}}
                onClick={handleClickOpen}
                className="text-primary"
              >
                Change
              </Button>
            </span>
          </div>
          <div className="px-4 py-4 flex justify-between items-center">
            <Typography>Roll number</Typography>
            <TextField
              value={user?.roll}
              onChange={handleChange("roll")}
              id="fullWidth"
              style={{ width: "60%" }}
              variant="outlined"
            />
          </div>
        </Container>
      )}
    </>
  );
}

export default ProfilePage;
