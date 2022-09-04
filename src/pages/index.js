import Head from "next/head";
import Image from "next/image";
import Hero from "../components/landing/Hero";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { Amplify } from "aws-amplify";
// import awsconfig from "./aws-exports";
import { DataStore } from "@aws-amplify/datastore";
import { Post } from "../models";
import Steps from "./../components/landing/Steps";
import Faq from "../components/faqs";
import Github from "../components/Github";

// Amplify.configure(awsconfig);
export default function Home() {
  const test = async () => {
    const models = await DataStore.query(Post);
    console.log(models);
  };
  return (
    <>
      <Navbar />
      <Hero />
      <Steps />
      <Faq />
      <Github />
    </>
  );
}
