import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createExam, getExams } from "../controllers/examController.js";
import {
  createQuestion,
  getQuestionsByExamId,
} from "../controllers/quesController.js";
import {
  getCheatingLogsByExamId,
  saveCheatingLog,
} from "../controllers/cheatingLogController.js";

const examRoutes = express.Router();

// Protecting routes using auth middleware
examRoutes.route("/exam").get(protect, getExams).post(protect, createExam);
examRoutes.route("/exam/questions").post(protect, createQuestion);
examRoutes.route("/exam/questions/:examId").get(protect, getQuestionsByExamId);
examRoutes.route("/cheatingLogs/:examId").get(protect, getCheatingLogsByExamId);
examRoutes.route("/cheatingLogs/").post(protect, saveCheatingLog);

export default examRoutes;
