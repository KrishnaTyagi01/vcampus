import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Typography, TextField, Button } from "@mui/material";
import Image from "next/image";
import nouser from "../assets/nouser.jpg";

import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Paper from "@mui/material/Paper";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import clubImg from "../assets/clubs.svg";
import collegeImg from "../assets/college.svg";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast, ToastContainer } from "react-toastify";
import useSWR from "swr";
import { fetcher } from "../helpers";
import "react-toastify/dist/ReactToastify.css";
const steps = ["Purpose", "community name", "Description"];

function NewCommunity() {
  const { data: session, status } = useSession();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [purpose, setPurpose] = useState("");
  const [comName, setComName] = useState("");
  const [description, setDescription] = useState("");

  // console.log("purpose", purpose);
  // console.log("comName", comName);
  // console.log("description", description);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;

    if (activeStep == 0) {
      if (purpose == "") {
        // throw error, must select one value
        toast.error("You have to select one option", {
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
    }

    if (activeStep == 1) {
      // check if name is unique, else throw error
      const resp = await axios.get(
        `https://bulltetin.herokuapp.com/api/isunique/${comName}`
      );

      if (resp.data.isValid == false) {
        toast.error("A community with this name already exists", {
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

      console.log("is valid", resp);
    }

    if (activeStep == 2) {
      // save community to database
      const createresp = await axios.post(
        "https://bulltetin.herokuapp.com/api/createcommunity",
        {
          communityName: comName,
          purpose,
          description,
        }
      );

      if (!createresp.data.comcreated) {
        toast.error(`${createresp.data.error}`, {
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

      console.log("create com: ", createresp);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-100/75	min-h-screen flex flex-col items-center ">
        <Container className="bg-white rounded-xl flex flex-col justify-center items-center mb-8">
          <h1 className="font-kanit text-5xl">Welcome to BulletIn</h1>
          <h5
            style={{ marginTop: "-1rem" }}
            className="font-roboto font-light tracking-wider text-base"
          >
            Create a new community
          </h5>
        </Container>

        <Container className="bg-white rounded-xl">
          <Box sx={{ width: "100%" }} className="mt-8">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <div className="flex items-center justify-center mt-12">
                  <CheckCircleOutlineIcon
                    style={{ color: "green", width: "4rem", height: "4rem" }}
                  />
                  <h1 className="font-roboto">
                    You have successfully created your community
                  </h1>
                </div>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Link href="/">
                    <Button>Go to Dashboard</Button>
                  </Link>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Container>
                  {activeStep == 0 && (
                    <>
                      <div>
                        <h1 className="font-roboto">
                          What's the purpose of the community?
                        </h1>
                        <div className="flex w-full justify-between items-center">
                          <Accordion
                            style={{
                              backgroundColor: "rgba(176,176,176, .1)",
                              width: "50%",
                            }}
                            className="mt-8"
                            id="accordion"
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <div className="flex items-center">
                                <Image
                                  src={clubImg}
                                  height="50px"
                                  width="50px"
                                />
                                <Typography className="font-kanit font-bold text-xl ml-6">
                                  For college clubs and society
                                </Typography>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography id="font-roboto">
                                For clubs{" "}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Checkbox
                            color="success"
                            onChange={() => {
                              if (purpose == "clubs") setPurpose("");
                              else setPurpose("clubs");
                            }}
                            checked={purpose == "clubs"}
                          />
                        </div>
                        <div className="flex w-full justify-between items-center">
                          <Accordion
                            style={{
                              backgroundColor: "rgba(176,176,176, .1)",
                              width: "50%",
                            }}
                            id="accordion"
                            className="mt-8"
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <div className="flex items-center">
                                <Image
                                  src={collegeImg}
                                  height="50px"
                                  width="50px"
                                />
                                <Typography className="font-kanit font-bold text-xl ml-6">
                                  Official college community
                                </Typography>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography id="font-roboto">
                                Official{" "}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          <Checkbox
                            color="success"
                            onChange={() => {
                              if (purpose == "official") setPurpose("");
                              else setPurpose("official");
                            }}
                            checked={purpose == "official"}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {activeStep == 1 && (
                    <>
                      <h1 className="font-roboto">
                        Give a name to your community
                      </h1>
                      <div className="px-4 py-4 flex justify-between items-center">
                        <Typography>Community Name</Typography>
                        <TextField
                          id="fullWidth"
                          placeholder="Give a unique name to your community"
                          onChange={(e) => setComName(e.target.value)}
                          value={comName}
                          style={{ width: "60%", borderRadius: "50%" }}
                          variant="outlined"
                        />
                      </div>
                    </>
                  )}

                  {activeStep == 2 && (
                    <>
                      <h1 className="font-roboto">
                        Give a small description of your community
                      </h1>
                      <TextField
                        id="outlined-multiline-static"
                        label="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        multiline
                        rows={4}
                        className="w-full mt-6"
                        defaultValue="Write something about your community"
                      />
                    </>
                  )}
                </Container>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {/* {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )} */}

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Container>
      </div>
    </>
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

export default NewCommunity;
