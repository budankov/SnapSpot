import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/reducers/authSlice";

const BtnLogOut = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Feather name="log-out" size={24} style={styles.BtnLogOut} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  BtnLogOut: {
    color: "#BDBDBD",
    marginRight: 10,
  },
});

export default BtnLogOut;
