import { combineReducers } from "redux";
import authReducer from "./authReducer";
import levelReducer from "./levelReducer";
import courseReducer from "./courseReducer";
import examReducer from "./examReducer";
import questionReducer from "./questionReducer";
import studentReducer from "./studentReducer";
import entExamReducer from "./studExamReducer";
import examQuestionReducer from "./examQuestionReducer";
import examDetailReducer from "./examDetailReducer";
import resultDetailReducer from "./resultDetailReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  levels: levelReducer,
  courses: courseReducer,
  exams: examReducer,
  students: studentReducer,
  questions: questionReducer,
  student_exams: entExamReducer,
  exam_questions: examQuestionReducer,
  exam_details: examDetailReducer,
  result_details: resultDetailReducer,
});
export default rootReducer;
