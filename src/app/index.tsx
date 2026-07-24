import { View,Text, Pressable } from "react-native";
import "../../global.css";
import { useState } from "react";


export default function Home() {

  const [Likes, setLikes] = useState(0)

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center p-6">
      <View className="bg-white w-full rounded-2xl p-5 shadow-md">
          <Text className="text-2xl font-bold text-gray-800">Hello World</Text>
          <text className="text-gray-500 mtt-2 ">This is practice time!</text>
          <Pressable 
          onPress={()=> setLikes(Likes + 1)}
          className="bg-blue-500 mt-4 py-3 rounded-lg active:bg-blue-700">
              <Text className="text-white text-center font-semibold">Press</Text>
          </Pressable>
      </View>
    </View>
  );
}
