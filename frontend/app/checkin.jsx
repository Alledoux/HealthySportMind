import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function CheckInScreen() {
  const router = useRouter();

  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleepHours, setSleepHours] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const submitCheckIn = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("accessToken");

      const res = await fetch("http://127.0.0.1:8000/api/checkins/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mood,
          stress,
          energy,
          sleep_hours: sleepHours,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Toast.show({
          type: "error",
          text1: "Check-In Failed",
          text2: data.error || "Try again later.",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Check-in submitted!",
      });

      router.replace("/dashboard");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong.",
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Daily Check-In</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Mood</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={mood}
            onValueChange={setMood}
          />
          <Text style={styles.valueText}>Value: {mood}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Stress</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={stress}
            onValueChange={setStress}
          />
          <Text style={styles.valueText}>Value: {stress}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Energy</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={energy}
            onValueChange={setEnergy}
          />
          <Text style={styles.valueText}>Value: {energy}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Sleep Hours</Text>
          <TextInput
            placeholder="e.g. 7.5"
            keyboardType="numeric"
            value={sleepHours}
            onChangeText={setSleepHours}
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            placeholder="How are you feeling today?"
            value={notes}
            onChangeText={setNotes}
            multiline
            style={styles.notesInput}
          />
        </View>

        <TouchableOpacity
          onPress={submitCheckIn}
          disabled={loading}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Submitting..." : "Submit Check-In"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#111827",
  },
  section: {
    marginBottom: 22,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },
  valueText: {
    marginTop: 4,
    fontSize: 15,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
});