type Props = {
  message: any;

  isLast: boolean;
  username: string | null;
};

const Messages = ({ message,  isLast, username }: Props) => {
  return (
    <div key={message._id} className={`messages ${isLast ? "last" : ""}`}>
      <article
        className={`messages ${message.username === username ? "mine" : "others"} `}
      >
        <p className="message-author">{message.username}</p>
        <div className="message-box">
          <p className="message">{message.message}</p>
        </div>
      </article>
    </div>
  );
};

export default Messages;
