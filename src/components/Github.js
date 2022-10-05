import { Container, Grid, Button } from "@mui/material";
import Link from "next/link";

import GitHubIcon from "@mui/icons-material/GitHub";

const styles = {
  github: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "3rem",
    borderRadius: "5px",
    marginTop: "10rem",
  },
  github_sub: {
    marginTop: "-0.5rem",
  },
};

function Github() {
  return (
    <Container className="github" style={styles.github}>
      <Grid container spacing={3}>
        <Grid
          lg={8}
          md={8}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <h1 className="github_head font-kanit">
              Checkout the Github Repository
            </h1>
            <h4
              className="github_sub font-Montserrat"
              style={styles.github_sub}
            >
              The project is Open Source. Feel free to have a look around the
              repository.
            </h4>
          </div>
        </Grid>

        <Grid lg={4} md={4} sm={12} xs={12}>
          <a
            href="https://github.com/KrishnaTyagi01/vcampus"
            target="_blank"
            className="no-underline	"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<GitHubIcon />}
              className="github_button"
              style={{
                marginTop: 40,
                width: "80%",
                marginLeft: 15,
              }}
            >
              Github
            </Button>
          </a>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Github;
