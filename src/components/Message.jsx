function Message({ sender, text }) {
  return (
    <div>
      <strong>{sender}</strong>

      <p>{text}</p>
    </div>
  );
}

export default Message;
