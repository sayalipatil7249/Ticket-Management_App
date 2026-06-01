import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  item: any;
  onPress: () => void;
};

const TicketCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.ticketId}>ID: {item.id}</Text>

      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {item.description || item.body}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(TicketCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  ticketId: {
    color: "#666",
    marginBottom: 6,
  },

  description: {
    color: "#555",
    lineHeight: 20,
  },
});
