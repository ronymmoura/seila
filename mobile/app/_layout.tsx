import { View } from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!hasLoadedFonts) {
    return <SplashScreen />;
  }

  return (
    <View className="relative flex-1 bg-[#25262B]">
      <StatusBar style="light" translucent />

      <View className="absolute -right-[150px] -top-[150px] h-[300px] w-[300px] rounded-full bg-purple-500 opacity-90" />

      <View className="absolute left-[50px] top-[200px] h-[100px] w-[100px] rounded-xl bg-black opacity-10" />
      <View className="absolute bottom-[200px] right-[50px] h-[100px] w-[100px] rounded-xl bg-black opacity-10" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "fade",
        }}
      />
    </View>
  );
}
