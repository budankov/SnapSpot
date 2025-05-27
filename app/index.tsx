import { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// import { useLoadFonts } from "../hooks/useLoadFonts";

const initialState = {
  email: "",
  password: "",
};

export default function Index() {
  const [state, setState] = useState(initialState);

  const submitForm = () => {
    console.log(state);
    Keyboard.dismiss();
    setState(initialState);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.bcgImage}
          source={require("../assets/images/bcg-image.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.authForm}>
              <View style={styles.authWrapper}>
                <Text style={styles.authText}>Email address</Text>
                <TextInput
                  style={styles.authInput}
                  placeholder="Enter your email"
                  placeholderTextColor="#fff"
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={styles.authWrapper}>
                <Text style={styles.authText}>Password</Text>
                <TextInput
                  style={styles.authInput}
                  secureTextEntry={true}
                  placeholder="Enter your password"
                  placeholderTextColor="#fff"
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.authBtn}
                activeOpacity={0.8}
                onPress={submitForm}
              >
                <Text style={styles.authBtnText}>Sing In</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bcgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  authForm: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 40,
  },
  authWrapper: {
    marginTop: 20,
  },
  authText: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  authInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
    color: "#fff",
    marginTop: 12,
    padding: 10,
    textAlign: "center",
  },
  authBtn: {
    backgroundColor: "#faa403",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  authBtnText: {
    fontSize: 18,
    color: "#fff",
  },
});
