import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { showMessage } from "react-native-flash-message";

const { height } = Dimensions.get("window");

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [state, setState] = useState(initialState);

  const router = useRouter();

  const submitForm = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      Keyboard.dismiss();
      console.log(userCredential);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log(error);
      let errorMessage = "";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use! you can't use this email";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      } else {
        errorMessage = "An error occurred during sign-up.";
      }

      showMessage({
        type: "danger",
        message: errorMessage,
      });
    }
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
        >
          <Text style={styles.authBtnText}>Увійти</Text>
        </TouchableOpacity>
        <Link style={{ marginTop: 16 }} href="/registration" replace>
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
