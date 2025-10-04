import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { createCheckoutSession } from "../api";

export default function AskScreen() {
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("5");

  const handleSend = async () => {
    try {
      const data = await createCheckoutSession(
        "demo",
        message,
        parseFloat(amount) * 100,
        true
      );
      await WebBrowser.openBrowserAsync(data.url);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Could not start checkout");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ fontSize: 24, marginBottom: 20, textAlign: "center" }}>
            Ask a Question
          </Text>

          <TextInput
            placeholder="Type your question..."
            multiline
            value={message}
            onChangeText={setMessage}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 8,
              height: 120,
              marginBottom: 12,
              textAlignVertical: "top",
            }}
          />

          <TextInput
            placeholder="Tip amount ($)"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 8,
              marginBottom: 20,
            }}
          />

          <Button title="Send & Pay" onPress={handleSend} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
