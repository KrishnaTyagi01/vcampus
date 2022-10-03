import SupportIcon from "../../assets/interview.svg";
import SimpleAccordion from "./Accordion";
import Image from "next/image";
import { Container, Grid, Hidden } from "@mui/material";

const faqs = [
  {
    ques: "Is there a limit to number of events that we can post?",
    ans: "No, a user can post as many events as they like.",
  },
  {
    ques: "Can we delete a event?",
    ans: "Yes, A user can delete the event which was created by them.",
  },
  {
    ques: "Can we add custom field for the event registration form?",
    ans: "Yes, each event can have it's own custom field.",
  },
  {
    ques: "Where can we get the data of the registered users?",
    ans: "You can view all the registations on your events on the myEvents section.",
  },
];

function Faq() {
  return (
    <Container style={{ marginTop: "10rem" }}>
      <Grid container spacing={3}>
        <Hidden smDown>
          <Grid
            lg={6}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={SupportIcon} style={{ height: 380, width: 380 }} />
          </Grid>
        </Hidden>
        <Grid lg={6} md={6} sm={12} xs={12}>
          <h4 className="font.roboto text-2xl font-bold text-[#3f51b5]">
            FAQs
          </h4>
          <h1 className="faq_head font-kanit text-5xl text-[#00264d]">
            Do you have
            <span className=" text-[#3f51b5]"> Questions?</span>
          </h1>

          <span className="faq_para font-roboto text-[gray] text-xl">
            Here are some frequently asked questions.
          </span>

          <div>
            {faqs.map((faq, i) => (
              <div style={{ margin: "20px 0 " }}>
                <SimpleAccordion faq={faq} key={i} />
                {/* <SimpleAccordion /> */}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Faq;
