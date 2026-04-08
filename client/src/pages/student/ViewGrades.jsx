import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getGradesByStudent } from "../../services/gradeService";
import Layout from "../../components/Layout";

export default function ViewGrades() {
  const { currentUser } = useAuth();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getGradesByStudent(currentUser.uid).then(setGrades);
    }
  }, [currentUser]);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">My Grades</h2>

      {grades.map((g) => (
        <div key={g.id}>
          {g.subject} - {g.marks}
        </div>
      ))}
    </Layout>
  );
}