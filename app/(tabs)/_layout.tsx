import BtnLogOut from "@/components/BtnLogOut/BtnLogOut";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";

// icons import
import { RootState } from "@/redux/store";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarInactiveTintColor: "#212121",
          tabBarItemStyle: {
            borderRadius: 20,
            marginTop: 4,
            marginBottom: 4,
            maxWidth: 70,
            margin: 8,
          },
          tabBarStyle: {
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Домашня сторінка",
            headerTitleAlign: "center",
            tabBarIcon: () => (
              <Ionicons name="grid-outline" size={28} color="black" />
            ),
            headerRight: () => <BtnLogOut />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Створити публікацію",
            headerTitleAlign: "center",
            tabBarIcon: () => <AntDesign name="plus" size={28} color="black" />,
            headerRight: () => <BtnLogOut />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Профіль",
            headerTitleAlign: "center",
            tabBarIcon: () => <Feather name="user" size={28} color="black" />,
            headerRight: () => <BtnLogOut />,
          }}
        />
      </Tabs>
    </>
  );
}
