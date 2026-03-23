import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    flex: 1,
  },

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 18,
  },

  welcome: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: 20,
    fontSize: 15,
  },

  grid: {
    flexDirection: "column",
    gap: 14,
  },

  infoCard: {
    backgroundColor: "#f9fafb",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    width: "100%",
  },

  cardTitle: {
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 17,
  },

  cardValue: {
    fontSize: 18,
    color: "#111827",
  },

  cardSubtitle: {
    color: "#6b7280",
    fontSize: 15,
    lineHeight: 22,
  },

  newsCard: {
    marginTop: 4,
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },

  articleCard: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 20,
  },

  articleImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },

  articleTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    lineHeight: 28,
  },

  articleDescription: {
    color: "#6b7280",
    marginBottom: 12,
    fontSize: 15,
    lineHeight: 22,
  },

  readMoreButton: {
    alignSelf: "flex-start",
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  readMoreText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  imageWrapper: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },

  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  logoutText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },

  checkInButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },

  checkInButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});