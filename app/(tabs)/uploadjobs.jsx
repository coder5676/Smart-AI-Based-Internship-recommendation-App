import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Entypo from '@expo/vector-icons/Entypo';

export default function EmployerJobUpload({ employerId,setaddjobs}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
 const [skills, setSkills] = useState([]); // array of skills
   // for typing skills one by one
  const [domain, setDomain] = useState("");
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
    const [companyName, setCompanyName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !location || skills || !domain || !duration || !stipend) {
      Alert.alert("Error ❌", "Please fill in all fields");
      return;
    }

    const jobData = {
      createdAt: serverTimestamp(), // Firestore timestamp
      title,
      description,
      location,
      skills: skills.split(",").map((s) => s.trim()), // convert CSV to array
      applicants: [], // start empty
      domain,
      duration,
      referenceEmployerId: employerId, // passed from props/session
      stipend,
    };

    try {
      setLoading(true);
      await addDoc(collection(db, "jobs"), jobData);
      Alert.alert("Success ✅", "Job posted successfully!");
      // reset fields
      setTitle("");
      setDescription("");
      setLocation("");
      setSkills("");
      setDomain("");
      setDuration("");
      setStipend("");
    } catch (error) {
      console.error("Error uploading job:", error);
      Alert.alert("Error ❌", "Failed to upload job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{width:"100%",height:"100%",backgroundColor:"white",position:"absolute",top:0,left:0,zIndex:16}}>
        <TouchableOpacity style={{marginTop:50,padding:15,backgroundColor:"whitesmoke",borderRadius:100,alignSelf:"flex-start",marginLeft:10}} onPress={()=>setaddjobs(false)}>
<Entypo name="cross" size={27} color="black" />

        </TouchableOpacity>
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <Text style={{ fontSize: 24, fontFamily:"lexend", marginBottom: 20,marginTop:50 }}>
        Post a New Job
      </Text>
<TextInput
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
        style={styles.input}
      />

      <TextInput
        placeholder="Thumbnail URL"
        value={thumbnailUrl}
        onChangeText={setThumbnailUrl}
        style={styles.input}
      />
      <TextInput
        placeholder="Job Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Job Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <TextInput
        placeholder="Skills (comma separated)"
        value={skills}
        onChangeText={setSkills}
        style={styles.input}
      />

      <TextInput
        placeholder="Domain"
        value={domain}
        onChangeText={setDomain}
        style={styles.input}
      />

      <TextInput
        placeholder="Duration (e.g. 3 months)"
        value={duration}
        onChangeText={setDuration}
        style={styles.input}
      />

      <TextInput
        placeholder="Stipend"
        value={stipend}
        onChangeText={setStipend}
        keyboardType="numeric"
        style={styles.input}
      />
       

      <TouchableOpacity
        style={[styles.button, { backgroundColor: loading ? "gray" : "dodgerblue" }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          {loading ? "Posting..." : "Upload Job"}
        </Text>
      </TouchableOpacity>
    </ScrollView></View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
};
