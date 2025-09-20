import { Image } from 'expo-image';
import { useState,useEffect } from 'react';
import { Text,ScrollView,View,TouchableOpacity,TextInput,ActivityIndicator,Button} from 'react-native';
import loginImage from "../../assets/images/people-18-o.avif";


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {auth} from "./firebaseConfig";
import {db} from "./firebaseConfig";


export default function Loginpage({usertype,setusertype,user,setUser}){

 
  const[email,setemail]=useState("");
  const [password,setpassword]=useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [useradded,setuseradded]=useState(false);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    
      setLoading(false);
    });
    return unsubscribe;
  }, []);

   const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Signup successful ✅");
  
    } catch (error) {
      setMessage(error.message);
      
    }
  };

 const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const currentUser = userCredential.user;

    setUser(currentUser);
    setMessage("Login successful ✅");

    // Make sure checkIfUserExists is defined in this file or passed as prop
  

  } catch (error) {
    setMessage(error.message);
  }
};


  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    setMessage("Logged out 🚪");
    setUser(null)
  };

   if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }




    return(
       <View style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",width:"100%",height:"100%",backgroundColor:"white"}}>
        <Image
       source={loginImage}
        style={{ width: "100%", height: "35%", resizeMode: "contain" }}
      />
      <Text style={{fontFamily:"lexend",fontSize:40,textAlign:"center"}}>{user?"Select your role":"CareerNest"}</Text>
      <Text>{message}</Text>
     
      <View style={{width:"100%",height:"30%",display:user?"none":"flex",alignItems:"center",justifyContent:"space-around"}}>
    <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:10,borderRadius:20
      }}>Email</Text>

      <TextInput style={{
        width:"90%",
        height:80,
        borderWidth:1,
        borderColor:"dodgerblue",
      
        borderRadius:20,
        fontSize:25,
        paddingHorizontal:20,
        fontFamily:"lexend"
      }}
      placeholder='example123@gmail.com '
      value={email}
      onChangeText={setemail}>

      </TextInput>

      <Text style={{fontSize:20,fontFamily:"lexend",alignSelf:"flex-start",
      marginLeft:"5%",padding:10,borderRadius:20
      }}>Password</Text>

      <TextInput style={{
        width:"90%",
        height:80,
        borderWidth:1,
        borderColor:"dodgerblue",
        borderRadius:20,
        fontSize:25,
        paddingHorizontal:20,
        fontFamily:"lexend"
      }}
      placeholder='•••••••••'
      secureTextEntry={true}
      value={password}

      onChangeText={setpassword}>

      </TextInput>
      </View>
      <TouchableOpacity style={{width:"90%",borderRadius:30,backgroundColor:"rgba(57, 116, 255, 1)",padding:20,display:user?"none":"flex",marginTop:20}} onPress={()=>handleSignup()}>
        <Text style={{fontSize:20,fontFamily:"lexend",color:"white",textAlign:"center"}}>Register</Text>
      </TouchableOpacity>
       <TouchableOpacity style={{width:"90%",borderRadius:30,backgroundColor:"rgba(230, 238, 255, 1)",padding:20,display:user?"none":"flex",marginTop:20}} onPress={()=>handleLogin()}>
        <Text style={{fontSize:20,fontFamily:"lexend",color:"black",textAlign:"center"}}>Login</Text>
      </TouchableOpacity>


      <View style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",width:"100%",height:"50%",backgroundColor:"white"}}>
      
             
                   
             
            </View>
      
       </View>
 
    )
  }