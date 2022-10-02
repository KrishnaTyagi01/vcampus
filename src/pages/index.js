import Hero from "../components/landing/Hero";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import Faq from "../components/faqs";
import Github from "../components/Github";
import Steps from "./../components/landing/Steps";
import BaseDrawer from "./../components/main/BaseDrawer";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  //11:35
  return (
    <>
      {!session && (
        <>
          <Navbar />
          <Hero />
          <Steps />
          <Faq />
          <Github />
        </>
      )}

      {session && (
        <>
          <BaseDrawer />
        </>
      )}
    </>
  );
}
