import React from "react";
import { Container } from "@mui/material";
import { Typography, TextField, Button } from "@mui/material";
import Image from "next/image";
import nouser from "../../assets/nouser.jpg";
import ChooseCollegeForm from "./ChooseCollege";
function ProfilePage() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container className="bg-white rounded-xl">
      <ChooseCollegeForm open={open} handleClose={handleClose} />
      <div className="flex justify-between items-center px-4">
        <div className="px-10 py-10 flex items-center">
          <Image
            src={nouser}
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
          <Button variant="contained" size="small" className="ml-4 bg-primary">
            Save
          </Button>
        </div>
      </div>
      <div className="px-4 py-4 flex justify-between items-center">
        <Typography>Full Name</Typography>
        <TextField
          id="fullWidth"
          style={{ width: "60%", borderRadius: "50%" }}
          variant="outlined"
        />
      </div>
      <div className="px-4 py-4 flex justify-between items-center">
        <Typography>Email</Typography>
        <TextField id="fullWidth" style={{ width: "60%" }} variant="outlined" />
      </div>
      <div className="px-4 py-4 flex justify-between items-center">
        <Typography>Phone Number</Typography>
        <TextField id="fullWidth" style={{ width: "60%" }} variant="outlined" />
      </div>
      <div className="px-4 py-4 flex justify-between items-center">
        <Typography>college</Typography>
        <TextField
          id="fullWidth"
          style={{ width: "60%" }}
          value="IPEC"
          disabled
          variant="outlined"
        />
      </div>
      <div className="flex justify-end px-4">
        <span>
          <span className="text-gray-500 font-roboto text-sm capitalize pr-2	">
            Not your university?
          </span>
          <Button sx={{}} onClick={handleClickOpen} className="text-primary">
            Change
          </Button>
        </span>
      </div>
      <div className="px-4 py-4 flex justify-between items-center">
        <Typography>Roll number</Typography>
        <TextField id="fullWidth" style={{ width: "60%" }} variant="outlined" />
      </div>
    </Container>
  );
}

export default ProfilePage;
