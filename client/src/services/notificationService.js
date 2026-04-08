import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

// CREATE NOTIFICATION
export const createNotification = async (notification) => {
  await addDoc(collection(db, "notifications"), {
    ...notification,
    read: false,
    createdAt: new Date()
  });
};

// GET USER NOTIFICATIONS
export const getNotifications = async (userId) => {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};