import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Typography, TextField, Button } from "@mui/material";
import Image from "next/image";
import nouser from "../assets/nouser.jpg";
import ChooseCollegeForm from "./../components/profile/ChooseCollege";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllCommunities } from "./../helpers/index";
import axios from "axios";

const BASE = process.env.REACT_APP_BASE_URL;

function NewUserProfile({ communityList }) {
  console.log("communityList", communityList);

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
    if (
      name.length < 1 ||
      email.length < 1 ||
      roll.length < 1 ||
      college.length < 1
    ) {
      console.log("Fields can't be empty");
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
    } else {
      // display the error
    }

    console.log(res);
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
          <Autocomplete
            disablePortal
            options={
              communityList ? communityList : [{ label: "loading", id: 0 }]
            }
            getOptionLabel={(option) => option.communityName}
            onSelect={handleChange("college")}
            sx={{ width: "60%" }}
            renderInput={(params) => (
              <TextField {...params} label="search your college" />
            )}
            className="bg-white rounded-2xl outline-hidden mt-4"
          />
        </div>
        <div className="flex justify-end px-4">
          <span>
            <span className="text-gray-500 font-roboto text-sm capitalize pr-2	">
              Can't find your college? create a community for your college
            </span>
            <span className="font-kanit">
              <Link
                href="/newcommunity"
                className="text-primary font-kanit decoration-solid"
              >
                {/* <span className=""> */}
                CREATE
                {/* </span> */}
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
  );
}

export async function getServerSideProps(context) {
  const communityList = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/getAllCommunities`
  );

  // const communityList = getAllCommunities();

  return {
    props: {
      // communityList: JSON.parse(stringify(communityList.data)),
      communityList: communityList.data.communities,
    }, // will be passed to the page component as props
  };
}

// const top100Films = [
//   { label: "The Shawshank Redemption", year: 1994 },
//   { label: "The Godfather", year: 1972 },
//   { label: "The Godfather: Part II", year: 1974 },
//   { label: "The Dark Knight", year: 2008 },
//   { label: "12 Angry Men", year: 1957 },
//   { label: "Schindler's List", year: 1993 },
//   { label: "Pulp Fiction", year: 1994 },
//   {
//     label: "The Lord of the Rings: The Return of the King",
//     year: 2003,
//   },
// ];

export default NewUserProfile;
