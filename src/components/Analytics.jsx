import { format } from "date-fns";
import { Card } from "flowbite-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barColors = ["#6f42c1", "#007bff", "#2ca02c", "#dc3545", "#fd7e14"];

const Analytics = ({ jobs, setOpenDrawer }) => {
  const totalJobs = jobs.length;
  const interviewCount = jobs.filter((job) => job.status === "processing");
  const acceptedCount = jobs.filter((job) => job.status === "accepted");
  const offerCount = jobs.filter((job) => job.status === "offer");
  const rejectedCount = jobs.filter((job) => job.status === "rejected");

  const data = [
    { name: "Submitted", amount: totalJobs },
    { name: "Interviewing", amount: interviewCount?.length },
    { name: "Accepted", amount: acceptedCount?.length },
    { name: "Rejected", amount: rejectedCount?.length },
    { name: "Offer", amount: offerCount?.length },
  ];

  const groupByDate = jobs.reduce((acc, entry) => {
    const date = format(new Date(entry.date), "MMM dd, yyyy");

    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;

    return acc;
  }, {});

  const formattedData = Object.keys(groupByDate).map((date) => ({
    date,
    count: groupByDate[date],
  }));

  function handleSetGoal() {
    setOpenDrawer(true);
  }

  return (
    <div className="bg-slate-200 p-6 dark:bg-gray-900" id="analytics">
      <p className="mb-4 text-2xl font-semibold dark:text-slate-200">
        Analytics
      </p>
      <div className="block gap-6 md:grid md:grid-cols-2">
        <Card>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="amount"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              >
                {" "}
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="dark:text-slate-200">
            This graph provides a visual representation of your job application
            progress. It shows the number of job applications you've submitted
            over time, the current status of each (e.g., applied, interview,
            offer), and how your efforts are evolving. Use this overview to
            track your job search activity and stay motivated as you monitor key
            milestones in your career journey
          </p>
        </Card>

        <Card>
          <div>
            <p className="dark:text-slate-200">Daily Job Applications</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="dark:text-slate-200">
              This chart tracks the number of job applications you've submitted
              each day. It provides a detailed view of your activity, helping
              you identify patterns in your job search efforts. Whether you’re
              actively applying or taking breaks, this daily breakdown gives you
              insight into your consistency and progress over time. Use this
              data to stay on track with your job application goals and assess
              the pace of your job search.
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-8 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 text-white shadow-lg">
        <h2 className="mb-4 text-3xl font-semibold">Keep Pushing Forward!</h2>
        <p className="text-lg">
          The job search journey can be challenging, but every application
          brings you one step closer to your goal. Stay consistent, keep
          refining your resume and cover letter, and don't hesitate to reach out
          for support.
          <br />
          <span className="font-bold">You've got this</span> – the right
          opportunity is just around the corner!
          <br />
          Remember, progress is progress, no matter how small.
        </p>
        <div className="mt-6">
          <button
            className="rounded-lg bg-white px-6 py-2 font-semibold text-purple-600 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={handleSetGoal}
          >
            Set Your Next Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
