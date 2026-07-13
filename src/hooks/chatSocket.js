import { useSocketEmit, useSocketOn } from "./socketFunction";
import { useSelector } from "react-redux";
import {
  useAddMessage,
  useDeleteMessage,
  useEditMessage,
  useSetPreviousChat,
  useSetSenderInfo,
} from "./chatOperation";
import { useToaster } from "./toast";

export const useJointChat = (chatId) => {
  const emit = useSocketEmit();
  return (chatId, senderId) => emit("jon_chat", { chatId, senderId });
};

export const useSendMessage = () => {
  const addMessage = useMessage();
  const emit = useSocketEmit();
  return (message) => {
    if (!emit) return;
    const messageInfo = addMessage(message);
    emit("send_message", messageInfo);
  };
};

export const useEditSignal = () => {
  const editMessage = useEditMessage();
  const emit = useSocketEmit();
  return (messageId, content) => {
    if (!emit) return;
    editMessage(messageId, content);
    emit("edit_message", { messageId, content });
  };
};

export const useDeleteSignal = () => {
  const deleteMessage = useSocketEmit();
  const emit = useSocketEmit();
  const { userName } = useSelector((state) => state.auth);
  return (messageId) => {
    if (!emit) return;
    deleteMessage(messageId, userName);
    emit("delete_message", { messageId });
  };
};

export const receiveSignal = () => {
  const addMessage = useAddMessage();
  const editMessage = useEditMessage();
  const deleteMessage = useDeleteMessage();
  const setPreviousChat = useSetPreviousChat();
  const setSenderInfo = useSetSenderInfo();
  const toast = useToaster();

  useSocketOn("set_sender_info", ({ name, chatId }) => {
    setSenderInfo(name, chatId);
  });

  useSocketOn("prev_chat", (chats) => {
    setPreviousChat(chats);
  });
  useSocketOn("receive_message", ({ id, content, senderId, timestamp }) => {
    addMessage(id, content, senderId, timestamp);
  });
  useSocketOn("edit_message", ({ messageId, content }) => {
    addMessage(messageId, content);
  });
  useSocketOn("receive_message", ({ id, senderName }) => {
    addMessage(id, senderName);
  });
  useSocketOn("error_message", ({ message }) => {
    toast(message, "danger");
  });
};