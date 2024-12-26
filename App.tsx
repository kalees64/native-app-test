import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import "./global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DataTable } from "react-native-paper";

export interface TODO {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function App() {
  const API_URI = "https://jsonplaceholder.typicode.com/todos";

  const platform = Platform.OS;

  const [todos, setTodos] = useState<TODO[]>([]);

  function sayHii() {
    alert("Hii");
    // Alert.alert("Hii I am Kalees");
  }

  const getTodos = async () => {
    try {
      const res = await axios.get(API_URI);
      console.log(res);
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (platform === "web") {
    return (
      <View className="flex-1 bg-slate-200">
        <View className="w-full px-5 bg-white py-2 flex flex-row justify-between items-center">
          <Text className="text-xl font-bold">API Integration & Deploy</Text>

          <Pressable
            className="flex flex-row items-center gap-2 bg-[#2196f3] p-1 rounded "
            onPress={sayHii}
          >
            <FontAwesome
              name="hand-peace-o"
              size={24}
              color="white"
              className="animate-bounce"
            />
            <Text className="text-white font-semibold">Hii</Text>
          </Pressable>
        </View>

        <View className="flex-1 p-3 gap-3">
          <View className="w-full p-3 bg-white rounded">
            <Text className="text-lg font-bold">Todos ({todos.length})</Text>
          </View>
          <ScrollView className="flex-1 overflow-auto no-scrollbar p-3 bg-white rounded">
            {/* {todos.length ? (
              todos.map((todo: TODO) => {
                return (
                  <View key={todo.id} className="border-b p-2 border-slate-300">
                    <Text className="font-semibold capitalize">
                      {todo.title}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View className="p-3 bg-white rounded ">
                <Text className="text-center font-semibold ">
                  No Data Available
                </Text>
              </View>
            )} */}

            <View className="p-3">
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>S.no</DataTable.Title>
                  <DataTable.Title>Title</DataTable.Title>
                </DataTable.Header>
                {todos.length ? (
                  todos.map((todo: TODO, index: number) => {
                    return (
                      <DataTable.Row key={todo.id}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>{todo.title}</DataTable.Cell>
                      </DataTable.Row>
                    );
                  })
                ) : (
                  <DataTable.Row>
                    <DataTable.Cell>No Data Available</DataTable.Cell>
                  </DataTable.Row>
                )}
              </DataTable>
            </View>
          </ScrollView>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <SafeAreaProvider className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-slate-200">
          <View className="w-full px-5 bg-white py-2 flex flex-row justify-between items-center">
            <Text className="text-xl font-bold">API Integration & Deploy</Text>

            <Pressable
              className="flex flex-row items-center gap-2 bg-[#2196f3] p-1 rounded "
              onPress={sayHii}
            >
              <FontAwesome
                name="hand-peace-o"
                size={24}
                color="white"
                className="animate-bounce"
              />
              <Text className="text-white font-semibold">Hii</Text>
            </Pressable>
          </View>

          <View className="flex-1 p-3 gap-3">
            <View className="w-full p-3 bg-white rounded">
              <Text className="text-lg font-bold">Todos ({todos.length})</Text>
            </View>
            <ScrollView className="flex-1 overflow-auto no-scrollbar p-3 bg-white rounded">
              {todos.length ? (
                todos.map((todo: TODO) => {
                  return (
                    <View
                      key={todo.id}
                      className="border-b p-2 border-slate-300"
                    >
                      <Text className="font-semibold capitalize">
                        {todo.title}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <View className="p-3 bg-white rounded">
                  <Text className="text-center font-semibold ">
                    No Data Available
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
