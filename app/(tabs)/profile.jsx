import React, { useState } from "react";
import {Image} from 'expo-image';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert ,Button} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import stuImage from "../../assets/images/job.jpg";
import profImage from "../../assets/images/proffessionals.jpg";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {db} from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
export default function Studentprofile({usertype,user,setusertype}) {
  const [name, setName] = useState("");
  
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState([]);
  const [domain, setDomain] = useState("");
  const [resume, setResume] = useState(null);
  const[location,setlocation]=useState("");
  const[desc,setdesc]=useState("");
const [dob,setDob]=useState("");
  const [profileImage, setProfileImage] = useState(null); // base64
const [preview, setPreview] = useState(null); // preview for UI
const [education, setEducation] = useState([]);
const [website,setwebsite]=useState("");
 const pickImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: false,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    const fileInfo = await FileSystem.getInfoAsync(file.uri);

    // ✅ 500 KB size check
    if (fileInfo.size > 512000) {
      Alert.alert("File too large", "Please select an image under 500 KB.");
      return;
    }

    // ✅ Convert to base64
    const base64Data = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    setProfileImage(base64Data); // save for DB
    setPreview(file.uri); // preview in UI

    console.log("✅ Profile image ready:", base64Data.substring(0, 50) + "...");
  } catch (error) {
    console.error("❌ Error picking image:", error);
  }
};




  const addEducation = () => {
    setEducation([...education, { level: "", institution: "", year: "", grade: "" }]);
  };
 const addSkill = () => {
  setSkills([...skills, ""]);
};

// Update skill text
const updateSkill = (index, value) => {
  const updated = [...skills];
  updated[index] = value;
  setSkills(updated);
};
  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

async function saveprofile() {
  if (!user) {
    Alert.alert("Error", "User not found");
    return;
  }
  if (!name || !phone || !dob || !domain || !resume || !profileImage || education.length === 0) {
    Alert.alert("Incomplete Profile", "Please fill all the fields before saving.");
    return;
  }

  // Optional: Check each education entry
  for (let i = 0; i < education.length; i++) {
    const edu = education[i];
    if (!edu.level || !edu.institution || !edu.year || !edu.grade) {
      Alert.alert("Incomplete Education", `Please fill all fields for education #${i + 1}`);
      return;
    }
  }

  // Optional: Check skills if required



    // ✅ Proceed to save profile in Firestore/DB
    Alert.alert("Profile Saved", "Your profile has been saved successfully.");

  try {
    const userData = {
      name,
      email: user.email,
      phone,
      skills,
      domain,
      resume,
      education,
      dob,
      savedjobs:[],
      profileImage,
      usertype,
      jobsapplied:[],
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "students", user.email), userData);

    Alert.alert("Success", "Profile saved successfully!");
  } catch (error) {
    console.error("Error saving profile:", error);
    Alert.alert("Error", error.message);
  }
}


