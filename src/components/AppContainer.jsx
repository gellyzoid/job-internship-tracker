import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Analytics from "./Analytics";
import Goals from "./Goals";
import Home from "./Home";

function AppContainer({ openDrawer, setOpenDrawer }) {
  const [openModal, setOpenModal] = useState(false);
  const [jobs, setJobs] = useState(function initializeLocalStorage() {
    const storedJobs = localStorage.getItem("jobs");
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

  const [searchParams, setSearchParams] = useSearchParams();

  function handleAddJobs(job) {
    setJobs((jobs) => [...jobs, job]);
  }

  function handleDeleteJob(id) {
    setJobs((jobs) => jobs.filter((job) => job.id !== id));
  }

  return (
    <>
      <Home
        jobs={jobs}
        setJobs={setJobs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleAddJobs={handleAddJobs}
        handleDeleteJob={handleDeleteJob}
      />
      <Analytics jobs={jobs} setOpenDrawer={setOpenDrawer} />
      <Goals openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
}

export default AppContainer;
