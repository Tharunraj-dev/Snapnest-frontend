import { useSelector } from "react-redux";
import {
  useEditSignal,
  useDeleteSignal,
  useJointChat,
  useSendMessage,
  useReciveSignal,
  useSenderMessage,
} from "../../../hooks/chatSocket";
import { useEditMessage } from "../../../hooks/chatOperation";
import { useEffect } from "react";

const chatBlock = ({ chatId, senderId }) => {
  const joinChat = useJointChat();
  const sendMessage = useSendMessage();
  const editMessage = useEditMessage();
  const deleteMessage = useDeleteSignal();

  useReciveSignal();

  useEffect(() => {
    joinChat(chatId, senderId);
  }, []);

  return (
    <>
      {chatId && senderId ? (
        <div className="w-100 h-100">
          <div className=""></div>
        </div>
      ) : (
        <div className="w-100 text-center text-secondary">
          Your messages will appear here once you pick a conversation.
        </div>
      )}
    </>
  );
};

export default chatBlock;
