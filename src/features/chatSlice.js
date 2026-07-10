import { createSlice } from "@reduxjs/toolkit";
import { ban } from "lucide-react";

const chatSlice = createSlice({
  name: "chats",
  initialState: [],
  renders: {
    addmessage: (state, action) => {
      const newMessage = {
        id: crypto.randomUUID(),
        content: action.payload.content,
        senderId: action.payload.senderId,
        timeStamp: action.payload.timeStamp,
        isEdited: false,
        isDeleted: false,
      };
      state.push(newMessage);
    },
    editMessage: (state, action) => {
      const { id, content } = action.payload;
      return state.map((message) => {
        if (message.id !== id) return message;
        message.content = content;
        message.isEdited = true;
        return message;
      });
    },
    deleteMessage: (state, action) => {
      const { id, senderName } = action.payload;
      return state.map((message) => {
        if (message.id !== id) return message;
        message.content = `${senderName} deleted the message`;
        message.isDeleted = true;
        return message;
      });
    },
    clearChat: (state) => [],
  },
});

export const { addmessage, editMessage, deleteMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
