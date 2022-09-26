import Head from "next/head";
import Image from "next/image";
import Hero from "../components/landing/Hero";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

import Steps from "./../components/landing/Steps";
import Faq from "../components/faqs";
import Github from "../components/Github";
import axios from "axios";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import BaseDrawer from "./../components/main/BaseDrawer";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ allRegistrations }) {
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
          <BaseDrawer
            allRegistrations={allRegistrations}
            email={session.user.email}
            session={session}
          />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get("http://localhost:8000/api/getallregistrations");

  return {
    props: {
      allRegistrations: res.data,
    }, // will be passed to the page component as props
  };
}
