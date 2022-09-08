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

export default function ChooseCollegeForm({ open, handleClose }) {
  // const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To access your college community, select your college from the
            drop-down menu
          </DialogContentText>
          <Autocomplete
            disablePortal
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="search your college" />
            )}
            className="bg-white rounded-2xl outline-hidden mt-4"
          />
          <DialogContentText className="mt-8">
            Can't see your college in the list? Create the online community for
            your college by{" "}
            <Link href="/about">
              <a>clicking here</a>
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-primary  ">
            Cancel
          </Button>
          <Button onClick={handleClose} className="text-primary  ">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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
