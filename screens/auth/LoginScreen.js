import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Dimensions,
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

const { height } = Dimensions.get("window");

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [state, setState] = useState(initialState);

  const submitForm = () => {
    console.log(state);
    Keyboard.dismiss();
    setState(initialState);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" style="dark" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.bgImage}
          source={require("../../assets/images/bg-image.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-80}
          >
            <View style={styles.authWrapper}>
              <View style={styles.authForm}>
                <Text style={styles.authTitle}>Увійти</Text>
                <Text style={styles.authText}>Email address</Text>
                <TextInput
                  style={styles.authInput}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <Text style={styles.authText}>Password</Text>
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
                <Text style={styles.authSingInText}>
                  Немає облікового запису? Зареєструватись
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  authWrapper: {
    height: height * 0.6,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  authForm: {
    flex: 1,
    marginHorizontal: 40,
  },
  authTitle: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 30,
    textAlign: "center",
    // marginBottom: 33,
    marginTop: 32,
  },
  authText: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "Roboto",
    fontWeight: "500",
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
    // marginBottom: 16,
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
    color: "#1B4371",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
  },
});

export default LoginScreen;
