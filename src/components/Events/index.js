import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BasicCard from "./Card";
import AddEvent from "./AddEvent";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "../../helpers";
import { useSession } from "next-auth/react";

function EventSection({ events, allRegistrations, refreshRegistrations, userdata, userMutate }) {
  const [eventOpen, setEventOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const { data, error, mutate } = useSWR(
    "http://localhost:8000/api/getevents",
    fetcher,
    {
      revalidateIfStale: true,
    }
  );

  // const {
  //   data: userdata,
  //   error: userError,
  //   mutate: userMutate,
  // } = useSWR(
  //   `http://localhost:8000/api/getuser/${session.user.email}`,
  //   fetcher,
  //   {
  //     revalidateIfStale: true,
  //   }
  // );

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const comdata = data?.filter((event) => {
      return event.college == userdata[0]?.college;
    });

    setFilteredData(comdata);
  }, [data, userdata]);

  const handleFilterChange = (e) => {
    let input = e.target.value.toLowerCase();

    const filtered = data.filter((event) => {
      return event.eventName.toLowerCase().includes(input);
    });

    setFilteredData(filtered);
  };

  const handleClickOpen = () => {
    setEventOpen(true);
  };

  const handleClose = () => {
    setEventOpen(false);
  };

  return (
    <>
      {data && userdata && (
        <>
          <AddEvent
            mutate={mutate}
            eventOpen={eventOpen}
            handleClose={handleClose}
            userdata={userdata}
            userMutate={userMutate}
          />
          <div className="flex justify-between">
            <TextField
              id="outlined-basic"
              label="Search Events"
              variant="outlined"
              sx={{ width: "40%" }}
              onChange={(e) => handleFilterChange(e)}
              className="bg-white rounded-2xl outline-hidden"
            />

            <Button
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
              className="py-2 px-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-[#fff] outline-none border-none rounded-2xl capitalize"
            >
              Add New Event
            </Button>
          </div>

          <div className="mt-10 ">
            {filteredData?.map((event, key) => (
              <BasicCard
                key={key}
                event={event}
                allRegistrations={allRegistrations}
                refreshRegistrations={refreshRegistrations}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default EventSection;
