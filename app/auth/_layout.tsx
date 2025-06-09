import { RootState } from "@/redux/store";
import { Redirect, Slot } from "expo-router";
import { useSelector } from "react-redux";
import AuthLayoutBg from "../../components/AuthLayoutBg/AuthLayoutBg";

export default function AuthLayout() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <AuthLayoutBg>
      <Slot />
    </AuthLayoutBg>
  );
}
