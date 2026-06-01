import {View,Text,StyleSheet,TouchableOpacity,} from "react-native";
import {useSelector,useDispatch,} from "react-redux";
import type {RootState} from "../../store";
import {logout} from "../../store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const email = useSelector(
    (state:RootState) => state.auth.email
  );
  const tickets = useSelector(
    (state: RootState) => state.tickets.tickets
  );

  const dispatch = useDispatch();
  const handleLogout = async() => {
    await AsyncStorage.removeItem("userEmail");
    dispatch(logout());
  };

  return (

<View style={styles.container}>

  <View style={styles.card}>

    <Text style={styles.heading}>
      My Profile
    </Text>

    <View style={styles.avatar}>

      <Text style={styles.avatarText}>
        {email.charAt(0).toUpperCase()}
      </Text>

    </View>

    <Text style={styles.label}>
      Logged In User
    </Text>

    <Text style={styles.user}>
      {email}
    </Text>

    <View style={styles.infoContainer}>

    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>
        Total Tickets
      </Text>

      <Text style={styles.infoValue}>
        {tickets.length}
      </Text>
    </View>

    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>
        App Version
      </Text>

      <Text style={styles.infoValue}>
        1.0.0
      </Text>
    </View>

  </View>

    <TouchableOpacity
      style={styles.button}
      onPress={handleLogout}
    >

      <Text style={styles.buttonText}>
        Logout
      </Text>

    </TouchableOpacity>

  </View>

</View>

);
}


const styles =StyleSheet.create({
 container:{
 flex:1,
 justifyContent:"center",
 alignItems:"center",
 backgroundColor:"#F3F4F6",
 padding:20,
},

card:{
 width:"100%",
 backgroundColor:"white",
 borderRadius:20,
 padding:25,
 alignItems:"center",
 elevation:5,
},

heading:{
 fontSize:28,
 fontWeight:"bold",
 marginBottom:20,
},

avatar:{
 width:90,
 height:90,
 borderRadius:45,
 backgroundColor:"#7C3AED",
 justifyContent:"center",
 alignItems:"center",
 marginBottom:20,
},

avatarText:{
 color:"white",
 fontSize:36,
 fontWeight:"bold",
},

label:{
 color:"gray",
 marginBottom:8,
},

user:{
 fontSize:18,
 fontWeight:"bold",
 marginBottom:30,
},

button:{
 backgroundColor:"#EF4444",
 width:"100%",
 padding:14,
 borderRadius:10,
},

buttonText:{
 color:"white",
 textAlign:"center",
 fontWeight:"bold",
 fontSize:16,
},

infoContainer:{
  width:"100%",
  marginBottom:25,
},

infoCard:{
  backgroundColor:"#F9FAFB",
  borderRadius:12,
  padding:15,
  marginBottom:10,
},

infoLabel:{
  color:"#6B7280",
  fontSize:14,
},

infoValue:{
  fontSize:20,
  fontWeight:"bold",
  marginTop:5,
},

})