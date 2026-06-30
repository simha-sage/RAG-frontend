import { useState } from "react";
import { uploadPDF, askQuestion } from "../api/ragApi";

function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const data = await uploadPDF(file);

      alert(data.message);
    } catch (err) {
      console.log(err);
    }

    setUploading(false);
  };
  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "You",

      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try {
      const data = await askQuestion(question);

      setMessages((prev) => [
        ...prev,

        {
          sender: "AI",
          text: data.answer,
        },
      ]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    setQuestion("");
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">RAG Assistant</h1>

        {/* Upload */}

        <div className="flex gap-4 mb-6">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="flex-1 border rounded-lg p-2"
          />

          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Chat */}

        <div className="border rounded-lg bg-gray-50 h-[450px] overflow-y-auto p-4 mb-6">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Upload a PDF and ask questions.
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-xl ${
                  msg.sender === "You"
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}

        <div className="flex gap-4">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-6 rounded-lg"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
