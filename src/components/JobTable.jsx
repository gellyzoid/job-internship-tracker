import { Card, Modal, Pagination, Table } from "flowbite-react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import AppForm from "./AppForm";
import { format } from "date-fns";

export function JobTable({
  openModal,
  setOpenModal,
  onAddJobs,
  onDeleteJobs,
  jobs,
  setJobs,
  currentPage,
  totalPages,
  currentData,
  onPageChange,
  startIndex,
  endIndex,
  filteredData,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteJobs(Number(searchParams.get("id")));
        toast.success("Job has been deleted");
        searchParams.delete("id");
        setSearchParams(searchParams);
      } else if (result.isDismissed) {
        searchParams.delete("id");
        setSearchParams(searchParams);
      }
    });
  }

  return (
    <>
      <Modal
        className="backdrop-blur-sm"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Job</Modal.Header>
        <Modal.Body>
          <AppForm
            onAddJobs={onAddJobs}
            openModal={openModal}
            setOpenModal={setOpenModal}
            jobs={jobs}
            setJobs={setJobs}
          />
        </Modal.Body>
      </Modal>

      <div className="mx-6 mb-2 mt-2">
        {jobs?.length === 0 ? (
          <div className="jobs-center flex justify-center">
            <p className="dark:text-slate-200">No Activities</p>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Company</Table.HeadCell>
                  <Table.HeadCell>Role</Table.HeadCell>
                  <Table.HeadCell>Link</Table.HeadCell>
                  <Table.HeadCell>Date Applied</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Comment</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Actions</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {currentData?.map((job, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {job?.company}
                      </Table.Cell>
                      <Table.Cell>{job?.role}</Table.Cell>
                      <Table.Cell>
                        <a
                          href={job?.link}
                          target="_blank"
                          className="font-semibold text-blue-500 underline underline-offset-2"
                        >
                          Go to link
                        </a>
                      </Table.Cell>
                      <Table.Cell>
                        {format(new Date(job?.date), "MMM. dd, yyyy")}
                      </Table.Cell>
                      <Table.Cell>
                        <p className="font-semibold uppercase">
                          <span
                            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase ${job?.status === "submitted" && "bg-blue-200 text-blue-700"} ${job?.status === "processing" && "bg-yellow-200 text-yellow-700"} ${job?.status === "rejected" && "bg-red-200 text-red-700"} ${job?.status === "offer" && "bg-purple-200 text-purple-700"} ${job?.status === "accepted" && "bg-green-200 text-green-700"} `}
                          >
                            {job?.status === "submitted" && "Submitted"}
                            {job?.status === "processing" && "Interviewing"}
                            {job?.status === "rejected" && "Rejected"}
                            {job?.status === "offer" && "Offer"}
                            {job?.status === "accepted" && "Accepted"}
                          </span>
                        </p>
                      </Table.Cell>

                      <Table.Cell>{job?.comment}</Table.Cell>

                      <Table.Cell>
                        <div className="flex gap-1">
                          <button
                            className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            onClick={() => {
                              searchParams.set("id", job?.id);
                              setSearchParams(searchParams);
                              setOpenModal(true);
                            }}
                            disabled={
                              job?.status === "paused" ||
                              job?.status === "playing" ||
                              job?.status === "finished"
                            }
                          >
                            Edit
                          </button>
                          |
                          <button
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            onClick={() => {
                              searchParams.set("id", job?.id);
                              setSearchParams(searchParams);
                              handleDelete();
                            }}
                            disabled={
                              job?.status === "paused" ||
                              job?.status === "playing"
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            {/* <div className="block h-full md:hidden">
              {currentData?.map((job, index) => (
                <Card
                  className="relative mb-2 flex flex-col rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 sm:flex-row"
                  key={index}
                >
                  <div className="w-full sm:w-3/4">
                    <p className="mb-2 font-semibold text-stone-700 dark:text-slate-200">
                      Company:{" "}
                      <span className="text-stone-600 dark:text-gray-400">
                        {job?.company}
                      </span>
                    </p>
                    <p className="mb-2 font-semibold text-stone-700 dark:text-slate-200">
                      Role:{" "}
                      <span className="text-stone-600 dark:text-gray-400">
                        {job?.role}
                      </span>
                    </p>
                    <p className="mb-2 font-semibold text-stone-700 dark:text-slate-200">
                      Link:{" "}
                      <a
                        href={job?.link}
                        target="_blank"
                        className="text-blue-500 underline underline-offset-2"
                      >
                        Go to link
                      </a>
                    </p>
                    <p className="mb-2 font-semibold text-stone-700 dark:text-slate-200">
                      Date applied:{" "}
                      <span className="text-stone-600 dark:text-gray-400">
                        {format(new Date(job?.date), "MMM. dd, yyyy")}
                      </span>
                    </p>
                    <p className="mb-2 flex gap-2 font-semibold text-stone-700 dark:text-slate-200">
                      Status:{" "}
                      <p className="font-semibold uppercase">
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase ${job?.status === "submitted" && "bg-blue-200 text-blue-700"} ${job?.status === "processing" && "bg-yellow-200 text-yellow-700"} ${job?.status === "rejected" && "bg-red-200 text-red-700"} ${job?.status === "offer" && "bg-purple-200 text-purple-700"} ${job?.status === "accepted" && "bg-green-200 text-green-700"} `}
                        >
                          {job?.status === "submitted" && "Submitted"}
                          {job?.status === "processing" && "Interviewing"}
                          {job?.status === "rejected" && "Rejected"}
                          {job?.status === "offer" && "Offer"}
                          {job?.status === "accepted" && "Accepted"}
                        </span>
                      </p>
                    </p>
                    <p className="mb-4 font-semibold text-stone-700 dark:text-slate-200">
                      Comment:{" "}
                      <span className="text-stone-600 dark:text-gray-400">
                        {job?.comment}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => {
                        searchParams.set("id", job?.id);
                        setSearchParams(searchParams);
                        setOpenModal(true);
                      }}
                      disabled={
                        job?.status === "paused" ||
                        job?.status === "playing" ||
                        job?.status === "finished"
                      }
                    >
                      Edit
                    </button>
                    |
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => {
                        searchParams.set("id", job?.id);
                        setSearchParams(searchParams);
                        handleDelete();
                      }}
                      disabled={
                        job?.status === "paused" || job?.status === "playing"
                      }
                    >
                      Delete
                    </button>
                  </div>
                </Card>
              ))}
            </div> */}

            {currentData?.length > 0 && (
              <div className="flex items-center justify-between">
                <span className="dark:text-slate-200">
                  Showing {startIndex} to {endIndex} of {filteredData?.length}{" "}
                  entries
                </span>

                <Pagination
                  layout="navigation"
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  showIcons
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
