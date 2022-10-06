import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import React from "react";

const ChipsArray = (props) => {
  const { details, setDetails } = props;

  const handleDelete = (chipToDelete) => () => {
    setDetails((chips) =>
      details.filter(
        (chip) => details.indexOf(chip) !== details.indexOf(chipToDelete)
      )
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",

        width: "100%",
      }}
      component="ul"
    >
      {details.map((data, k) => {
        return (
          <li key={k} className="pr-4 pb-2 pt-2">
            <Chip label={data} onDelete={handleDelete(data)} />
          </li>
        );
      })}
    </Paper>
  );
};

export default ChipsArray;
