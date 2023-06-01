import LottieView from "lottie-react-native";
import { useRef } from "react";
import { View } from "react-native";

export function LoadingComponent() {
  const animation = useRef(null);

  return (
    <View>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        source={require("../assets/loading.json")}
      />
    </View>
  );
}
