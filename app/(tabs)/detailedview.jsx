import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig"; // your Firebase config file

export default function Details({ details, opendetails, job,user }) {
  console.log("currentjob", job);

  if (!job) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "lexend", fontSize: 20 }}>
          No job selected
        </Text>
      </View>
    );
  }
const saveJobForStudent = async (jobId) => {
  try {
    const studentRef = doc(db, "students", user.email); // points to student's document
    await updateDoc(studentRef, {
      savedJobs: arrayUnion(jobId), // adds jobId to array if not already present
    });
    console.log("Job saved successfully!");
  } catch (error) {
    console.error("Error saving job: ", error);
  }
};

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        display: details ? "flex" : "none",
      }}
    >
      {/* Close Button */}
      <TouchableOpacity
        style={{
          marginTop: 50,
          padding: 15,
          backgroundColor: "whitesmoke",
          borderRadius: 100,
          alignSelf: "flex-start",
          marginLeft: 30,
        }}
        onPress={() => opendetails(false)}
      >
        <Entypo name="cross" size={27} color="black" />
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: "rgba(228, 234, 240, 1)",
          marginRight: 20,
          borderRadius: 100,
          width: 55,
          position: "absolute",
          right: 20,
          top: 50,
        }}
        onPress={()=>saveJobForStudent(job.id)}
      >
        <Feather name="save" size={24} color="black" />
      </TouchableOpacity>

      {/* Content */}
      <ScrollView
        style={{
          width: "100%",
          minHeight: "90%",
          backgroundColor: "white",
          flexDirection: "column",
        }}
      >
        {/* Top Card */}
        <View
          style={{
            width: "90%",
            minHeight: 340,
            marginTop: 20,
            alignSelf: "center",
            borderRadius: 30,
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "lexend",
              fontSize: 20,
              color: "black",
              alignSelf: "center",
              marginBottom: 20,
            }}
          >
            Job Details
          </Text>

          <Image
            source={{ uri: job.thumbnail }}
            style={{
              width: 120,
              height: 120,
              backgroundColor: "black",
              alignSelf: "center",
              borderRadius: 100,
            }}
          />

          <Text
            style={{
              fontFamily: "lexend",
              fontSize: 30,
              color: "black",
              alignSelf: "center",
            }}
          >
            {job.job_title}
          </Text>

          <Text
            style={{
              fontFamily: "lexend",
              fontSize: 20,
              alignSelf: "center",
              padding: 15,
              backgroundColor: "aliceblue",
              color: "black",
              borderRadius: 100,
            }}
          >
            {job.stipend || "Not specified"}
          </Text>

          <Text
            style={{
              fontFamily: "lexend",
              fontSize: 20,
              color: "grey",
              alignSelf: "center",
            }}
          >
            {job.company}
          </Text>
        </View>

        {/* Posted On */}
        <Text
          style={{
            fontFamily: "lexend",
            fontSize: 30,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          Posted On
        </Text>
       <Text style={{ fontFamily: "comfortaa", fontSize: 18, marginLeft: 30 }}>
  {job.createdAt?.toDate
    ? job.createdAt.toDate().toLocaleDateString("en-US", {
        weekday: "long",  // e.g. Monday
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"}
</Text>

        {/* Job Overview */}
        <Text
          style={{
            fontFamily: "lexend",
            fontSize: 30,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          Job Overview
        </Text>
        <Text
          style={{
            fontFamily: "comfortaa",
            fontSize: 20,
            color: "grey",
            marginLeft: 30,
            marginRight: 20,
            marginTop: 10,
            lineHeight: 30,
          }}
        >
          {job.description}
        </Text>

        {/* Skills */}
        <Text
          style={{
            fontFamily: "lexend",
            fontSize: 30,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          Skills Required
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 20 }}>
          {job.skills?.map((skill, idx) => (
            <Text
              key={idx}
              style={{
                fontFamily: "comfortaa",
                fontSize: 18,
                paddingHorizontal: 12,
                paddingVertical: 6,
                margin: 5,
                backgroundColor: "#e6f0ff",
                borderRadius: 20,
              }}
            >
              {skill}
            </Text>
          ))}
        </View>

        {/* Domain */}
        <Text
          style={{
            fontFamily: "lexend",
            fontSize: 30,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          Domain
        </Text>
        <Text style={{ fontFamily: "comfortaa", fontSize: 20, marginLeft: 30 }}>
          {job.domain}
        </Text>

        {/* Duration */}
        <Text
          style={{
            fontFamily: "lexend",
            fontSize: 30,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          Duration
        </Text>
        <Text style={{ fontFamily: "comfortaa", fontSize: 20, marginLeft: 30 }}>
          {job.duration}
        </Text>

        {/* Location */}
        <Text
          style={{
            fontFamily: "lexend",
            fontSize: 30,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          Location
        </Text>
        <Text style={{ fontFamily: "comfortaa", fontSize: 20, marginLeft: 30 }}>
          {job.location}
        </Text>

        {/* Reference Employer ID */}
        <Text
          style={{
            fontFamily: "lexend",
            fontSize: 30,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          Reference Employer ID
        </Text>
        <Text style={{ fontFamily: "comfortaa", fontSize: 20, marginLeft: 30 }}>
          {job["reference"]}
        </Text>

        {/* Applicants */}
        <Text
          style={{
            fontFamily: "lexend",
            fontSize: 30,
            marginLeft: 30,
            marginTop: 30,
          }}
        >
          Applicants
        </Text>
        <Text style={{ fontFamily: "comfortaa", fontSize: 20, marginLeft: 30 }}>
          {job.applicants?.length || 0} applied
        </Text>

        {/* Apply Button */}
        <TouchableOpacity
          style={{
            padding: 15,
            width: "90%",
            alignSelf: "center",
            backgroundColor: "rgba(22, 108, 255, 1)",
            marginTop: 30,
            marginBottom: 30,
            borderRadius: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
            Apply Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
