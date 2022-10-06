import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../helpers";

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
