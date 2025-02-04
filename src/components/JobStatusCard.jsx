import {
  FaCheckCircle,
  FaHandshake,
  FaHourglassHalf,
  FaPaperPlane,
  FaTimesCircle,
} from "react-icons/fa";

function JobStatusCard({ status, jobs }) {
  const icons = {
    submitted: <FaPaperPlane className="text-4xl text-blue-500" />,
    processing: <FaHourglassHalf className="text-4xl text-yellow-500" />,
    rejected: <FaTimesCircle className="text-4xl text-red-500" />,
    accepted: <FaCheckCircle className="text-4xl text-green-500" />,
    offer: <FaHandshake className="text-4xl text-purple-500" />,
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
      <div className="flex items-center justify-start space-x-3">
        {icons[status]}
        <p className="text-xl dark:text-slate-200">
          {status.charAt(0).toUpperCase() + status.slice(1)} Jobs
        </p>
      </div>
      <div className="mx-auto flex items-center justify-center">
        <p className="text-2xl font-semibold dark:text-slate-200">
          {jobs.length}
        </p>
      </div>
    </div>
  );
}

export default JobStatusCard;
