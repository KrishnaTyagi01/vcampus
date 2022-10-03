import { Button, Container, Grid, Hidden } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import DesignIllustration from "../../assets/heroimg.svg";

const Hero = () => {
  return (
    <Container className="hero" style={{ width: "100%", marginBottom: "3rem" }}>
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
              Create and Post Events for your community Easily on
              <span className="pl-4 text-4xl text-[#3f51b5]">bulletIn</span>
            </h1>

            <h4
              className="hero_sub font-Montserrat font-normal	capitalize tracking-wide text-[gray]"
              style={{ letterSpacing: 1 }}
            >
              Create your community, post events and let members register for
              your events all on one platform
            </h4>

            {/* <Link href="/resume">
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
            </Link> */}
          </Container>
        </Grid>
        <Hidden smDown>
          <Grid lg={6} md={6}>
            <Image
              src={DesignIllustration}
              alt="Design Illustration"
              style={{ height: 700, width: 700 }}
            />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

export default Hero;
