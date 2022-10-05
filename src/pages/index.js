import Hero from "../components/landing/Hero";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import Faq from "../components/faqs";
import Github from "../components/Github";
import Steps from "./../components/landing/Steps";
import BaseDrawer from "./../components/main/BaseDrawer";
import Footer from "../components/Footer";
import { StyledEngineProvider } from "@mui/material/styles";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const override = {
    display: "block",
    margin: "auto auto",
    borderColor: "#3f51b5",
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        {!session && (
          <>
            <Navbar />
            <Hero />
            <Steps />
            <Faq />
            <Github />
            <Footer />
          </>
        )}
        {loading && (
          <div className=" h-screen w-full flex items-center justify-center">
            <PacmanLoader
              color="#3f51b5"
              loading={loading}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
            />
          </div>
        )}
        {session && (
          <>
            <BaseDrawer session={session} />
          </>
        )}
      </StyledEngineProvider>
    </>
  );
}
