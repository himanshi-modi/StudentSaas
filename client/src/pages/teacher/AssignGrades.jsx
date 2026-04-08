import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStudents } from "../../services/studentService";
import { addGrade } from "../../services/gradeService";
import { createNotification } from "../../services/notificationService";
import Layout from "../../components/Layout";

export default function AssignGrades() {
  const { userData, currentUser } = useAuth();

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    if (userData) {
      getStudents(userData.schoolId).then(setStudents);
    }
  }, [userData]);

  const handleSubmit = async () => {
  await addGrade({
    studentId: selectedStudent,
    subject,
    marks,
    teacherId: currentUser.uid,
    schoolId: userData.schoolId
  });

  // 🔔 Create Notification
  await createNotification({
    userId: selectedStudent,
    message: `New grade added for ${subject}: ${marks}`
  });

  alert("Grade added & notification sent");
};

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Assign Grades</h2>

      <select onChange={(e) => setSelectedStudent(e.target.value)}>
        <option>Select Student</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <input placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
      <input placeholder="Marks" onChange={(e) => setMarks(e.target.value)} />

      <button onClick={handleSubmit}>Add Grade</button>
    </Layout>
  );
}