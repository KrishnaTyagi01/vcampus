import { Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { StyledEngineProvider } from "@mui/material/styles";
import axios from "axios";
import { useSession, getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nouser from "../assets/nouser.jpg";
const BASE = process.env.REACT_APP_BASE_URL;

function NewUserProfile({ communityList }) {
  console.log("communityList", communityList);
  const router = useRouter();
  const commList = communityList;
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    image: nouser,
    phone: "",
    college: "",
    roll: "",
  });

  console.log("values: ", values);
  const { name, email, image, phone, college, roll } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSave = async () => {
    if (name.length < 3) {
      toast.error("Name should contain atleast 3 characters", {
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

    if (phone.length != 10) {
      toast.error("phone no must contain 10 digits ", {
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

    if (college == "") {
      toast.error("Select a community", {
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
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      toast.error("Please Enter a valid email", {
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
      `https://bulltetin.herokuapp.com/api/updateuser`,
      {
        name,
        email,
        image,
        phone,
        college,
        roll,
      }
    );

    if (res.status == 200) {
      //redirect to dashboard
      toast.success("Data saved successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/");
    } else {
      // display the error
      toast.error("something went wrong", {
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

  const { data: session, status } = useSession();

  useEffect(() => {
    setValues({
      ...values,
      name: session?.user.name,
      email: session?.user.email,
      image: session?.user.image,
    });
  }, [status]);

  return (
    <StyledEngineProvider injectFirst>
      <>
        <ToastContainer />

        <div className="bg-gray-100/75	min-h-screen flex flex-col items-center justify-center">
          <Container className="bg-white rounded-xl flex flex-col justify-center items-center mb-8">
            <h1 className="font-kanit text-5xl">Welcome to vcampus</h1>
            <h5
              style={{ marginTop: "-1rem" }}
              className="font-roboto font-light tracking-wider text-base"
            >
              Before moving forward, please fill your personal details
            </h5>
          </Container>

          <Container className="bg-white rounded-xl">
            {/* <ChooseCollegeForm open={open} handleClose={handleClose} /> */}
            <div className="flex justify-between items-center px-4">
              <div className="px-10 py-10 flex items-center">
                <Image
                  src={image}
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
                  <span className="capitalize text-gray-500 font-roboto">
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
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="px-4 py-4 flex justify-between items-center">
              <Typography>Full Name</Typography>
              <TextField
                id="fullWidth"
                onChange={handleChange("name")}
                value={name}
                style={{ width: "60%", borderRadius: "50%" }}
                variant="outlined"
              />
            </div>
            <div className="px-4 py-4 flex justify-between items-center">
              <Typography>Email</Typography>
              <TextField
                disabled
                id="fullWidth"
                value={email}
                style={{ width: "60%" }}
                variant="outlined"
              />
            </div>
            <div className="px-4 py-4 flex justify-between items-center">
              <Typography>Phone Number</Typography>
              <TextField
                onChange={handleChange("phone")}
                id="fullWidth"
                value={phone}
                style={{ width: "60%" }}
                variant="outlined"
              />
            </div>
            <div className="px-4 py-4 flex justify-between items-center">
              <Typography>Community</Typography>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={college}
                sx={{ minWidth: "60%" }}
                onChange={handleChange("college")}
              >
                {communityList?.map((comm, key) => (
                  <MenuItem value={comm.communityName}>
                    <em>{comm.communityName}</em>
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex justify-end px-4">
              <span>
                <span className="text-gray-500 font-roboto text-sm capitalize pr-2	">
                  Can't find your community? create a new community
                </span>
                <span className="font-kanit">
                  <Link
                    href={{
                      pathname: "/newcommunity",
                      query: { from: router.pathname },
                    }}
                    className="text-primary font-kanit decoration-solid"
                  >
                    CREATE
                  </Link>
                </span>
              </span>
            </div>
            <div className="px-4 py-4 flex justify-between items-center">
              <Typography>Roll number</Typography>
              <TextField
                id="fullWidth"
                onChange={handleChange("roll")}
                value={roll}
                style={{ width: "60%" }}
                variant="outlined"
              />
            </div>
          </Container>
        </div>
      </>
    </StyledEngineProvider>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const communityList = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/getAllCommunities`
  );

  return {
    props: {
      communityList: communityList.data.communities,
    }, // will be passed to the page component as props
  };
}

export default NewUserProfile;
