import React, { useState } from "react";
import {View,Text,TouchableOpacity } from "react-native";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import {auth} from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
export default function Sidebar({open,setopen,setopenanalytics,openanalytics,openprof,setopenprof,setopenskillenhance,setaddjobs}){

     const handleLogout = async () => {
      await signOut(auth);
      setMessage("Logged out 🚪");
      setUser(null)
    };
    return(<>
    <View style={{width:300,maxHeight:"100%",height:"100%",position:"absolute",zIndex:10,top:0,left:0,display:open?"flex":"none",alignItems:"center",backgroundColor:"white"}}>
        <TouchableOpacity style={{marginTop:100,padding:15,backgroundColor:"whitesmoke",borderRadius:100,alignSelf:"flex-start",marginLeft:30}} onPress={()=>setopen(false)}>
<Entypo name="cross" size={27} color="black" />

        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:70,width:"90%",padding:15,borderBottomColor:"lightgrey",borderBottomWidth:1,display:"flex",flexDirection:"row"}}onPress={()=>setopenprof(true)}>
           <AntDesign name="profile" size={24} color="grey" />
            <Text style={{fontSize:20,fontFamily:"lexend",marginLeft:20}}>
                My profile
            </Text>
        </TouchableOpacity>
       
 <TouchableOpacity style={{marginTop:10,width:"90%",padding:15,borderBottomColor:"lightgrey",borderBottomWidth:1,display:"flex",flexDirection:"row"}} onPress={()=>setopenanalytics(true)}>
           <MaterialIcons name="dashboard" size={24} color="grey" />
            <Text style={{fontSize:20,fontFamily:"lexend",marginLeft:20}}>
                Analytics
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:10,width:"90%",padding:15,borderBottomColor:"lightgrey",borderBottomWidth:1,display:"flex",flexDirection:"row"}} onPress={()=>setopenskillenhance(true)}>
   
         <MaterialIcons name="addchart" size={24} color="black" />
            <Text style={{fontSize:20,fontFamily:"lexend",marginLeft:20}}>
               Skill enhance
            </Text>
        </TouchableOpacity>
       <TouchableOpacity style={{marginTop:10,width:"90%",padding:15,borderBottomColor:"lightgrey",borderBottomWidth:1,display:"flex",flexDirection:"row"}} onPress={()=>handleLogout()}>
   
       <MaterialIcons name="admin-panel-settings" size={24} color="black" />
            <Text style={{fontSize:20,fontFamily:"lexend",marginLeft:20}}>
               Logout
            </Text>
        </TouchableOpacity>
    </View>
    </>)
}