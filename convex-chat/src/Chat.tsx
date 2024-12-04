import { useQuery, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../convex/_generated/api";
import { useRef } from "react";
import Messages from "./Messages";

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState<string | null>("");

  const messages = useQuery(api.messages.getMessages);
  const sendMessage = useMutation(api.messages.sendMessage);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const navigate = useNavigate();
  const getUsername = () => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");
      setUsername(username);
      return username;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (username) {
        await sendMessage({ username, message });
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setMessage(" ");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!getUsername()) {
      navigate("/login");
    } else {
      return;
    }
  }, [username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return <p>Loading....</p>;
  }
  return (
    <main className="chat-container">
      <div className="messages-container">
        {messages?.map((message, index) => (
          <Messages
            message={message}
            key={message._id}
            isLast={index + 1 === messages.length}
            username={username}
          />
        ))}
      </div>
      <div ref={messagesEndRef} className="end" />

      <div className="message-form">
        <form onSubmit={handleSendMessage}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="send a message"
            className="message-input"
          />
        </form>
      </div>
    </main>
  );
};

export default Chat;
