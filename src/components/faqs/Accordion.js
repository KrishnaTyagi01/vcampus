import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { QueryBuilder } from "@mui/icons-material";

export default function SimpleAccordion({ faq }) {
  //   const classes = useStyles();

  return (
    <div className="">
      <Accordion
        style={{ backgroundColor: "rgba(176,176,176, .1)" }}
        id="accordion"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="font-kanit font-bold text-xl">
            {faq?.ques}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography id="font-roboto">{faq?.ans}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
