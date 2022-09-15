import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import ViewRegistrations from "./ViewRegistrations";

export default function MyEventCard() {
  const theme = useTheme();
  const [registration, setRegistration] = React.useState(false);

  const handleRegOpen = () => {
    setRegistration(true);
  };

  const handleRegClose = () => {
    setRegistration(false);
  };

  return (
    <>
      <ViewRegistrations
        registration={registration}
        handleRegClose={handleRegClose}
      />
      <Card
        sx={{ display: "flex", justifyContent: "space-between" }}
        className="my-4 rounded-xl"
      >
        <div className="flex">
          <Avatar
            // green[500]
            sx={{ bgcolor: "#256D85", width: 156, height: 156 }}
            variant="square"
          >
            <BookOnlineOutlinedIcon sx={{ width: 156, height: 156 }} />
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Live From Space
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                className="text-base"
              >
                July 9, 2022
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                <HowToRegIcon />
              </IconButton>{" "}
              <span>20</span>
            </Box>
          </Box>
        </div>
        <div className="flex flex-col justify-between">
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            className="mt-4 mr-4 border-red-500 text-red-500 hover:bg-red-100/10 hover:border-red-500"
          >
            Delete
          </Button>
          <Button
            variant="contained"
            endIcon={<VisibilityIcon />}
            onClick={handleRegOpen}
            className="mb-4 mr-4 bg-primary hover:bg-primary"
          >
            View Participants
          </Button>
        </div>
      </Card>
    </>
  );
}
