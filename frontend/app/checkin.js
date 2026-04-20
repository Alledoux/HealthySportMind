import React, { useState } from "react";
import { submitCheckIn } from "../services/api/checkinApi";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = await submitCheckIn({
        mood,
        stress,
        energy,
        sleep_hours: sleepHours,
        notes,
      });

      if (data.error) {
        Toast.show({
          type: "error",
          text1: "Check-In Failed",
          text2: data.error,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Check-in submitted!",
      });

      router.replace("/dashboard");
    } catch (err) {
      console.log("CHECK-IN ERROR:", err);

      let message = "Check-in failed.";

      if (typeof err === "object" && err !== null) {
        const firstKey = Object.keys(err)[0];
        const firstValue = err[firstKey];

        if (Array.isArray(firstValue)) {
          message = firstValue[0];
        } else if (typeof firstValue === "string") {
          message = firstValue;
        }
      }

      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f5f7fa" }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 18,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 8 }}>
          Daily Check-In
        </Text>

        <Text style={{ color: "#6b7280", marginBottom: 24 }}>
          Let us know how you are feeling today.
        </Text>

        {/* Mood */}
        <View
          style={{
            marginBottom: 20,
            padding: 12,
            backgroundColor: "#f9fafb",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "600", marginBottom: 8 }}>
            Mood
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={mood}
            onValueChange={setMood}
          />
          <Text style={{ color: "#6b7280", marginTop: 10 }}>
            Value: {mood}
          </Text>
        </View>

        {/* Stress */}
        <View
          style={{
            marginBottom: 20,
            padding: 12,
            backgroundColor: "#f9fafb",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "600", marginBottom: 8 }}>
            Stress
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={stress}
            onValueChange={setStress}
          />
          <Text style={{ color: "#6b7280", marginTop: 10 }}>
            Value: {stress}
          </Text>
        </View>

        {/* Energy */}
        <View
          style={{
            marginBottom: 20,
            padding: 12,
            backgroundColor: "#f9fafb",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "600", marginBottom: 8 }}>
            Energy
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={energy}
            onValueChange={setEnergy}
          />
          <Text style={{ color: "#6b7280", marginTop: 10 }}>
            Value: {energy}
          </Text>
        </View>

        {/* Sleep Hours */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", marginBottom: 8 }}>
            Sleep Hours
          </Text>
          <TextInput
            placeholder="e.g. 7.5"
            keyboardType="numeric"
            value={sleepHours}
            onChangeText={setSleepHours}
            style={{
              borderWidth: 1,
              borderColor: "#d1d5db",
              backgroundColor: "#f9fafb",
              padding: 12,
              borderRadius: 10,
            }}
          />
        </View>

        {/* Notes */}
        <View style={{ marginBottom: 28 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", marginBottom: 8 }}>
            Notes
          </Text>
          <TextInput
            placeholder="How are you feeling today?"
            value={notes}
            onChangeText={setNotes}
            multiline
            style={{
              borderWidth: 1,
              borderColor: "#d1d5db",
              backgroundColor: "#f9fafb",
              padding: 12,
              borderRadius: 10,
              height: 120,
              textAlignVertical: "top",
            }}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: "#007AFF",
            paddingVertical: 16,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
            {loading ? "Submitting..." : "Submit Check-In"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}