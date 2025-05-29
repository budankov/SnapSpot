import { Redirect } from "expo-router";

export default function Index() {
  // Тут можна додати перевірку авторизації
  return <Redirect href="/login" />;
}
