import CheckMark from "./CheckMark";
import SharedTodoModalContent from "./SharedTodoModalContent";
import TodoModalContent from "./TodoModalContent";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function Task({
  id,
  title,
  shared_with_id,
  completed,
  clearTodo,
  toggleTodo,
}) {
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const bottomSheetModalRef = useRef(null);
  // Muestra el modal de compartido
  const sharedBottomSheetRef = useRef(null);
  // % de la pantalla que ocupa el modal
  const snapPoints = ["25%", "48%", "75%"];
  const snapPointsShared = ["40%"];

  // Funciones para mostrar los modales
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  function handlePresentShared() {
    sharedBottomSheetRef.current?.present();
  }

  async function deleteTodo() {
    const response = await fetch(`http://[IP]]:8080/todos/${id}`, {
      method: "DELETE",
    });
    clearTodo(id);
    console.log(response.status);
  }

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={[styles.container]}
    >
      <View style={styles.containerTextCheckBox}>
        <CheckMark id={id} completed={completed} toggleTodo={toggleTodo} />
        <Text style={styles.text}>{title.replaceAll('?', '').trim()}</Text>
      </View>
      {
        shared_with_id !== null ? (
          <Feather
            onPress={handlePresentShared}
            name="users"
            size={20}
            color="#383839"
          />
        ) : (
          <Feather
            onPress={handlePresentModal}
            name="share"
            size={20}
            color="#383839"
          />
        )
      }
      {
        isDeleteActive && (
          <Pressable
            onPress={deleteTodo}
            style={styles.deleteButton}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
          </Pressable>
        )
      }

      {/* Modal de Todos Compartidos */}
      <BottomSheetModal
        ref={sharedBottomSheetRef}
        snapPoints={snapPointsShared}
        backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
      >
        <SharedTodoModalContent
          id={id}
          title={title.replaceAll('?', '').trim()}
          shared_with_id={shared_with_id}
          completed={completed}
        />
      </BottomSheetModal>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={2}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
      >
        <TodoModalContent id={id} title={title} />
      </BottomSheetModal>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: "white",
  },
  containerTextCheckBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#383839",
    letterSpacing: -0.011 * 16, // 16 = baseFontSize
    flexShrink: 1,
    marginHorizontal: 8,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: -6,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
});