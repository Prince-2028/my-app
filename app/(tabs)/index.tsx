import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  SafeAreaView,
  Text,
  Image,
  Button,
  View,
  StyleSheet,
} from "react-native";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://random-data-api.com/api/users/random_user?size=80"
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {users.length > 0 && (
          <>
            <Image
              source={{ uri: users[currentIndex]?.avatar }}
              style={styles.avatar}
            />

            <View style={styles.infoContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{users[currentIndex]?.id}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>UID:</Text>
                <Text style={styles.value}>{users[currentIndex]?.uid}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>First Name:</Text>
                <Text style={styles.value}>
                  {users[currentIndex]?.first_name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Last Name:</Text>
                <Text style={styles.value}>
                  {users[currentIndex]?.last_name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>
                  {users[currentIndex]?.username}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{users[currentIndex]?.email}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Password:</Text>
                <Text style={styles.value}>
                  {users[currentIndex]?.password}
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Previous"
                onPress={() =>
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))
                }
                disabled={currentIndex === 0}
              />
              <Button
                title="Next"
                onPress={() =>
                  setCurrentIndex((prev) =>
                    prev < users.length - 1 ? prev + 1 : prev
                  )
                }
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginTop: 15,
  },
});

export default App;
