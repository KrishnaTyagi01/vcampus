import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ViewRegistrations({
  registration,
  handleRegClose,
  entries,
  event,
}) {
  console.log("entries from inside: ", entries);
  const {
    deptreq,
    emailreq,
    eventName,
    namereq,
    otherDetails,
    phonereq,
    rollnoreq,
    sectionreq,
    yearreq,
  } = event;

  console.log("otherDetails", otherDetails);

  return (
    <div>
      <Dialog
        open={registration}
        onClose={handleRegClose}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle>{eventName}</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">
            These are the participants who registered for the given event.
          </DialogContentText>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {namereq && <TableCell>Name</TableCell>}
                  {emailreq && <TableCell align="center">Email</TableCell>}
                  {deptreq && <TableCell align="center">Department</TableCell>}
                  {sectionreq && <TableCell align="center">Section</TableCell>}
                  {phonereq && <TableCell align="center">Phone no.</TableCell>}
                  {rollnoreq && <TableCell align="center">Roll no.</TableCell>}
                  {yearreq && <TableCell align="center">Year</TableCell>}
                  {otherDetails &&
                    otherDetails.map((val, key) => (
                      <TableCell align="center">{val}</TableCell>
                    ))}
                  {/* <TableCell align="right">Confirm </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map((entry, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {namereq && (
                      <TableCell align="center">{entry.name}</TableCell>
                    )}
                    {emailreq && (
                      <TableCell align="center">{entry.email}</TableCell>
                    )}
                    {deptreq && (
                      <TableCell align="center">{entry.dept}</TableCell>
                    )}
                    {sectionreq && (
                      <TableCell align="center">{entry.section}</TableCell>
                    )}
                    {phonereq && (
                      <TableCell align="center">{entry.phone}</TableCell>
                    )}
                    {rollnoreq && (
                      <TableCell align="center">{entry.roll}</TableCell>
                    )}
                    {yearreq && (
                      <TableCell align="center">{entry.year}</TableCell>
                    )}
                    {otherDetails &&
                      otherDetails.map((detail, key) => (
                        <TableCell align="center">
                          {entry.otherDetails[0][`${detail}`]}
                        </TableCell>
                      ))}
                    {/* <TableCell align="right">
                      <Button className=" text-primary border-primary hover:bg-primary/10">
                        Accept
                      </Button>
                      <Button className="border-red-500 text-red-500 hover:bg-red-100/10 hover:border-red-500">
                        Reject
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRegClose}
            className="bg-primary"
            variant="contained"
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
