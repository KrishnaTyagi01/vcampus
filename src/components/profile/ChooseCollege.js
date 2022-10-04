import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../../helpers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ChooseCollegeForm({
  open,
  handleClose,
  user,
  setUser,
  handleChange,
}) {
  // const [open, setOpen] = React.useState(false);

  const { data, error, mutate } = useSWR(
    "https://bulltetin.herokuapp.com/api/getAllCommunities",
    fetcher,
    {
      revalidateIfStale: true,
    }
  );
  const [communityList, setCommunityList] = useState(null);

  useEffect(() => {
    setCommunityList(data?.communities);
  }, [data]);

  // console.log("communityList ", communityList);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select your community</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To access your college community, select your college from the
            drop-down menu
          </DialogContentText>
          <InputLabel
            className="mt-4 pl-2"
            id="demo-simple-select-helper-label"
          >
            Select your community
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={user.college}
            sx={{ m: 1, minWidth: "50%" }}
            onChange={handleChange("college")}
          >
            {communityList?.map((comm, key) => (
              <MenuItem value={comm.communityName}>
                <em>{comm.communityName}</em>
              </MenuItem>
            ))}
          </Select>
          {/* <Autocomplete
            disablePortal
            options={
              communityList ? communityList : [{ label: "loading", id: 0 }]
            }
            getOptionLabel={(option) => option.communityName}
            onSelect={handleChange("college")}
            // sx={{ width: "60%" }}
            renderInput={(params) => (
              <TextField {...params} label="search your college" />
            )}
            className="bg-white rounded-2xl outline-hidden mt-4"
          /> */}
          <DialogContentText className="mt-8">
            Can't see your college in the list? Create the online community for
            your college by{" "}
            <Link href="/newcommunity">
              <a>clicking here</a>
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
