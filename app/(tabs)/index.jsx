import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "./sidebar";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import Details from './detailedview';
import Entypo from '@expo/vector-icons/Entypo';
import AnalyticsPage from "./analytics";
import UserProfile from "./profilepage";
import Skilllearn from './appliedjobs';
import EmployerJobUpload from './uploadjobs';
import GeminiChatbot from "./chatbot"


export default function HomeScreen({ user, usertype,route,setroute }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
 const [openanalytics,setopenanalytics]=useState(false);
 const[details,opendetails]=useState(false);
 const[openprof,setopenprof]=useState(false);
 const[openskillenhance,setopenskillenhance]=useState(false);
 const[openchatbot,setopenchatbot]=useState(false);
 const[addjobs,setaddjobs]=useState(false);

 const[currjob,setcurrjob]=useState({});


  

  // ✅ Apply for job (only append email)
  const applyForJob = async (jobId, user) => {
    if (!user?.email) {
      alert("User not logged in!");
      return;
    }

    try {
      const jobRef = doc(db, "Jobs", jobId);

      await updateDoc(jobRef, {
        applicants: arrayUnion(user.email),
      });

      alert("Applied successfully!");
    } catch (error) {
      console.error("Error applying for job: ", error);
      alert("Failed to apply, please try again.");
    }
  };

function handleopendetails(data){
  opendetails(true);
  setcurrjob(data);
}
  // ✅ Fetch user profile
  const fetchUserProfile = async (email) => {
    try {
      if (!email) throw new Error("Email is undefined");

      const docRef = doc(db, "students", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("No profile found for:", email);
        return null;
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      return null;
    }
  };

  // ✅ Fetch jobs
  const fetchJobs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Jobs"));

      const jobs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          title: data.title || "Untitled",
          "Skills required": Array.isArray(data["Skills required"])
            ? data["Skills required"]
            : [],
          createdat: data.CreatedAt || "",
          applicants: Array.isArray(data.applicants) ? data.applicants : [],
          id: doc.id,
          location: data.Location || "",
          company: data["company name"] || "",
          thumbnailurl: data["thumbnail url"] || "",
          description: data["Description"],
          domain: data["domain"],
          duration: data.duration,
          reference: data["reference employerid"],
          salary: data.stipend,
        };
      });

      console.log("Fetched jobs array:", jobs);
      return jobs;
    } catch (error) {
      console.error("Error fetching jobs: ", error);
      return [];
    }
  };

  // ✅ Send jobs to ML
  const sendJobsToML = async (resumeUrl, jobs) => {
    try {
      const response = await fetch("http://10.10.132.220:5000/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeurl: resumeUrl, jobs: jobs }),
      });

      const result = await response.json();
 
      return Array.isArray(result) ? result : [];
    } catch (err) {
      console.error("Error sending to ML server:", err);
      return [];
    }
  };

 

  // ✅ Load everything
  useEffect(() => {
    const loadData = async () => {
      if (!user?.email) return;
      setLoading(true);

      try {
        const prof = await fetchUserProfile(user.email);
        setProfile(prof);

        if (prof?.resume) setResumeUrl(prof.resume);

        const jobs = await fetchJobs();

        if (prof?.resume && jobs.length !== 0) {
          const mlResults = await sendJobsToML(prof.resume, jobs);
          setInternships(mlResults);
        } else {
          setInternships([]);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setInternships([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.email]);

  // ✅ Filter internships by search term
  const filteredInternships = internships.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.job_title?.toLowerCase().includes(term) ||
      item.company?.toLowerCase().includes(term) ||
      item.location?.toLowerCase().includes(term)
    );
  });
  const appliedJobs = internships.filter(item =>
  item.applicants?.includes(user.email)
);


  return (
    
  <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Sidebar */}
      <TouchableOpacity style={{position:"absolute",padding:15,backgroundColor:"mediumspringgreen",borderRadius:100,bottom:20,right:20,zIndex:15}} onPress={()=>setopenchatbot(true)}>
       <FontAwesome6 name="robot" size={24} color="black" />
      </TouchableOpacity>
      <Sidebar open={open} setopen={setOpen} setopenanalytics={setopenanalytics} openanalytics={openanalytics} openprof={openprof} setopenprof={setopenprof} setopenskillenhance={setopenskillenhance} setaddjobs={setaddjobs}/>
      {/* Navbar */}
{openanalytics && (
  <AnalyticsPage
    openanalytics={openanalytics}
    setopenanalytics={setopenanalytics}
  />
)}
{
  details&&(
<Details details={details} opendetails={opendetails} job={currjob} user={user}></Details>)}
{
  openprof&&(
<UserProfile user={user} openprof={openprof} setopenprof={setopenprof} appliedJobs={appliedJobs}></UserProfile>)}
{
  openskillenhance && (
    <Skilllearn setopenskillenhance={setopenskillenhance} appliedJobs={appliedJobs}></Skilllearn>
  )
}
   {
    addjobs &&(
      <EmployerJobUpload employerId={user.email} setaddjobs={setaddjobs}></EmployerJobUpload>
    )
   }
   {
    openchatbot&&(
      <GeminiChatbot setopenchatbot={setopenchatbot}></GeminiChatbot>
    )
   }
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: "10%",
        }}
      >
        <TouchableOpacity
          style={{ padding: 15, marginLeft: 10, borderRadius: 100 }}
          onPress={() => setOpen(true)}
        >
          <Ionicons name="apps-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 5,
            marginRight: 20,
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          {profile?.profileImage ? (
            <Image
              source={{ uri: `data:image/png;base64,${profile.profileImage}` }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ) : (
            <Ionicons name="person-circle" size={40} color="grey" />
          )}
        </TouchableOpacity>
      </View>

      {/* Header */}
      <Text style={{ fontSize: 50, marginLeft: 20, fontFamily: "lexend" }}>
        Explore !
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginLeft: 25,
          fontFamily: "lexend",
          color: "grey",
        }}
      >
        Find the best jobs for you.
      </Text>

      {/* 🔍 Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(237, 241, 250, 1)",
          borderRadius: 20,
          margin: 20,
          height: 60,
          paddingHorizontal: 10,
        }}
      >
        <Ionicons name="search" size={20} color="#000" />
        <TextInput
          style={{ flex: 1, padding: 10, fontSize: 16 }}
          placeholder="Search for internships..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 15,}}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "lexend",
            marginBottom: 20,
            marginLeft: 10,
          }}
        >
          Recommended
        </Text>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 50 }} />
        ) : filteredInternships.length === 0 ? (
          <Text style={{ fontSize: 18, marginLeft: 20,fontSize:"lexend" }}>
            No internships found.
          </Text>
        ) : (
          filteredInternships.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: 30,
                marginBottom: 15,
                borderWidth: 2,
                borderColor: "rgba(232, 232, 232, 1)",
                flexDirection: "column",
                paddingTop: 14,
              }}
              
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{
                  width: "94%",
                  height: 160,
                  alignSelf: "center",
                  borderRadius: 30,
                }}
                resizeMode="cover"
               
              />
              <View style={{ padding: 12 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#000",
                    fontFamily: "lexend",
                    marginLeft: 5,
                  }}
                >
                  {item.job_title}
                </Text>
                <Text
                  style={{
                    color: "#787878",
                    marginTop: 4,
                    marginLeft: 10,
                    fontFamily: "lexend",
                  }}
                >
                  {item.company}
                </Text>
                <Text
                  style={{
                    color: "#787878",
                    marginTop: 4,
                    marginLeft: 10,
                    fontFamily: "lexend",
                  }}
                >
                  {item.location}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    marginTop: 4,
                    marginLeft: 10,
                    fontFamily: "lexend",
                  }}
                >
                  Match score: {item.match_score}
                </Text>
                <View
                  style={{
                    width: "95%",
                    height: 10,
                    alignSelf: "center",
                    borderRadius: 100,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      width: `${item.match_score}%`,
                      height: "100%",
                      backgroundColor: "dodgerblue",
                      borderRadius: 100,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: "#000",
                    marginTop: 4,
                    marginLeft: 10,
                    fontFamily: "lexend",
                  }}
                >
                  Recommended
                </Text>
                <Text
                  style={{
                    color: "#787878",
                    marginTop: 4,
                    marginLeft: 10,
                    fontFamily: "lexend",
                  }}
                >
                  {item.missing_skills?.join(", ") || "None 🎉"}
                </Text>

                {/* Apply Button */}
              <TouchableOpacity
  style={{
    marginTop: 30,
    backgroundColor: item.applicants?.includes(user.email)
      ? "black" // disable style if already applied
      : "#007bff",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  }}
  disabled={item.applicants?.includes(user.email)} // disable if applied
  onPress={() => applyForJob(item.id, user)}
>
  <Text
    style={{
      color: "white",
      fontSize: 20,
      fontFamily: "lexend",
    }}
  >
    {item.applicants?.includes(user.email) ? "Applied" : "Apply Now"}
  </Text>
</TouchableOpacity>

 <TouchableOpacity
  style={{
    marginTop: 10,
   backgroundColor:"aliceblue",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  }}
 // disable if applied
  onPress={() => handleopendetails(item)}
>
  <Text
    style={{
      color: "black",
      fontSize: 20,
      fontFamily: "lexend",
    }}
  >
    Show more
  </Text>
</TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      
    </View>
  );
}
