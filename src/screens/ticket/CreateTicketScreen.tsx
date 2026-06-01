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

import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
export default function CreateTicketScreen() {
  const route = useRoute<any>();
  const editTicket = route.params?.editTicket;
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState(editTicket?.title || "");
  const [description, setDescription] = useState(editTicket?.description || "");
  const [priority, setPriority] = useState(editTicket?.priority || "Medium");
  const dispatch = useDispatch();

  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  console.log(tickets);

  useEffect(() => {
    const saveTickets = async () => {
      await AsyncStorage.setItem("tickets", JSON.stringify(tickets));
    };
    saveTickets();
  }, [tickets]);

  const handleCreateTicket = () => {
    if (!title || !description || !priority) {
      Alert.alert("Error", "Fill all fileds");
      return;
    }

    const newTicket = {
      id: Date.now(),
      title,
      description,
      priority,
      status: "Open",
    };

    if (editTicket) {
      dispatch(
        updateTicket({
          ...editTicket,
          title,
          description,
          priority,
        }),
      );
    } else {
      dispatch(addTicket(newTicket));
    }
    Alert.alert(
      "Success",
      editTicket
        ? "Ticket updated successfully"
        : "Ticket created successfully",
    );

    setTitle("");
    setDescription("");
    setPriority("");
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

      <TextInput
        placeholder="Priority (Low/Medium/High)"
        style={styles.input}
        value={priority}
        onChangeText={setPriority}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateTicket}>
        <Text style={styles.buttonText}>Create Ticket</Text>
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
});
