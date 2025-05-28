import { useLoadFonts } from "../hooks/useLoadFonts";

import LoginScreen from "../screens/auth/LoginScreen";

export default function Index() {
  const { loaded, error } = useLoadFonts();

  if (!loaded && !error) return null;

  return <LoginScreen />;
}
