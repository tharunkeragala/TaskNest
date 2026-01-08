const Task = require("../models/Task");

// @desc Get all tasks ( Admin: all, User: only assigned tasks)
// @route GET /api/tasks/
// @access Private
const getTasks = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get task by ID
// @route Get /api/tasks/:id
// @access private
const getTaskByID = async (req, res) => {};

// @desc Create a new task (Admin only)
// @route POST /api/tasks/
// @access private (Admin)
const createTask = async (req, res) => {};

// desc Update task details
// @route PUT /api/tasks/:id
// @access private
const updateTask = async (req,res) => {};

// @desc Delete a task (Admin only)
// @route DELETE /api/tasks/:id
// @access private (Admin)
const deleteTask = async (req, res) => {};

// @desc Update task status
// @route PUT /api/tasks/:id/status
// @access private
const updateTaskStatus = async (req, res) => {};

// @desc Update task Checklist
// @route PUT /api/tasks/:id/todo
// @access private
const updateTaskChecklist = async (req, res) => {};

// @desc Dashboard Data (Admin only)
// @route GET /api/taska/dashboard-data
// @access private (Admin)
const getDashboardData = async (req, res) => {};