import { FaClipboardList } from "react-icons/fa";
import { JobTable } from "./JobTable";
import JobStatusCard from "./JobStatusCard";
import { Button } from "flowbite-react";
import JobsTableOperation from "./JobsTableOperation";
import { useSearch } from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";
import { useEffect } from "react";

function Home({
  jobs,
  setJobs,
  searchParams,
  setSearchParams,
  openModal,
  setOpenModal,
  handleAddJobs,
  handleDeleteJob,
}) {
  const filterValue = searchParams.get("status") || "all";

  let filteredJobs;
  if (filterValue === "all") filteredJobs = jobs;
  if (filterValue === "submitted")
    filteredJobs = jobs?.filter((job) => job.status === "submitted");
  if (filterValue === "processing")
    filteredJobs = jobs?.filter((job) => job.status === "processing");
  if (filterValue === "rejected")
    filteredJobs = jobs?.filter((job) => job.status === "rejected");

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedJobs = filteredJobs?.sort((a, b) => {
    let comparison = 0;
    if (typeof a[field] === "number" && typeof b[field] === "number") {
      comparison = a[field] - b[field];
    } else if (
      new Date(a[field]) instanceof Date &&
      new Date(b[field]) instanceof Date
    ) {
      comparison = new Date(a[field]) - new Date(b[field]);
    } else {
      comparison = a[field]?.localeCompare(b[field]);
    }
    return comparison * modifier;
  });

  const { searchKeyword, setSearchKeyword, handleSearch, filteredData } =
    useSearch(sortedJobs);

  const PAGE_SIZE = 10;
  const {
    currentPage,
    totalPages,
    currentData,
    onPageChange,
    startIndex,
    endIndex,
  } = usePagination(filteredData, PAGE_SIZE);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]); // Trigger effect when items change

  const groupedJobs = jobs.reduce((acc, job) => {
    acc[job.status] = [...(acc[job.status] || []), job];
    return acc;
  }, {});

  return (
    <div className="bg-slate-200 dark:bg-gray-900" id="home">
      <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-start space-x-3">
            <FaClipboardList className="text-4xl text-green-500" />

            <p className="text-xl dark:text-slate-200">Total Jobs Applied</p>
          </div>

          <div className="mx-auto flex items-center justify-center">
            <p className="text-2xl font-semibold dark:text-slate-200">
              {jobs.length}
            </p>
          </div>
        </div>

        {Object.keys(groupedJobs).map((status) => (
          <JobStatusCard
            key={status}
            status={status}
            jobs={groupedJobs[status]}
          />
        ))}
      </div>

      <div className="mb-2 block md:mb-0 md:flex md:items-center md:justify-between">
        <Button
          onClick={() => {
            searchParams.delete("id");
            setSearchParams(searchParams);
            setOpenModal(true);
          }}
          className="mx-6 mb-2"
        >
          Add a job
        </Button>

        <JobsTableOperation
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          handleSearch={handleSearch}
          jobs={jobs}
          setJobs={setJobs}
        />
      </div>

      <JobTable
        setOpenModal={setOpenModal}
        openModal={openModal}
        onAddJobs={handleAddJobs}
        onDeleteJobs={handleDeleteJob}
        jobs={jobs}
        setJobs={setJobs}
        currentPage={currentPage}
        totalPages={totalPages}
        currentData={currentData}
        onPageChange={onPageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredData={filteredData}
      />
    </div>
  );
}

export default Home;