async function savecompanyprofile() {
  if (!user) {
    Alert.alert("Error", "User not found");
    return;
  }
 



  // Optional: Check skills if required



    // ✅ Proceed to save profile in Firestore/DB
    Alert.alert("Profile Saved", "Your profile has been saved successfully.");

  try {
    const userData = {
      name,
      email: user.email,
      phone,
      domain,
      location,
      description:desc,
      profileImage,
      website,
      jobsposted:[],
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "recruiters", user.email), userData);

    Alert.alert("Success", "Profile saved successfully!");
  } catch (error) {
    console.error("Error saving profile:", error);
    Alert.alert("Error", error.message);
  }
}

  return (<>
  <View style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",width:"100%",height:"100%",backgroundColor:"white"}}>
        
      <Text style={{fontFamily:"lexend",fontSize:20,padding:15,backgroundColor:"rgba(225, 239, 247, 1)",textAlign:"left",marginLeft:20,alignSelf:"flex-start",borderRadius:100,marginTop:50}}>Set your profile</Text>
      <View style={{width:"100%",height:"20%",display:"flex",alignItems:"center"}} >
             <TouchableOpacity style={{width:"90%",borderRadius:30,backgroundColor:"rgba(57, 116, 255, 1)",padding:20,marginBottom:20,marginTop:20}} onPress={()=>setusertype("student")}>
              <Text style={{fontSize:20,fontFamily:"lexend",color:"white",textAlign:"center"}}>Job seeker / Student</Text>
            </TouchableOpacity>
            
      <TouchableOpacity style={{width:"90%",borderRadius:30,backgroundColor:"rgba(57, 116, 255, 1)",padding:20}} onPress={()=>setusertype("recruiter")}>
              <Text style={{fontSize:20,fontFamily:"lexend",color:"white",textAlign:"center"}} >Employer</Text>
            </TouchableOpacity>
              
            </View>
     <ScrollView style={{width:"100%",minHeight:"68%",display:usertype==="student"?"flex":"none"}}>

     <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:12,backgroundColor:"white",borderRadius:20,marginTop:20,marginBottom:10
      }}>Name</Text>

      <TextInput style={{
        width:"90%",
        height:70,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"dodgerblue",
        borderRadius:20,
        fontSize:25,
        paddingHorizontal:20,
        fontFamily:"lexend",
        alignSelf:"center"
      }}
      onChangeText={setName}
      placeholder='Your full name'>

      </TextInput>
      <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:12,backgroundColor:"white",borderRadius:20,marginTop:20,marginBottom:10
      }}>Phone no</Text>

      <TextInput style={{
        width:"90%",
        height:70,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"dodgerblue",
        borderRadius:20,
        fontSize:25,
        paddingHorizontal:20,
        fontFamily:"lexend",
        alignSelf:"center"

      }}
      onChangeText={setPhone}
      placeholder='+91- '
      keyboardType="numeric">

      </TextInput>
<Text style={{
  fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
  marginLeft:"5%",padding:12,backgroundColor:"white",
  borderRadius:20,marginTop:20,marginBottom:10
}}>
  Profile Image
</Text>

<TouchableOpacity
  style={{
    width:"90%",borderRadius:10,
    backgroundColor:"rgba(217, 222, 232, 1)",
    padding:20,alignSelf:"center",marginBottom:10
  }}
  onPress={pickImage}
>
  <Text style={{fontSize:18,fontFamily:"lexend",textAlign:"center"}}>
    {preview ? "Change Image" : "Upload Image"}
  </Text>
</TouchableOpacity>

{preview && (
  <Image
    source={{ uri: preview }}
    style={{ width: 120, height: 120, borderRadius: 60, alignSelf:"center" }}
  />
)}

        <Text style={{
  fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
  marginLeft:"5%",padding:12,backgroundColor:"white",
  borderRadius:20,marginTop:20,marginBottom:10
}}>
  Date of Birth
</Text>

<TextInput
  style={{
    width:"90%",
    height:70,
    backgroundColor:"white",
    borderWidth:1,
    borderColor:"dodgerblue",
    borderRadius:20,
    fontSize:25,
    paddingHorizontal:20,
    fontFamily:"lexend",
    alignSelf:"center",
    marginTop:10
  }}
  placeholder="YYYY-MM-DD"
  value={dob}
  keyboardType="numeric"
  onChangeText={setDob}
