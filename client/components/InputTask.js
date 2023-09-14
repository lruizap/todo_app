import React, { useState } from "react";
import {
  Dimensions,
  TextInput,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function InputTask({ todos, setTodos }) {
  const [messageBody, setMessageBody] = useState("");

  const handleSubmit = async () => {
    if (messageBody === "") {
      return;
    } else {
      const response = await fetch("http://[IP]]:8080/todos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id: 1,
          title: messageBody,
        }),
      });
      const newTodo = await response.json();
      setTodos([...todos, { ...newTodo, shared_with_id: null }]);
      Keyboard.dismiss();
      setMessageBody("");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.containerTextInput}
          placeholder="Write a new task"
          scrollEnabled={true}
          onChangeText={setMessageBody}
          defaultValue={messageBody}
        />
        <Pressable onPress={handleSubmit}>
          <AntDesign
            name="checkcircle"
            size={40}
            color={messageBody ? "black" : "#00000050"}
            style={{ paddingLeft: 5 }}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderTopColor: "#00000030",
    alignItems: "baseline",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTextInput: {
    width: windowWidth - 100,
    borderWidth: 1,
    borderRadius: 30,
    minHeight: 45,
    paddingHorizontal: 15,
    paddingTop: 8,
    fontSize: 16,
    paddingVertical: 5,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    marginBottom: 5,
    fontWeight: "600",
  },
});