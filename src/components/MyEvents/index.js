import React, { useEffect, useState } from "react";
import MyEventCard from "./MyEventCard";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function MyEventsSection({ allRegistrations }) {
  const { data, error, mutate } = useSWR(
    "https://bulletinapi.onrender.com/api/getevents",
    fetcher,
    {
      revalidateIfStale: true,
    }
  );
  const { data: session, status } = useSession();
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const filter = data.filter((event) => {
      if (event.createdBy == session.user.email) return true;
      else return false;
    });

    setFilteredData(filter);
  }, [data]);
  console.log("filtered data", filteredData);
  console.log("getting the data:", data);

  return (
    <div>
      <ToastContainer />
      {filteredData && filteredData.length == 0 && (
        <div className="flex justify-center">
          <h2 className="font-kanit ">You have not posted any events yet</h2>
        </div>
      )}
      {filteredData &&
        filteredData.map((event, key) => (
          <MyEventCard
            event={event}
            allRegistrations={allRegistrations}
            refreshData={mutate}
          />
        ))}
    </div>
  );
}

export default MyEventsSection;
