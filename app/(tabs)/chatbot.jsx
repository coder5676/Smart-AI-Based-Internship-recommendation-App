import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import Entypo from "@expo/vector-icons/Entypo";

export default function GeminiChatbot({setopenchatbot}) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your Gemini chatbot 🤖. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const API_KEY = "AIzaSyB6X-DS2XX4eo2W13pkcVE7PbUekn6WYzs"; // 🔑 replace with your key
  const MODEL = "gemini-2.0-flash"; // ✅ using Gemini 2.0 Flash
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post(
        API_URL,
        {
          contents: [
            {
              parts: [{ text: input }],
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const botText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn’t understand.";

      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (error) {
      console.error("Gemini API Error:", error.response?.data || error.message);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ " + (error.response?.data?.error?.message || "API error") },
      ]);
    }
  };

  return (
    <View style={{ width:"100%",height:"100%",position:"absolute",zIndex:16, padding: 20, backgroundColor: "#fff" }}>
         <TouchableOpacity
        style={{
          marginTop: 50,
          padding: 15,
          backgroundColor: "whitesmoke",
          borderRadius: 100,
          alignSelf: "flex-start",
          marginLeft: 10,
        }}
        onPress={() => setopenchatbot(false)}
      >
        <Entypo name="cross" size={27} color="black" />
      </TouchableOpacity>
        <Text style={{padding:15,color:"white",backgroundColor:"dodgerblue",fontFamily:"lexend",borderRadius:100,width:"70%",textAlign:"center",marginTop:40,marginBottom:30}}>Talk to CareerNest Assistant</Text>
      <ScrollView style={{ flex: 1, marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <Text
            key={i}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#eee",
              padding: 8,
              marginVertical: 4,
              borderRadius: 8,
              maxWidth: "80%",
              fontFamily:"lexend",
              fontSize:20
            }}
          >
            {msg.text}
          </Text>
        ))}
      </ScrollView>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 8,
            fontFamily:"lexend",
            fontSize:20,
            marginBottom:20
          }}
        />
        <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, color: "blue",marginBottom:20 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
