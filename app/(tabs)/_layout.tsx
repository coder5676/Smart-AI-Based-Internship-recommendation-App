import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import HomeScreen from ".";
import Studentprofile from "./profile";
import Loginpage from "./login";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ResumeBuilder from "./resumebuilder";
import AnalyticsPage from "./analytics"

export default function TabLayout() {
  const [user, setUser] = useState({}); // null when no user
  const [usertype, setusertype] = useState("");
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
const[route,setroute]=useState("home");
  const checkIfUserExists = async (email) => {
    try {
      const studentRef = doc(db, "students", email);
      const recruiterRef = doc(db, "recruiters", email);
      const studentSnap = await getDoc(studentRef);
      const recruiterSnap = await getDoc(recruiterRef);

      if (studentSnap.exists()) {
        setusertype("student");
        setUserExists(true);
        console.log("✅ User exists as student:", studentSnap.data());
      } else if (recruiterSnap.exists()) {
        setusertype("recruiter");
        setUserExists(true);
        console.log("✅ User exists as recruiter:", recruiterSnap.data());
      } else {
        setusertype("");
        setUserExists(false);
        console.log("❌ User does not exist in Firestore");
      }
    } catch (err) {
      setusertype("");
      setUserExists(false);
      console.error("Error checking user:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const newUser = {
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        setUser(newUser);

        // call async check safely
        checkIfUserExists(currentUser.email);
      } else {
        setUser({});
        setUserExists(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Case 1: Not logged in → Login page
  if (!user || Object.keys(user).length===0) {
    return (
      <Loginpage
        user={user}
        setUser={setUser}
        usertype={usertype}
        setusertype={setusertype}
      />
    );
  }

  // Case 2: Logged in but no Firestore record → show profile creation
  if (user && !userExists) {
    return <Studentprofile user={user} usertype={usertype} setusertype={setusertype}/>}
  // Case 3: Logged in + exists in Firestore → HomeScreen 
  
  return <HomeScreen user={user} usertype={usertype} route={route} setroute={setroute}/>;
  

}
