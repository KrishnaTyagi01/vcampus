import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BasicCard from "./Card";
import AddEvent from "./AddEvent";
function EventSection() {
  const [eventOpen, setEventOpen] = React.useState(false);

  const handleClickOpen = () => {
    setEventOpen(true);
  };

  const handleClose = () => {
    setEventOpen(false);
  };
  return (
    <>
      <AddEvent eventOpen={eventOpen} handleClose={handleClose} />
      <div className="flex justify-between">
        <Autocomplete
          disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search Events" />
          )}
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
        <BasicCard />
        <BasicCard />
        <BasicCard />
        <BasicCard />
      </div>
    </>
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

export default EventSection;
