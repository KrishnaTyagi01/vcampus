import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import { Typography } from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction=" down" ref={ref} {...props} />;
});

export default function SigninDialog({ openSignin, handleSigninClose }) {
  return (
    <div>
      <Dialog
        open={openSignin}
        onClose={handleSigninClose}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth="sm"
      >
        <div className="flex flex-col items-center">
          <DialogTitle className="font-kanit text-[3rem]">
            Welcome to BulletIn
          </DialogTitle>
          <DialogContentText style={{ marginTop: "-1rem" }}>
            PLEASE LOGIN TO CONTINUE
          </DialogContentText>
        </div>
        <Divider variant="middle" className="mt-8" />

        <DialogContent className="flex flex-col items-center">
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            className="w-2/3 py-4 bg-[#db3236] hover:bg-[#db3236]"
            onClick={() => signIn("google")}
          >
            Google
          </Button>
          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            className="w-2/3 py-4 mt-4 bg-[#333] hover:bg-[#333]"
            onClick={() => signIn("github")}
          >
            Github
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSigninClose} className="text-primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
