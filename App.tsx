import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  ScrollView,
  Button,
} from "react-native";
import "./global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  DataTable,
  Divider,
  Drawer,
  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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

  const [modalState, setModalState] = useState<boolean>(false);

  const [selectedTodo, setSelectedTodo] = useState<TODO>();

  function sayHii() {
    alert("Hii");
    // Alert.alert("Hii I am Kalees");
  }

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const selectTodo = (todo: TODO) => {
    setSelectedTodo(todo);
  };

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
      <View className="flex-1 bg-slate-200 relative">
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

            <View className="flex-1 h-64 p-3">
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title className="text-black">S.no</DataTable.Title>
                  <DataTable.Title>Title</DataTable.Title>
                  <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>
                {todos.length ? (
                  todos.map((todo: TODO, index: number) => {
                    return (
                      <DataTable.Row key={todo.id}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell className="">
                          {todo.title.toUpperCase()}
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <MaterialIcons
                            name="preview"
                            size={24}
                            color="black"
                            onPress={() => {
                              selectTodo(todo);
                              toggleModal();
                            }}
                          />
                        </DataTable.Cell>
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

        {modalState && (
          <View className="absolute flex-1 w-screen h-screen bg-black/30 top-0 left-0 flex justify-center items-center  p-5">
            <View className="p-3 bg-white rounded w-96 max-sm:w-11/12">
              <View className="pb-2 flex flex-row items-center justify-between">
                <Text className="text-xl font-semibold">Modal</Text>
                <FontAwesome
                  name="close"
                  size={24}
                  color="black"
                  className="cursor-pointer"
                  onPress={toggleModal}
                />
              </View>
              <Divider></Divider>
              <View className="py-3">
                <Text className="text-lg ">
                  Title :{" "}
                  <Text className="font-bold">
                    {selectedTodo?.title.toUpperCase()}
                  </Text>
                </Text>
              </View>
              <Divider></Divider>
              <View className="pt-3 flex flex-row justify-end">
                <Button title="Close" onPress={toggleModal} color={"red"} />
              </View>
            </View>
          </View>
        )}

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
