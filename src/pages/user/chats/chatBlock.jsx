import { useSelector } from "react-redux";
import {
  useEditSignal,
  useDeleteSignal,
  useJointChat,
  useSendMessage,
  useReciveSignal,
} from "../../../hooks/chatSocket";
import { useEditMessage } from "../../../hooks/chatOperation";
import { useEffect, useState } from "react";
import { Send, User } from "lucide-react";
import formatTime from "../../../utility/formatTime";

const ChatBlock = ({ chatId, senderId, profileURL }) => {
  const [message, setMessage] = useState("");

  const joinChat = useJointChat();
  const sendMessage = useSendMessage();
  const editMessage = useEditMessage();
  const deleteMessage = useDeleteSignal();

  useReciveSignal();
  const { senderName, chats } = useSelector((state) => state.chat);
  const { uid } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!chatId || !senderId) return;
    joinChat(chatId, senderId);
  }, [chatId, senderId]);

  const handleSendMessage = () => {
    let messageContent = message.trim();
    if (!messageContent) return;
    sendMessage(messageContent);
    setMessage("");
  };

  return (
    <>
      {chatId && senderId ? (
        <div className="w-100 h-100">
          <div className="w-100 py-2 d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center gap-2 p-3">
              <div
                className="bg-primary d-flex justify-content-center align-items-center rounded-circle overflow-hidden"
                style={{ width: "50px", height: "50px" }}
              >
                {profileURL ? (
                  <img src={profileURL} className="w-100 h-100" />
                ) : (
                  <User size={26} className="text-white" />
                )}
              </div>
              <div className="text-secondary h4 mt-2">{senderName}</div>
            </div>
          </div>

          <div className="w-100 h-80vh overflow-auto">
            {chats.map((chat, index) => {
              return (
                <div
                  key={chat.id}
                  className={`w-100 d-flex flex-column  ${chat.senderId == uid ? "justify-content-end" : "justify-content-start"} px-4 py-2`}
                >
                  <div className="d-flex flex-column">
                    <div className="max-w-500px bg-secondary text-white p-3 rounded-3">
                      {chat.content}
                    </div>
                    <div className="text-secondary text-uppercase">
                      {formatTime(chat.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="position-relative w-100 d-flex justify-content-center px-3">
            <input
              type="text"
              id="message-input"
              className="w-100 px-2 py-2 rounded-3 outline-none "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log(e.key);
                  handleSendMessage();
                }
              }}
              placeholder="Type a Message"
              autoComplete="off"
              autoFocus
            />
            <div className="position-absolute end-20px top-50 translate-middle-y">
              <button
                className="btn btn-transparent border-0 text-black"
                onClick={handleSendMessage}
              >
                <Send />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 py-2">
          <div className="w-100 text-center text-secondary">
            Your messages will appear here once you pick a conversation.
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBlock;
