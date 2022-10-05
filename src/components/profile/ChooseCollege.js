import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
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
import { useRouter } from "next/router";

export default function ChooseCollegeForm({
  open,
  handleClose,
  user,
  setUser,
  handleChange,
}) {
  // const [open, setOpen] = React.useState(false);
  const router = useRouter();
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
            To access your community, select your community from the drop-down
            menu
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

          <DialogContentText className="mt-8">
            Can't see your community in the list? Create a new online community
            by
            <Link
              href={{
                pathname: "/newcommunity",
                query: { from: router.pathname },
              }}
            >
              <a> clicking here</a>
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