/>


  <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:12,backgroundColor:"white",borderRadius:20,marginTop:20,marginBottom:10
      }}>Education</Text>

      {education.map((edu, index) => (
        <View key={index} style={{ marginBottom: 20, padding: 10, borderRadius: 8,alignSelf:"center",width:"90%",borderBottomColor:"lightgrey",borderBottomWidth:2,paddingBottom:40 }}>
          <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",padding:12,backgroundColor:"whitesmoke",borderRadius:20,marginTop:20,marginBottom:10
      }}>Level</Text>
          <TextInput
            placeholder="10th / 12th / B.Sc"
            value={edu.level}
            onChangeText={(text) => updateEducation(index, "level", text)}
            style={{ borderBottomWidth: 1, marginBottom: 10,borderBottomColor:"dodgerblue",fontSize:20}}
          />

             <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      padding:12,backgroundColor:"whitesmoke",borderRadius:20,marginTop:20,marginBottom:10
      }}>Institution</Text>
          <TextInput
            placeholder="School / College Name"
            value={edu.institution}
            onChangeText={(text) => updateEducation(index, "institution", text)}
            style={{ borderBottomWidth: 1, marginBottom: 10,borderBottomColor:"dodgerblue",fontSize:20 }}
          />

            <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
     padding:12,backgroundColor:"whitesmoke",borderRadius:20,marginTop:20,marginBottom:10
      }}>Year</Text>
          <TextInput
            placeholder="2022"
            value={edu.year}
            onChangeText={(text) => updateEducation(index, "year", text)}
            keyboardType="numeric"
            style={{ borderBottomWidth: 1, marginBottom: 10,borderBottomColor:"dodgerblue",fontSize:20 }}
          />

             <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      padding:12,backgroundColor:"whitesmoke",borderRadius:20,marginTop:20,marginBottom:10
      }}>Grade / Percentage</Text>
          <TextInput
            placeholder="85%"
            value={edu.grade}
            onChangeText={(text) => updateEducation(index, "grade", text)}
            style={{ borderBottomWidth: 1,borderBottomColor:"dodgerblue",fontSize:20 }}
          />

        </View>
      ))}
 <TouchableOpacity style={{width:"90%",borderRadius:10,backgroundColor:"rgba(57, 116, 255, 1)",padding:20,display:"flex",alignSelf:"center"}} onPress={()=>addEducation()}>
        <Text style={{fontSize:20,fontFamily:"lexend",color:"white",textAlign:"center"}}>Add education</Text>
      </TouchableOpacity>


     <Text style={{
  fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
  marginLeft:"5%",padding:12,backgroundColor:"white",
  borderRadius:20,marginTop:20,marginBottom:10
}}>
 Skills
</Text>

{skills.map((skill, index) => (
  <View
    key={index}
    style={{
      marginBottom: 20,
      padding: 10,
      borderRadius: 8,
      alignSelf: "center",
      width: "90%",
     
      paddingBottom: 10,
    }}
  >
    <TextInput
      placeholder="e.g. Web Development"
      value={skill}
      onChangeText={(text) => updateSkill(index, text)}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "dodgerblue",
        fontSize: 20,
        fontFamily:"lexend"
      }}
    />
  </View>
))}

<TouchableOpacity
  style={{
    width: "90%",
    borderRadius: 10,
    backgroundColor: "rgba(57, 116, 255, 1)",
    padding: 20,
    alignSelf: "center",
  }}
  onPress={addSkill}
>
  <Text style={{ fontSize: 20, color: "white", textAlign: "center",fontFamily:"lexend" }}>
    Add Skill
  </Text>
</TouchableOpacity>

  <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:12,backgroundColor:"white",borderRadius:20,marginTop:20,marginBottom:10
      }}>Job Domain</Text>

      <TextInput style={{
        width:"90%",
        height:70,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"dodgerblue",
        borderRadius:20,
        fontSize:25,
        paddingHorizontal:20,
        fontFamily:"lexend",
        alignSelf:"center"

      }}
      placeholder='Technology, Business or Healthcare'
      keyboardType="text"
      onChangeText={setDomain}>

      </TextInput>
       <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:12,backgroundColor:"white",borderRadius:20,marginTop:20,marginBottom:10
      }}>Resume PDF url</Text>
   <TextInput style={{
        width:"90%",
        height:70,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"dodgerblue",
        borderRadius:20,
        fontSize:25,
        paddingHorizontal:20,
        fontFamily:"lexend",
        alignSelf:"center"

      }}
      placeholder='Google drive url'
      keyboardType="text"
      onChangeText={setResume}>

      </TextInput>
  

    <TouchableOpacity style={{width:"90%",borderRadius:30,backgroundColor:"rgba(57, 116, 255, 1)",padding:20,display:"flex",alignSelf:"center",marginTop:30,marginBottom:60}} onPress={()=>saveprofile()}
     >
        <Text style={{fontSize:20,fontFamily:"lexend",color:"white",textAlign:"center"}}>Save profile</Text>
    </TouchableOpacity>

    </ScrollView>
     



 <ScrollView style={{width:"100%",minHeight:"68%",display:usertype==="recruiter"?"flex":"none"}}>
     <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:12,backgroundColor:"white",borderRadius:20,marginTop:20,marginBottom:10
      }}>Company Name</Text>

      <TextInput style={{
        width:"90%",
        height:70,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"dodgerblue",
        borderRadius:20,
        fontSize:25,
        paddingHorizontal:20,
        fontFamily:"lexend",
        alignSelf:"center"
      }}
      onChangeText={setName}
      placeholder='Your full name'>

      </TextInput>
      <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:12,backgroundColor:"white",borderRadius:20,marginTop:20,marginBottom:10
      }}>Organisation contact</Text>

      <TextInput style={{
        width:"90%",
        height:70,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"dodgerblue",
        borderRadius:20,
        fontSize:25,
        paddingHorizontal:20,
        fontFamily:"lexend",
        alignSelf:"center"

      }}
      onChangeText={setPhone}
      placeholder='+91- '
      keyboardType="numeric">

      </TextInput>
