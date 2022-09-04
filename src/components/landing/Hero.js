import { Button, Container, Grid, Hidden } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import React from "react";
import Link from "next/link";
// import DesignIllustration from "../../assets/design-illustration-2.svg";

const Hero = () => {
  return (
    <Container className="hero" style={{ width: "100%" }}>
      <Grid container>
        <Grid
          lg={6}
          md={6}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container className="">
            <h1 className="font-kanit capitalize font-bold	text-3xl leading-9	">
              Build your professional resume in just 2 steps with
              <span className="pl-4 text-4xl text-[#3f51b5]">Buildr.</span>
            </h1>

            <h4
              className="hero_sub font-Montserrat font-normal	capitalize tracking-wide text-[gray]"
              style={{ letterSpacing: 1 }}
            >
              Create professional resume that follow the exact ‘resume rules’
              employers look for. Easy to use and done within minutes - try now
              for free!
            </h4>

            <Link href="/resume">
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<BuildIcon />}
                className="hero_button"
                style={{
                  borderRadius: 30,
                  padding: "20px 40px",
                  marginTop: 40,
                }}
              >
                Login
              </Button>
            </Link>
          </Container>
        </Grid>
        <Hidden smDown>
          {/* <Grid lg={6} md={6}>
            <img
              src={DesignIllustration}
              alt="Design Illustration"
              style={{ height: 700, width: 700 }}
            />
          </Grid> */}
        </Hidden>
      </Grid>
    </Container>
  );
};

export default Hero;
