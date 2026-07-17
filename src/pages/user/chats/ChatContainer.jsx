import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SearchIcon, User, X } from "lucide-react";

import SnapnestLogo from "./../../../assets/Snapnest_logo.png";
import { useGetChatList } from "../../../hooks/chatSocket";

const ChatConainer = () => {
  const [search, setSearch] = useState("");

  const getChatList = useGetChatList();

  useEffect(() => {
    getChatList();
  },[]);

  const { chatList } = useSelector((state) => state.chatList);

  let contactList = chatList.filter((chat) => {
    return chat.senderName.includes(search);
  });

  return (
    <div className="w-100 h-100 bg-dark overflow-hidden">
      <div className="d-flex flex-row w-100 h-100 text-info">
        <div className="d-flex flex-column w-25 bg-black h-100">
          <div className="w-100 d-flex justify-content-start align-items-center gap-3 ps-3 py-3">
            <img
              src={SnapnestLogo}
              alt="Snapnest Logo"
              style={{ width: "60px", height: "60px" }}
            />
            <span className="text-white h2 mt-1">Snapnest</span>
          </div>
          <div className="position-relative w-100 px-3">
            <input
              type="text"
              id="search-input"
              className="w-100 form-control shadow-none ps-4 pe-4 "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              autoFocus
              placeholder="Enter the name"
            />
            <SearchIcon
              size={18}
              className="position-absolute top-50 translate-middle-y text-dark-emphasis"
              style={{
                left: "20px",
                cursor: "pointer",
              }}
            />
            <X
              size={18}
              className="position-absolute top-50 translate-middle-y text-dark-emphasis"
              style={{
                right: "20px",
                cursor: "pointer",
              }}
            />
          </div>

          <div className="flex-grow-1 w-100 h-auto p-3 mt-3">
            {contactList.map((element, index) => (
              <div
                key={`${crypto.randomUUID()}-${index}`}
                className="hover:bg-gray d-flex align-items-center gap-3 w-100 p-2 rounded-3"
              >
                <div
                  className="bg-primary d-flex justify-content-center align-items-center rounded-circle overflow-hidden"
                  style={{ width: "50px", height: "50px" }}
                >
                  {element.profileURL ? (
                    <img src={element.profileURL} className="w-100 h-100" />
                  ) : (
                    <User size={26} className="text-white" />
                  )}
                </div>
                <div className="text-secondary h4 mt-2">
                  {element.senderName}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-75 bg-white h-100"></div>
      </div>
    </div>
  );
};

export default ChatConainer;
