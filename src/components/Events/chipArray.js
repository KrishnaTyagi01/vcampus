import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
// import Paper from "@material-ui/core/Paper";
// import TagFacesIcon from "@material-ui/icons/TagFaces";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     flexWrap: "wrap",
//     listStyle: "none",
//     margin: 0,
//     width: "55%",
//     minHeight: 50,
//     marginBottom: 40,
//   },
//   chip: {
//     margin: theme.spacing(0.5),
//   },
// }));

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
