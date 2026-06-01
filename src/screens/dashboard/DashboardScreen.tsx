import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import TicketCard from "../../components/TicketCard";
import { setLoading, setError } from "../../store/slices/ticketSlice";

export default function DashboardScreen() {
  const tickets = useSelector((state: RootState) => state.tickets.tickets);

  const [apiTickets, setApiTickets] = useState<any[]>([]);

  const loading = useSelector((state: RootState) => state.tickets.loading);

  const error = useSelector((state: RootState) => state.tickets.error);

  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const navigation = useNavigation<any>();

  const fetchTickets = async (pageNumber = 1) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",

        {
          params: {
            _limit: 10,

            _page: pageNumber,
          },
        },
      );

      const data = response.data;

      if (pageNumber === 1) {
        setApiTickets(data);
      } else {
        setApiTickets((prev) => [...prev, ...data]);
      }

      dispatch(setError(null));
    } catch (error) {
      dispatch(setError("Failed to fetch tickets"));
    } finally {
      dispatch(setLoading(false));

      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    const combinedTickets = [...tickets, ...apiTickets];

    return combinedTickets.filter((item: any) =>
      (item.title || "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [tickets, apiTickets, search]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchTickets(1);
  }, []);

  const loadMore = useCallback(() => {
    if (loading) return;

    const nextPage = page + 1;

    setPage(nextPage);

    fetchTickets(nextPage);
  }, [loading, page]);

  const renderItem = useCallback(
    ({ item }: any) => (
      <TicketCard
        item={item}
        onPress={() =>
          navigation.navigate("TicketDetails", {
            ticketId: item.id,
            ticket: item,
          })
        }
      />
    ),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Dashboard</Text>

        <Text style={styles.subtitle}>Browse and manage tickets</Text>
      </View>
      <TextInput
        placeholder="Search tickets..."
        placeholderTextColor="#666"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {loading && apiTickets.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={filteredTickets}
          initialNumToRender={10}
          removeClippedSubviews={true}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View>
              <Text style={styles.emptyText}>No Tickets Available</Text>
            </View>
          }
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F5F5F5",
  },

  headerContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "gray",
    marginTop: 4,
  },

  email: {
    marginTop: 10,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
  },

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

  button: {
    backgroundColor: "#ff3b30",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "white",
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