<Text style={{
  fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
  marginLeft:"5%",padding:12,backgroundColor:"white",
  borderRadius:20,marginTop:20,marginBottom:10
}}>
  Logo
</Text>

<TouchableOpacity
  style={{
    width:"90%",borderRadius:10,
    backgroundColor:"rgba(217, 222, 232, 1)",
    padding:20,alignSelf:"center",marginBottom:10
  }}
  onPress={pickImage}
>
  <Text style={{fontSize:18,fontFamily:"lexend",textAlign:"center"}}>
    {preview ? "Change Image" : "Upload Image"}
  </Text>
</TouchableOpacity>

{preview && (
  <Image
    source={{ uri: preview }}
    style={{ width: 120, height: 120, borderRadius: 60, alignSelf:"center" }}
  />
)}

        <Text style={{
  fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
  marginLeft:"5%",padding:12,backgroundColor:"white",
  borderRadius:20,marginTop:20,marginBottom:10
}}>
 Indsutry type
</Text>

<TextInput
  style={{
    width:"90%",
    height:70,
    backgroundColor:"white",
    borderWidth:1,
    borderColor:"dodgerblue",
    borderRadius:20,
    fontSize:25,
    paddingHorizontal:20,
    fontFamily:"lexend",
    alignSelf:"center",
    marginTop:10
  }}
  placeholder="eg. IT, Finance, Marketing"
  value={domain}
  keyboardType="text"
  onChangeText={setDomain}
/>

   <Text style={{
  fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
  marginLeft:"5%",padding:12,backgroundColor:"white",
  borderRadius:20,marginTop:20,marginBottom:10
}}>
 Location
</Text>

<TextInput
  style={{
    width:"90%",
    height:70,
    backgroundColor:"white",
    borderWidth:1,
    borderColor:"dodgerblue",
    borderRadius:20,
    fontSize:25,
    paddingHorizontal:20,
    fontFamily:"lexend",
    alignSelf:"center",
    marginTop:10
  }}
  placeholder="eg. Alpha 1 Greater noida"
  value={location}
  keyboardType="text"
  onChangeText={setlocation}
/>


 
    

  <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:12,backgroundColor:"white",borderRadius:20,marginTop:20,marginBottom:10
      }}>Description</Text>

      <TextInput style={{
        width:"90%",
        height:300,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"dodgerblue",
        borderRadius:20,
        fontSize:20,
        paddingHorizontal:20,
        fontFamily:"lexend",
        alignSelf:"center"

      }}
      placeholder='Make it short under 200 words'
      keyboardType="text"
      onChangeText={setdesc}>

      </TextInput>
       <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:12,backgroundColor:"white",borderRadius:20,marginTop:20,marginBottom:10
      }}>Company LinkedIn/Website url</Text>
   <TextInput style={{
        width:"90%",
        height:70,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"dodgerblue",
        borderRadius:20,
        fontSize:25,
        paddingHorizontal:20,
        fontFamily:"lexend",
        alignSelf:"center"

      }}
      placeholder='Website/Linkedin profile url'
      keyboardType="text"
      onChangeText={setwebsite}>

      </TextInput>
  

    <TouchableOpacity style={{width:"90%",borderRadius:30,backgroundColor:"rgba(57, 116, 255, 1)",padding:20,display:"flex",alignSelf:"center",marginTop:30,marginBottom:60}} onPress={()=>savecompanyprofile()}
     >
        <Text style={{fontSize:20,fontFamily:"lexend",color:"white",textAlign:"center"}}>Save profile</Text>
    </TouchableOpacity>

    </ScrollView>
    </View>
    
   
    </>
  );
}
