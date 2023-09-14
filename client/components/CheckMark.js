import {
  Pressable,
} from "react-native";

export default function CheckMark({ id, completed, toggleTodo }) {
  async function toggle() {
    const response = await fetch(`http://192.168.0.26:8080/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        value: completed ? false : true,
      }),
    });
    const data = await response.json();
    toggleTodo(id);
    console.log(data);
  }

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles = {
          width: 20,
          height: 20,
          borderRadius: 7,
        },
        { backgroundColor: completed === 0 ? "#E9E9EF" : "#0EA5E9" },
      ]}
    ></Pressable>
  )
}