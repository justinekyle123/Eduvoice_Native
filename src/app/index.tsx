import { StyleSheet, Text, View } from "react-native";
import "../../global.css";


export default function Index() {
  return (
    <View style={styles.container}>
      <Text>okay</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
