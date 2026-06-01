import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import {
  updateTicketStatus,
  deleteTicket,
} from "../../store/slices/ticketSlice";
import { useState } from "react";

export default function TicketDetailsScreen() {
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const { ticket } = route.params;
  const [currentStatus, setCurrentStatus] = useState(ticket.status || "Open");

  const changeStatus = () => {
    let newStatus = "Open";
    if (currentStatus === "Open") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Closed";
    }

    dispatch(
      updateTicketStatus({
        id: ticket?.id,
        status: newStatus,
      }),
    );
    setCurrentStatus(newStatus);
  };

  const handleDelete = () => {
    dispatch(deleteTicket(ticket.id));

    navigation.goBack();
    
  };

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Text>Ticket Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ticket.title}</Text>

      <Text>ID : {ticket.id}</Text>

      <Text>{ticket.description || ticket.body}</Text>

      <Text>
  Created : {ticket.createdAt || new Date().toLocaleDateString()}
</Text>

      <Text>Priority: {ticket.priority || "Medium"}</Text>

      <Text>Status: {currentStatus}</Text>

      <TouchableOpacity style={styles.button} onPress={changeStatus}>
        <Text style={styles.buttonText}>Update Status</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Ticket</Text>
      </TouchableOpacity>
        <TouchableOpacity
  style={styles.editButton}
  onPress={() =>
    navigation.navigate("MainTabs", {
  screen: "Create Ticket",
  params: {
    editTicket: ticket,
  },
})
  }
>
        <Text style={styles.buttonText}>
          Edit Ticket</Text>
        </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#007AFF",

    padding: 12,

    borderRadius: 8,

    marginTop: 20,
  },

  buttonText: {
    color: "white",

    textAlign: "center",

    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "red",

    padding: 12,

    borderRadius: 8,

    marginTop: 10,
  },

  editButton: {
    backgroundColor: "orange",

    padding: 12,

    borderRadius: 8,

    marginTop: 10,
  },
});
