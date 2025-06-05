import { Slot } from "expo-router";
import AuthLayoutBg from "../../components/AuthLayoutBg/AuthLayoutBg";

export default function AuthLayout() {
  return (
    <AuthLayoutBg>
      <Slot />
    </AuthLayoutBg>
  );
}
