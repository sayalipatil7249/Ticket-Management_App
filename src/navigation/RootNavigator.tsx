import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View , StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import type { RootState } from "../store";
import { setTickets } from "../store/slices/ticketSlice";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator(){

    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            const storedTickets = await AsyncStorage.getItem("tickets");

            if(storedTickets){
                dispatch(setTickets(JSON.parse(storedTickets)));
            }

            const storedEmail = await AsyncStorage.getItem("userEmail");
            if(storedEmail){
                dispatch(login(storedEmail));
            }
        };
        loadData();
    }, []);

    const isLoggedIn = useSelector(
        (state: RootState) => state.auth.isLoggedIn
    );

    const [loading,setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    },[]);

    const checkSession = async () => {
        try{
            const email = await AsyncStorage.getItem("userEmail");

            if(email){
                dispatch(login(email));
            }
        } catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if(loading){
        return (
            <View style = {styles.container} >
                <Text>Loading</Text>
            </View>
        );
    }
       
            

    return(
        <NavigationContainer>
            <AuthNavigator/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});