import SupportIcon from "../../assets/interview.svg";
import SimpleAccordion from "./Accordion";
import Image from "next/image";
import { Container, Grid, Hidden } from "@mui/material";

const faqs = [
  {
    ques: "Is Buildr really free?",
    ans: "Yes, it's completely free for everyone.",
  },
  {
    ques: "How many resumes can we create?",
    ans: "There is no limit on number of resumes. You can create any number of resumes one at a time.",
  },
  {
    ques: "What will be the format of downloaded resume?",
    ans: "Resume will be downloaded in pdf format",
  },
  {
    ques: "What is the size of the PDF?",
    ans: "The size of the PDF is A4 which is the standard size for all Resume. It is usually less than 100kb.",
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
            Here are some frequently asked questions. If you have any other
            questions, feel free to reach out via the contact form below.
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
