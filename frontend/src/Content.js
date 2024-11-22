import { Route, Routes, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./App.css";
import DashboardAdmin from "./components/Dashboard/MainDashboardAdmin";
import DashboardUser from "./components/Dashboard/MainDashboardUser";
import Signup from "./components/Signup/SignUp";
import Landing from "./components/LandingPage/Landing";
import AddNewUser from "./components/Users/AddNewUser";
import UserList from "./components/Users/UserList";
import AddNewQuestions from "./components/Questions/AddNewQuestions";
import QuestionsBank from "./components/Questions/Question bank/QuestionsBank";
import QuizList from "./components/Quiz/QuizList";
import McqQuizList from "./components/Quiz/Quiz Bank/Mcq/McqQuizList";
import CompQuizList from "./components/Quiz/Quiz Bank/Comprehensive/CompQuizList";
import MCQResult from "./components/Results/McqResult";
import UserSelection from "./components/Login/UserSelection";
import LoginUser from "./components/Login/LoginUser";
import LoginAdmin from "./components/Login/LoginAdmin";
import AddMcq from "./components/Quiz/AddQuestions/AddMcq/AddMcq";
import AddDescriptive from "./components/Quiz/AddQuestions/AddDescriptive/AddDescriptive";
import AddMcqUser from "./components/Quiz/AddUser/AddUserToMcq";
import AddCompUser from "./components/Quiz/AddUser/AddUserToComp";
import AddNewAdmin from "./components/Admins/AddNewAdmin";
import Adminlist from "./components/Admins/AdminList";
import AddNewCompQuiz from "./components/Quiz/AddQuiz/AddNewCompQuiz";
import AddNewMcqQuiz from "./components/Quiz/AddQuiz/AddNewMcqQuiz";
import AttemptQuiz from "./components/Quiz/AttemptQuiz/AttemptQuiz";
import AttemptMcq from "./components/Quiz/AttemptQuiz/Attempt Mcq/AttemptMcq";
import AttemptComprehensive from "./components/Quiz/AttemptQuiz/Attempt Comprehensive/AttemptComprehensive";
import McqQuizDetails from "./components/Quiz/Quiz Bank/Mcq/McqQuizDetails";
import CompQuizDetails from "./components/Quiz/Quiz Bank/Comprehensive/CompQuizDetails";
import AllMcqResultsList from "./components/Results/AllResults/AllMcqResult";
import AllCompResultsList from "./components/Results/AllResults/AllCompResult";
import McqResult from "./components/Results/User/McqResult";
import CompResult from "./components/Results/CompResultPage";
import EvaluateComp from "./components/Results/EvaluateComp";
import CompResultList from "./components/Results/User/CompResultList";
import ResultChoose from "./components/Results/AllResults/ResultChoose";

const user = localStorage.getItem("token");
const expiresIn = 50000;

if (user) {
  const jwt_Token_decoded = jwt_decode(user);
  if (expiresIn * 1000 + jwt_Token_decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    alert("Session Expired! Please login again");
    window.location.href = "/";
  }
}

export default function Content() {
  let user = 0,
    admin = 0;
  if (localStorage.getItem("token")) {
    if (localStorage.getItem("token").endsWith("/user")) {
      user = localStorage.getItem("token");
    } else if (localStorage.getItem("token").endsWith("/admin")) {
      admin = localStorage.getItem("token");
    }
  }

  return (
    <div className="home-page">
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/select_user" exact element={<UserSelection />} />
        <Route path="/login_user" exact element={<LoginUser />} />
        <Route path="/login_admin" exact element={<LoginAdmin />} />

        {admin && (
          <Route path="/dashboard" exact element={<DashboardAdmin />} />
        )}
        {user && <Route path="/dashboard" exact element={<DashboardUser />} />}
        {admin && (
          <Route path="/users/addnewuser" exact element={<AddNewUser />} />
        )}
        {admin && <Route path="/users/userlist" exact element={<UserList />} />}
        {admin && (
          <Route path="/admins/addnewadmin" exact element={<AddNewAdmin />} />
        )}
        {admin && (
          <Route path="/admins/adminlist" exact element={<Adminlist />} />
        )}
        {admin && (
          <Route
            path="/questions/addnewquestions"
            exact
            element={<AddNewQuestions />}
          />
        )}
        {admin && (
          <Route
            path="/questions/questionbank"
            exact
            element={<QuestionsBank />}
          />
        )}
        {user && (
          <Route
            path="/questions/questionbank"
            exact
            element={<QuestionsBank />}
          />
        )}
        {admin && (
          <Route
            path="/quiz/add_new_mcq_quiz"
            exact
            element={<AddNewMcqQuiz />}
          />
        )}
        {admin && (
          <Route
            path="/quiz/add_new_comp_quiz"
            exact
            element={<AddNewCompQuiz />}
          />
        )}
        {admin && (
          <Route
            path="/quiz/addnewquiz/addmcq/:id"
            exact
            element={<AddMcq />}
          />
        )}
        {admin && (
          <Route
            path="/quiz/addnewquiz/add_desc/:id"
            exact
            element={<AddDescriptive />}
          />
        )}
        {admin && <Route path="/quiz/quizList" exact element={<QuizList />} />}
        {admin && (
          <Route path="/quiz/mcq_quiz_list" exact element={<McqQuizList />} />
        )}
        {admin && (
          <Route path="/quiz/comp_quiz_list" exact element={<CompQuizList />} />
        )}
        {admin && (
          <Route
            path="/quiz/addnewquiz/add_mcq_user/:id"
            exact
            element={<AddMcqUser />}
          />
        )}
        {admin && (
          <Route
            path="/quiz/addnewquiz/add_comp_user/:id"
            exact
            element={<AddCompUser />}
          />
        )}
        {admin && (
          <Route path="/result/:quizid" exact element={<MCQResult />} />
        )}
        {user && <Route path="/result/:id" exact element={<MCQResult />} />}
        {user && (
          <Route path="/quiz/attempt_quiz" exact element={<AttemptQuiz />} />
        )}
        {user && (
          <Route
            path="/quiz/attempt_quiz/attempt_mcq/:id"
            exact
            element={<AttemptMcq />}
          />
        )}
        {user && (
          <Route
            path="/quiz/attempt_quiz/attempt_comp/:id"
            exact
            element={<AttemptComprehensive />}
          />
        )}
        {admin && (
          <Route
            path="/quiz/mcq_quiz_details/:id"
            exact
            element={<McqQuizDetails />}
          />
        )}
        {admin && (
          <Route
            path="/quiz/comp_quiz_details/:id"
            exact
            element={<CompQuizDetails />}
          />
        )}
        {admin && (
          <Route path="/all_results" exact element={<ResultChoose />} />
        )}
        {admin && (
          <Route path="/all_mcq_result" exact element={<AllMcqResultsList />} />
        )}
        {admin && (
          <Route
            path="/all_comp_result"
            exact
            element={<AllCompResultsList />}
          />
        )}
        {admin && (
          <Route
            path="/all_comp_result/evaluate_comp/:id"
            exact
            element={<EvaluateComp />}
          />
        )}
        {user && <Route path="/mcq_result" exact element={<McqResult />} />}
        {user && <Route path="/comp_result" exact element={<CompResult />} />}
        {user && (
          <Route path="/comp_result_list" exact element={<CompResultList />} />
        )}

        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}
