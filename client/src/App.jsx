import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Students from "./pages/admin/Students";
import AssignGrades from "./pages/teacher/AssignGrades";
import ViewGrades from "./pages/student/ViewGrades";
import ProtectedRoute from "./routes/ProtectedRoute";
import Analytics from "./pages/admin/Analytics";
import Notifications from "./pages/common/Notifications";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute role="admin"><Students /></ProtectedRoute>} />

        <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/grades" element={<ProtectedRoute role="teacher"><AssignGrades /></ProtectedRoute>} />

        <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/grades" element={<ProtectedRoute role="student"><ViewGrades /></ProtectedRoute>} />
        <Route path="/admin/analytics"element={<ProtectedRoute role="admin"><Analytics /></ProtectedRoute>}/>
        <Route path="/notifications"element={<ProtectedRoute><Notifications /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;