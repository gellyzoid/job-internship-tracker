import { Drawer } from "flowbite-react";
import { HiFlag } from "react-icons/hi2";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

// Default empty goals array
const initialGoals = [];

function Goals({ openDrawer, setOpenDrawer }) {
  const [goals, setGoals] = useState(() => {
    // Try to load the goals from localStorage if they exist
    const savedGoals = localStorage.getItem("goals");
    return savedGoals ? JSON.parse(savedGoals) : initialGoals;
  });

  const [newGoal, setNewGoal] = useState({ title: "", content: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [editedGoalId, setEditedGoalId] = useState(null);

  useEffect(() => {
    // Whenever goals state changes, save them to localStorage
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  function handleClose() {
    setOpenDrawer(false);
  }

  function handleAddGoal() {
    if (newGoal.title && newGoal.content) {
      const newGoalWithId = { ...newGoal, id: Date.now() };
      setGoals((prevGoals) => [...prevGoals, newGoalWithId]);
      setNewGoal({ title: "", content: "" });
      setIsAdding(false);
      toast.success("Goal has been added.");
    }
  }

  function handleEditGoal(id, title, content) {
    setNewGoal({ title, content });
    setIsAdding(true);
    setEditedGoalId(id);
  }

  function handleSaveChanges() {
    if (editedGoalId) {
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === editedGoalId
            ? { ...goal, title: newGoal.title, content: newGoal.content }
            : goal,
        ),
      );
      setNewGoal({ title: "", content: "" });
      setIsAdding(false);
      setEditedGoalId(null);
      toast.success("Goal has been updated.");
    }
  }

  function handleDeleteGoal(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, this goal cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
        toast.success("Goal has been deleted.");
      }
    });
  }

  function handleCancelEdit() {
    setNewGoal({ title: "", content: "" });
    setIsAdding(false);
    setEditedGoalId(null);
  }

  return (
    <div className="">
      <Drawer open={openDrawer} onClose={handleClose} position="bottom">
        <Drawer.Header title="Your Job Search Goals" titleIcon={HiFlag} />
        <Drawer.Items>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Track your job search progress and keep your goals in check. You can
            always edit and add new goals as you make progress in your job
            search.
          </p>

          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {goal.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400">
                  {goal.content}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() =>
                      handleEditGoal(goal.id, goal.title, goal.content)
                    }
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isAdding ? (
            <div className="mt-6 rounded-lg bg-gray-100 p-4 shadow-lg dark:bg-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editedGoalId ? "Edit Goal" : "Add New Goal"}
              </h4>
              <input
                type="text"
                placeholder="Goal Title"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
                className="mb-4 mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <textarea
                placeholder="Goal Description"
                value={newGoal.content}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, content: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleCancelEdit}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={editedGoalId ? handleSaveChanges : handleAddGoal}
                  className="rounded-lg bg-cyan-600 px-6 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                >
                  {editedGoalId ? "Save Changes" : "Save Goal"}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsAdding(true)}
                className="rounded-lg bg-cyan-600 px-6 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700"
              >
                Add New Goal
              </button>
              <button
                onClick={handleClose}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          )}
        </Drawer.Items>
      </Drawer>
    </div>
  );
}

export default Goals;
