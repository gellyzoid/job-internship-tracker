import { Button, FileInput, TextInput, Tooltip } from "flowbite-react";
import { HiXMark } from "react-icons/hi2";
import SortBy from "./SortBy";
import Filter from "./Filter";
import Swal from "sweetalert2";
import { FaInfoCircle } from "react-icons/fa";

function JobsTableOperation({
  searchKeyword,
  handleSearch,
  setSearchKeyword,
  jobs,
  setJobs,
}) {
  function exportJobs() {
    const dataStr = JSON.stringify(jobs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "jobs.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function isValidJob(job) {
    const requiredFields = [
      "company",
      "role",
      "status",
      "link",
      "date",
      "comment",
      "id",
    ];
    return requiredFields.every(
      (field) => job.hasOwnProperty(field) && job[field] !== "",
    );
  }

  function importJobs(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedJobs = JSON.parse(e.target.result);

        if (!Array.isArray(importedJobs)) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Invalid JSON format: Expected an array.",
            confirmButtonText: "Confirm",
          });
          return;
        }

        // Validate each job
        const validJobs = importedJobs.filter(isValidJob);
        if (validJobs.length !== importedJobs.length) {
          Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: "Some jobs were ignored due to missing required fields.",
            confirmButtonText: "OK",
          });
        }

        const mergedJobs = [
          ...jobs,
          ...validJobs.filter(
            (newJob) =>
              !jobs.some((existingJob) => existingJob.id === newJob.id),
          ),
        ];

        setJobs(mergedJobs);
        localStorage.setItem("jobs", JSON.stringify(mergedJobs));

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Jobs have been imported.",
          confirmButtonText: "OK",
        });

        fileInput.value = "";
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Invalid JSON file",
          confirmButtonText: "OK",
        });
      }
    };

    reader.readAsText(file);
  }

  return (
    <div className="mx-6 mb-2 flex flex-col gap-2 md:flex-row">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Tooltip
          content="Export and import your job list as a JSON file if you recently switched device or browser."
          placement="top"
        >
          <FaInfoCircle className="cursor-pointer text-lg dark:text-slate-200" />
        </Tooltip>

        <Tooltip
          content="Download your jobs as a JSON file if you want to switch device or browser."
          placement="top"
        >
          <span>
            <Button
              onClick={exportJobs}
              disabled={jobs.length === 0}
              className="w-full sm:w-auto"
            >
              Export JSON
            </Button>
          </span>
        </Tooltip>
        <Tooltip
          content="Upload a JSON file from your old device or browser to add jobs to your list."
          placement="top"
        >
          <label htmlFor="import-jobs">
            <Button as="span" className="w-full sm:w-auto">
              Import JSON
            </Button>
            <FileInput
              id="import-jobs"
              type="file"
              accept="application/json"
              onChange={importJobs}
              className="hidden"
            />
          </label>
        </Tooltip>
      </div>

      <div className="flex-grow">
        <div className="relative">
          <TextInput
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearch}
          />
          {searchKeyword && (
            <Button
              className="absolute inset-y-0 right-0 my-1 mr-1 items-center rounded p-0 text-white"
              onClick={() => setSearchKeyword("")}
            >
              <HiXMark />
            </Button>
          )}
        </div>
      </div>

      <div>
        <Filter
          filterField="status"
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "submitted",
              label: "Submitted",
            },
            {
              value: "processing",
              label: "Interviewing",
            },
            {
              value: "rejected",
              label: "Rejected",
            },
            {
              value: "offer",
              label: "Offer",
            },
            {
              value: "accepted",
              label: "Accepted",
            },
          ]}
        />
      </div>

      <div className="flex-grow">
        <SortBy
          options={[
            { value: "date-desc", label: "Sort by date (recent first)" },
            { value: "date-asc", label: "Sort by date(oldest first)" },
          ]}
        />
      </div>
    </div>
  );
}

export default JobsTableOperation;
