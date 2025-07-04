import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { RootState } from "@/redux/store";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/reducers/authSlice";

const { height } = Dimensions.get("window");

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [state, setState] = useState(initialState);
  const dispatch = useAppDispatch();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      console.log(error);
      showMessage({
        type: "danger",
        message: error,
      });
    }
  }, [error]);

  const submitForm = () => {
    dispatch(loginUser({ email: state.email, password: state.password }));
  };

  return (
    <View style={styles.authWrapper}>
      <View style={styles.authForm}>
        <Text style={styles.authTitle}>Увійти</Text>
        <TextInput
          style={styles.authInput}
          placeholder="Адреса електронної пошти"
          placeholderTextColor="#BDBDBD"
          value={state.email}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, email: value }))
          }
        />
        <TextInput
          style={styles.authInput}
          secureTextEntry={true}
          placeholder="Пароль"
          placeholderTextColor="#BDBDBD"
          value={state.password}
          onChangeText={(value) =>
            setState((prevState) => ({
              ...prevState,
              password: value,
            }))
          }
        />

        <TouchableOpacity
          style={styles.authBtn}
          activeOpacity={0.8}
          onPress={submitForm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.authBtnText}>Увійти</Text>
          )}
        </TouchableOpacity>

        <Link style={{ marginTop: 16 }} href="./registration" replace>
          <Text style={styles.authSingInText}>
            Немає облікового запису? Зареєструватись
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  authForm: {
    height: height * 0.6,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 40,
  },
  authTitle: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
    marginTop: 32,
  },
  authInput: {
    borderWidth: 1,
    color: "#212121",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    backgroundColor: "#F6F6F6",
    padding: 16,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    marginBottom: 16,
  },
  authBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 33,
  },
  authBtnText: {
    color: "#FFF",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  authSingInText: {
    textAlign: "center",
    color: "#1B4371",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 56,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
  },
});
