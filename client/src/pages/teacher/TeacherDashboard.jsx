import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      <Link to="/teacher/grades" className="text-blue-500">
        Assign Grades
      </Link>
    </Layout>
  );
}