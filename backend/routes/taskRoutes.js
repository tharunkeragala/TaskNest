const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {  getDashboardData,  getUserDashboardData,  getTasks,  getTaskById,  createTask,  updateTask,  deleteTask,  updateTaskStatus,  updateTaskChecklist} = require("../controllers/taskController");

const router = express.Router();

//Task Management Routes
// Dashboard Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);

// Task Management Routes
router.get("/", protect, getTasks); // Admin: all tasks, User: assigned tasks
router.get("/:id", protect , getTaskById );

router.post("/", protect, adminOnly, createTask);
router.put("/:id", protect, updateTask); // consider adminOnly or ownership check
router.delete("/:id", protect, adminOnly, deleteTask);

router.put("/:id/status", protect, updateTaskStatus);
router.put("/:id/todo", protect, updateTaskChecklist);

module.exports = router;
