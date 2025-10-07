import Header from "@/components/ui/Header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function chatScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi, chat!", sender: "me" },
    { id: "2", text: "Hello Dorian. How you been?", sender: "other" },
    {
      id: "3",
      text: "I'm doing okay. I feel really great! Thank you!",
      sender: "me",
    },
  ]);

  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  type messageProps = { text: string; sender: string };

  const Message = ({ text, sender }: messageProps) => {
    return (
      <View
        style={[
          styles.messageBubble,
          sender === "me" ? styles.sender : styles.receiver,
        ]}
      >
        <Text>{text}</Text>
      </View>
    );
  };

  const sendMessage = () => {
    if (input.trim().length === 0) return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "pink" }}
      keyboardVerticalOffset={90}
    >
      <Header title="Chat" />
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <Message text={item.text} sender={item.sender} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Ask Anything"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <FontAwesome name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
    justifyContent: "flex-end",
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#c2c2c2",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 40,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 10,
  },
  sender: {
    alignSelf: "flex-end",
    backgroundColor: "#c2c2c2",
  },
  receiver: {
    alignSelf: "flex-start",
    backgroundColor: "pink",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "70%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "pink",
    padding: 10,
    borderRadius: "50%",
  },
});
