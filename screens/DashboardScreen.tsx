import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function DashboardScreen() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [signedIn, setSignedIn] = useState(false);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    setSignedIn(true);
  };

  useEffect(() => {
    const handle = "demo";
    const q = query(
      collection(db, "questions"),
      where("creator_handle", "==", handle),
      orderBy("amount", "desc")
    );
    const unsub = onSnapshot(q, (snap) =>
      setQuestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {!signedIn ? (
        <Button title="Sign in with Google" onPress={handleLogin} />
      ) : (
        <>
          <Text style={{ fontSize: 24, marginBottom: 10 }}>Dashboard</Text>
          <FlatList
            data={questions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Text>{item.message_text}</Text>
                <Text>Tip: ${(item.amount / 100).toFixed(2)}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}
