import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SigninDialog from "./Signin";

export default function ButtonAppBar() {
  const [openSignin, setOpenSignin] = React.useState(false);

  const handleSigninOpen = () => {
    setOpenSignin(true);
  };

  const handleSigninClose = () => {
    setOpenSignin(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SigninDialog
        openSignin={openSignin}
        handleSigninClose={handleSigninClose}
      />
      <AppBar position="static" style={{ background: "#3f51b5" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BulletIn
          </Typography>
          {/* <Link href="/api/auth/signin"> */}
          <Button color="inherit" onClick={handleSigninOpen}>
            Login
          </Button>
          {/* <Button color="inherit" onClick={() => signIn()}>
            Login
          </Button> */}
          {/* </Link> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
