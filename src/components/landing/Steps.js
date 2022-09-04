import React from "react";
import { Container, Paper } from "@mui/material";
import { Grid } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GetAppIcon from "@mui/icons-material/GetApp";
function Steps() {
  return (
    <Container
      className="flex flex-col	items-center"
      id="middle"
      //   style={{ display: "flex", flexDirection: "center", alignItems: "center" }}
    >
      <h5 className="uppercase font-roboto text-2xl text-[#3f51b5] font-extrabold">
        How it Works
      </h5>
      <h1
        className="font-kanit capitalize text-5xl font-bold"
        style={{ marginTop: "-1rem" }}
      >
        Creating Resume have never{" "}
        <span className="text-[#3f51b5]">been easier</span>
      </h1>

      <Grid container spacing={3} style={{ marginTop: 25 }}>
        <Grid
          lg={4}
          md={4}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            className="flex flex-col items-center min-h-full h-80"
            id="github_button"
          >
            <ListAltIcon
              style={{
                height: 80,
                width: 80,
                color: "#00264d",
                paddingTop: 20,
              }}
            />
            <h1 className="text-[#00264d] font-kanit ">STEP 1</h1>

            <span className="font-Montserrat text-[gray] w-4/6 tracking-wider">
              Easily add all the necessary information in the forms given in the
              the sidebar. You get the options to Add, Update, shuffle order and
              delete all the sections.
            </span>
          </Paper>
        </Grid>
        <Grid
          lg={4}
          md={4}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paper elevation={3} className="flex flex-col items-center">
            <GetAppIcon
              style={{
                height: 80,
                width: 80,
                color: "#00264d",
                paddingTop: 20,
              }}
            />
            <h1 className="text-[#00264d] font-kanit ">STEP 2</h1>

            <span className="font-Montserrat text-[gray] w-4/6">
              After filling all the Information, just click on the print button
              to download your resume in PDF format.
            </span>
          </Paper>
        </Grid>
        <Grid
          lg={4}
          md={4}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paper elevation={3} className="flex flex-col items-center">
            <GetAppIcon
              style={{
                height: 80,
                width: 80,
                color: "#00264d",
                paddingTop: 20,
              }}
            />
            <h1 className="text-[#00264d] font-kanit ">STEP 2</h1>

            <span className="font-Montserrat text-[gray] w-4/6">
              After filling all the Information, just click on the print button
              to download your resume in PDF format.
            </span>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Steps;
