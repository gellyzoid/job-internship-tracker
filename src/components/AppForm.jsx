import {
  Button,
  Datepicker,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

function AppForm({ onAddJobs, setOpenModal, jobs, setJobs }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState(null);
  const [comment, setComment] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const currentJob = jobs?.find(
    (job) => job.id === Number(searchParams.get("id")),
  );

  // Sync state with currentJob whenever it changes
  useEffect(() => {
    if (currentJob) {
      setCompany(currentJob.company || "");
      setRole(currentJob.role || "");
      setLink(currentJob.link || "");
      setDate(currentJob.date || null);
      setStatus(currentJob.status || "");
      setComment(currentJob.comment || "");
    }
  }, [currentJob]);

  const isEmpty =
    company === "" ||
    role === "" ||
    link === "" ||
    date === null ||
    status === "" ||
    comment === "";

  const isChanged =
    company !== currentJob?.company ||
    role !== currentJob?.role ||
    link !== currentJob?.link ||
    date !== currentJob?.date ||
    status !== currentJob.status ||
    comment !== currentJob.comment;

  function handleSubmit() {
    const newJob = {
      company,
      role,
      status,
      link,
      date,
      comment,
      id: Date.now(),
    };

    const updateJob = {
      company,
      role,
      status,
      link,
      date,
      comment,
      id: Number(searchParams.get("id")),
    };

    if (!currentJob) {
      onAddJobs(newJob);
      toast.success("Job has been added");
    } else {
      setJobs((jobs) =>
        jobs.map((job) =>
          job.id === Number(searchParams.get("id"))
            ? { ...job, ...updateJob }
            : job,
        ),
      );
      searchParams.delete("id");
      setSearchParams(searchParams);
      toast.success("Job has been updated");
    }

    if (status === "accepted") {
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        text: `You've accepted an offer from ${company} as a ${role}! This is an exciting new chapter in your career—wishing you all the best as you take on this amazing opportunity. You're going to do great things!`,
        confirmButtonText: "Awesome!",
      });
    }

    if (status === "rejected") {
      Swal.fire({
        icon: "error",
        title: "Keep Going!",
        text: `Unfortunately, you were not selected for the ${role} position at ${company}. Don't be discouraged, your next opportunity could be just around the corner! Keep pushing forward and refining your skills.`,
        confirmButtonText: "Stay Strong",
      });
    }

    if (status === "interviewing") {
      Swal.fire({
        icon: "info",
        title: "Great Job!",
        text: `You're currently interviewing for the ${role} position at ${company}! Keep up the good work, and stay confident—you’re doing awesome! Keep preparing and show them what you’ve got.`,
        confirmButtonText: "Keep it up!",
      });
    }

    if (status === "offer") {
      Swal.fire({
        icon: "success",
        title: "Offer Received!",
        text: `Congratulations! You've received an offer for the ${role} position at ${company}! Take some time to review the offer and make the best decision for your career. This is a huge achievement—well done!`,
        confirmButtonText: "Exciting times!",
      });
    }

    if (status === "submitted") {
      Swal.fire({
        icon: "info",
        title: "Well Done!",
        text: `Your application for the ${role} position at ${company} has been submitted! Great job getting everything in on time. Now, take a deep breath and let the waiting game begin. Stay positive—good things are ahead!`,
        confirmButtonText: "You got this!",
      });
    }
  }

  const handleDateChange = (selectedDate) => {
    const maxDate = new Date();
    if (selectedDate > maxDate) {
      Swal.fire({
        title: "Date exceeds limit!",
        text: "Please select a date that is today or in the past.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      setDate(selectedDate);
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Company" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Company 1"
          required
          shadow
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="role" value="Role" />
        </div>
        <TextInput
          id="role"
          type="text"
          placeholder="Role 1"
          required
          shadow
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="link" value="Link" />
        </div>
        <TextInput
          id="link"
          type="text"
          placeholder="Link 1"
          required
          shadow
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="date" value="Date Applied" />
        </div>

        <Datepicker value={date} onChange={handleDateChange} />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="status" value="Status" />
        </div>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value=""></option>
          <option value="submitted">Submitted</option>
          <option value="processing">Interviewing</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
          <option value="accepted">Accepted</option>
        </Select>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="comment" value="Comment" />
        </div>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className="mt-2 flex justify-end border-t border-gray-600">
        <div className="mt-6 flex gap-2">
          <Button
            color="gray"
            onClick={() => {
              searchParams.delete("id");
              setSearchParams(searchParams);
              setOpenModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              setOpenModal(false);
            }}
            disabled={!isChanged || isEmpty}
          >
            Add
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AppForm;
