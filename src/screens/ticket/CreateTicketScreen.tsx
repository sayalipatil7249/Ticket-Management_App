import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { addTicket, updateTicket } from "../../store/slices/ticketSlice";
import { Picker } from "@react-native-picker/picker";

import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
export default function CreateTicketScreen() {
  const route = useRoute<any>();
  const editTicket = route.params?.editTicket;
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState("");
  // const isEditing = !!route.params?.editTicket;
  const [isEditing, setIsEditing] = useState(false);
const [description, setDescription] = useState("");
const [priority, setPriority] = useState("Medium");
  const dispatch = useDispatch();

  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  console.log(tickets);

  useEffect(() => {
    const saveTickets = async () => {
      await AsyncStorage.setItem("tickets", JSON.stringify(tickets));
    };
    saveTickets();
  }, [tickets]);
  useEffect(() => {
  if (editTicket) {
    setIsEditing(true);

    setTitle(editTicket.title);
    setDescription(editTicket.description);
    setPriority(editTicket.priority);
  } else {
    setIsEditing(false);

    setTitle("");
    setDescription("");
    setPriority("Medium");
  }
}, [editTicket]);

useEffect(() => {
  const unsubscribe = navigation.addListener("focus", () => {
    if (!route.params?.editTicket) {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
  });

  return unsubscribe;
}, [navigation, route.params]);

const handleCreateTicket = () => {
  if (!title || !description || !priority) {
    Alert.alert("Error", "Fill all fields");
    return;
  }

  if (isEditing) {
    dispatch(
      updateTicket({
        ...editTicket,
        title,
        description,
        priority,
      }),
    );

    Alert.alert("Success", "Ticket updated successfully");

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setIsEditing(false);

    navigation.navigate("Dashboard");

    return;
  }

  const newTicket = {
  id: Date.now(),
  title,
  description,
  priority,
  status: "Open",
  createdAt: new Date().toLocaleString(),
};

  dispatch(addTicket(newTicket));

  Alert.alert("Success", "Ticket created successfully");

  setTitle("");
  setDescription("");
  setPriority("Medium");

  navigation.navigate("Dashboard");
};

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>
        {editTicket ? "Update Ticket" : "Create Ticket"}
      </Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      {/* <TextInput
        placeholder="Priority (Low/Medium/High)"
        style={styles.input}
        value={priority}
        onChangeText={setPriority}
      /> */}
      <View style={styles.pickerContainer}>
  <Picker
    selectedValue={priority}
    onValueChange={(itemValue) => setPriority(itemValue)}
  >
    <Picker.Item label="Low" value="Low" />
    <Picker.Item label="Medium" value="Medium" />
    <Picker.Item label="High" value="High" />
  </Picker>
</View>
      <TouchableOpacity style={styles.button} onPress={handleCreateTicket}>
        <Text style={styles.buttonText}>
  {isEditing ? "Update Ticket" : "Create Ticket"}
</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },

  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  pickerContainer: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  marginBottom: 15,
},
});
