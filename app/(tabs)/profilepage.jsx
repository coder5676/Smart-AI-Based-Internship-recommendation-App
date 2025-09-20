import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Linking, TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Entypo from '@expo/vector-icons/Entypo';

export default function UserProfile({ user,setopenprof,appliedJobs}) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "students", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Convert Google Drive share link to direct download link
          if (data.resumedownload) {
            const match = data.resumedownload.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match) {
              data.resumedownload = `https://drive.google.com/uc?export=download&id=${match[1]}`;
            }
          }

          setProfile(data);
        } else {
          console.log("No student profile found.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>No profile found for this user.</Text>
      </View>
    );
  }

  return (
    <View style={{width:"100%",height:"100%",backgroundColor:"white",position:"absolute",top:0,left:0,zIndex:10}}>
 
    
    <ScrollView style={styles.container}>
      {/* Close Button */}
     
 <TouchableOpacity style={{marginTop:50,padding:15,backgroundColor:"whitesmoke",borderRadius:100,alignSelf:"flex-start",marginLeft:10}} onPress={()=>setopenprof(false)}>
<Entypo name="cross" size={27} color="black" />

        </TouchableOpacity>
 
      <View style={styles.header}>
        {profile.profileImage && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${profile.profileImage}` }}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.subText}>{profile.domain}</Text>
      </View>

      {/* Contact Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>
        <Text style={{fontFamily:"lexend",fontSize:20,color:"grey"}}>Email: {profile.email}</Text>
        <Text style={{fontFamily:"lexend",fontSize:20,color:"grey"}}>Phone: {profile.phone}</Text>
        <Text style={{fontFamily:"lexend",fontSize:20,color:"grey"}}>DOB: {profile.dob}</Text>
        <Text style={{fontFamily:"lexend",fontSize:20,color:"grey"}}>Account Created: {profile.createdAt}</Text>
      </View>

      {/* Resume Download */}
      {profile.resumedownload && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(profile.resumedownload)}
        >
          <Text style={styles.buttonText}>Download Resume</Text>
        </TouchableOpacity>
      )}

      {/* Skills */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {profile.skills && profile.skills.length > 0 ? (
            profile.skills.map((skill, idx) => (
              <View key={idx} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))
          ) : (
            <Text>No skills listed</Text>
          )}
        </View>
      </View>

      {/* Education */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Education</Text>
        {profile.education && profile.education.length > 0 ? (
          profile.education.map((edu, idx) => (
            <View key={idx} style={styles.educationItem}>
              <Text style={styles.eduLevel}>{edu.level} - {edu.year}</Text>
              <Text style={styles.eduInstitution}>{edu.institution}</Text>
              <Text>Grade: {edu.grade}</Text>
            </View>
          ))
        ) : (
          <Text>No education data</Text>
        )}
      </View>
       <Text style={styles.cardTitle}>Applied jobs</Text>
{
      appliedJobs.map((item, index) => (
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
          Approved
        </Text>
      </TouchableOpacity>
                    </View>
                  </View>
                ))}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    marginTop: 40,
    padding: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 15,
   
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
  
    color: "#151515ff",
    fontFamily:"lexend"
  },
  subText: {
    fontSize: 16,
    color: "#1d1d1dff",
    marginTop: 2,
    fontFamily:"lexend"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    
  },
  cardTitle: {
    fontSize: 30,
    marginBottom: 10,
    color: "#2d3436",
    fontFamily:"lexend"
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillBadge: {
    backgroundColor: "#e7ebefff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: "#000000ff",
   fontFamily:"lexend",
    fontSize:20
  },
  educationItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ebf2f5ff",
    borderRadius: 10,
  },
  eduLevel: {
    fontFamily:"lexend",
    fontSize: 16,

  },
  eduInstitution: {
    fontSize: 15,
    marginBottom: 2,
    fontFamily:"lexend",

  },
  button: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontFamily:"lexend",
    fontSize: 16,
  },
});
