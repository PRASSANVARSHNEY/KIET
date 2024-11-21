// Import the base API slice
import { apiSlice } from './apiSlice';

// Define the base URL for all exam-related endpoints
const EXAMS_URL = '/api/exams/exam';

// Inject endpoints for the exam slice
export const examApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all exams
    getExams: builder.query({
      query: () => ({
        url: `${EXAMS_URL}`, // Fetch exams from '/api/users/exam'
        method: 'GET',
      }),
    }),

    // Create a new exam
    createExam: builder.mutation({
      query: (data) => ({
        url: `${EXAMS_URL}`, // Post new exam to '/api/users/exam'
        method: 'POST',
        body: data,
      }),
    }),

    // Fetch questions for a specific exam
    getQuestions: builder.query({
      query: (examId) => ({
        url: `${EXAMS_URL}/questions/${examId}`, // Fetch questions by examId
        method: 'GET',
      }),
    }),

    // Create a new question for an exam
    createQuestion: builder.mutation({
      query: (data) => ({
        url: `${EXAMS_URL}/questions`, // Post a new question
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export the generated hooks for each endpoint
export const {
  useGetExamsQuery,         // Hook to fetch all exams
  useCreateExamMutation,    // Hook to create a new exam
  useGetQuestionsQuery,     // Hook to fetch questions for an exam
  useCreateQuestionMutation, // Hook to create a new question
} = examApiSlice;
