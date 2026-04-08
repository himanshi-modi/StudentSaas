import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { getStudents } from "../../services/studentService";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { exportToCSV } from "../../utils/exportCSV";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function Analytics() {
  const { userData } = useAuth();

  const [studentCount, setStudentCount] = useState(0);
  const [avgMarks, setAvgMarks] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [allGrades, setAllGrades]=useState([]);

  useEffect(() => {
    if (!userData) return;

    const fetchData = async () => {
      // Students
      const students = await getStudents(userData.schoolId);
      setStudentCount(students.length);

      // Grades
      
      const q = query(
        collection(db, "grades"),
        where("schoolId", "==", userData.schoolId)
      );

      const snapshot = await getDocs(q);

      let total = 0;
      let count = 0;
      let subjectMap = {};

      snapshot.forEach((doc) => {
        const data = doc.data();

        let gradeList = [];

        snapshot.forEach((doc) => {
        const data = doc.data();
        gradeList.push(data);
        setAllGrades(gradeList);
});

        const marks = Number(data.marks);
        total += marks;
        count++;

        if (!subjectMap[data.subject]) {
          subjectMap[data.subject] = [];
        }
        subjectMap[data.subject].push(marks);
      });

      // Average Marks
      setAvgMarks(count ? (total / count).toFixed(2) : 0);

      // Subject-wise avg
      const chart = Object.keys(subjectMap).map((subject) => {
        const arr = subjectMap[subject];
        const avg =
          arr.reduce((a, b) => a + b, 0) / arr.length;

        return {
          subject,
          average: avg.toFixed(2)
        };
      });

      setChartData(chart);
    };

    fetchData();
  }, [userData]);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 shadow">
          <h3>Total Students</h3>
          <p className="text-xl font-bold">{studentCount}</p>
        </div>

        <div className="bg-white p-4 shadow">
          <h3>Average Marks</h3>
          <p className="text-xl font-bold">{avgMarks}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 shadow">
        <h3 className="mb-4">Subject Performance</h3>

        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="average" />
        </BarChart>
      </div>
      <button className="bg-green-500 text-white px-4 mb-4" onClick={() => exportToCSV(allGrades, "grades")}>Export Grades CSV</button>
    </Layout>
  );
}