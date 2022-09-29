import axios from "axios";

const base = process.env.BASE_URL;

export const getAllCommunities = async () => {
  const communities = await axios.get(`${base}/getAllCommunities`);
  console.log("All comm", communities);

  return communities;
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
