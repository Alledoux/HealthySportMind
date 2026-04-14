import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { fetchRSS } from "../hooks/fetchRSS";
import { useRouter } from "expo-router";

export default function Dashboard({ user, profile }) {
  const router = useRouter();
  const navigation = useNavigation();

  const [todayCheckIn, setTodayCheckIn] = useState(null);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadLastCheckIn() {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const res = await fetch("http://127.0.0.1:8000/api/checkins/last/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setLastCheckIn(data);
    } catch (err) {
      console.error("Last check-in fetch error:", err);
    }
  }

  async function loadCheckIn() {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const res = await fetch("http://127.0.0.1:8000/api/checkins/today/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTodayCheckIn(data);
    } catch (err) {
      console.error("Check-in fetch error:", err);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const itemsFromFeed = await fetchRSS(
          "https://www.cbssports.com/rss/headlines/"
        );
        setItems(itemsFromFeed || []);
      } catch (err) {
        console.error("RSS fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
    loadCheckIn();
    loadLastCheckIn();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    navigation.replace("index");
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>HealthySportMind</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.welcomeText}>
          Welcome, {profile?.email || user?.email || "Athlete"}
        </Text>

        <Text style={styles.subtitle}>
          You're logged in and ready to go.
        </Text>

        <View style={styles.grid}>
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Your Sport</Text>
            <Text style={styles.cardValue}>
              {profile?.sport || "No sport set"}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Daily Check-In</Text>

            {todayCheckIn?.exists ? (
              <View>
                <Text style={styles.cardSubtitle}>You checked in today!</Text>

                {todayCheckIn.checkin?.post_message && (
                  <Text style={styles.cardSubtitle}>
                    {todayCheckIn.checkin.post_message}
                  </Text>
                )}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.checkInButton}
                onPress={() => router.push("/checkin")}
              >
                <Text style={styles.checkInButtonText}>
                  Complete today's check-in
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Last Check-In</Text>

            {lastCheckIn?.exists ? (
              <>
                <Text style={styles.cardSubtitle}>
                  Mood: {lastCheckIn.checkin.mood}
                </Text>
                <Text style={styles.cardSubtitle}>
                  Stress: {lastCheckIn.checkin.stress}
                </Text>
                <Text style={styles.cardSubtitle}>
                  Energy: {lastCheckIn.checkin.energy}
                </Text>
                <Text style={styles.cardSubtitle}>
                  Sleep: {lastCheckIn.checkin.sleep_hours} hrs
                </Text>
                <Text style={styles.cardSubtitle}>
                  {new Date(lastCheckIn.checkin.created_at).toLocaleString()}
                </Text>
              </>
            ) : (
              <Text style={styles.cardSubtitle}>No check-ins yet</Text>
            )}
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Streaks</Text>
            <Text style={styles.cardSubtitle}>
              Your consistency metrics will appear here.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.newsCard}>
        <Text style={styles.sectionTitle}>Helpful Articles</Text>

        {loading && <Text style={styles.cardSubtitle}>Loading articles...</Text>}

        {!loading &&
          items?.slice(0, 3).map((item) => (
            <View key={item.link} style={styles.articleCard}>
              {item.image && (
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.articleImage}
                    resizeMode="cover"
                  />
                </View>
              )}

              <Text style={styles.articleTitle}>{item.title}</Text>

              <Text style={styles.articleDescription} numberOfLines={3}>
                {item.summary}
              </Text>

              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => Linking.openURL(item.link)}
              >
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    marginRight: 12,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  mainCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 18,
  },
  grid: {
    gap: 14,
  },
  infoCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 16,
    color: "#111827",
  },
  cardSubtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 6,
    lineHeight: 21,
  },
  checkInButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  checkInButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  newsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },
  articleCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
  },
  imageWrapper: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#e5e7eb",
  },
  articleImage: {
    width: "100%",
    height: "100%",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  readMoreButton: {
    backgroundColor: "#111827",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  readMoreText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});