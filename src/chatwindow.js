import { useState, useRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const BOT_NAME = "LinkedIn AI Assistant";
const BOT_AVATAR = null; // uses icon

// Simple rule-based AI responses
const getBotReply = (msg) => {
  const m = msg.toLowerCase();
  if (m.includes("hello") || m.includes("hi") || m.includes("hey"))
    return "Hi there! 👋 I'm your LinkedIn AI Assistant. I can help with job search, profile tips, networking, and career advice. What can I help you with?";
  if (m.includes("job") || m.includes("jobs"))
    return "Great question! Here are some tips for your job search:\n\n• Update your profile headline with keywords\n• Set job alerts for your target roles\n• Apply within the first 24 hours for better visibility\n• Use the 'Easy Apply' feature to apply faster\n\nWould you like help with anything specific?";
  if (m.includes("profile") || m.includes("resume"))
    return "A strong LinkedIn profile can get you 40x more opportunities! Key tips:\n\n• Add a professional photo (gets 21x more views)\n• Write a compelling headline\n• Add your skills — recruiters search by skills\n• Get at least 3 recommendations\n• Complete the 'About' section with keywords\n\nWant me to review any specific section?";
  if (m.includes("network") || m.includes("connect") || m.includes("connection"))
    return "Networking is key on LinkedIn! Here's how to grow your network:\n\n• Personalize every connection request\n• Engage with posts in your industry\n• Join relevant groups\n• Follow companies you're interested in\n• Comment thoughtfully on others' posts\n\nQuality > quantity when it comes to connections!";
  if (m.includes("salary") || m.includes("pay") || m.includes("compensation"))
    return "For salary research:\n\n• Use LinkedIn Salary Insights\n• Check Glassdoor and Levels.fyi\n• Look at job postings that list salary ranges\n• Talk to people in similar roles\n\nRemember: your skills, experience, and location all affect compensation. Don't undersell yourself!";
  if (m.includes("interview"))
    return "Interview prep tips:\n\n• Research the company thoroughly\n• Practice the STAR method for behavioral questions\n• Prepare 3-5 questions to ask the interviewer\n• Review your own resume — they'll ask about it\n• Connect with current employees on LinkedIn beforehand\n\nGood luck! You've got this 💪";
  if (m.includes("skill") || m.includes("learn") || m.includes("course"))
    return "LinkedIn Learning has 16,000+ courses! Top skills in demand right now:\n\n• AI & Machine Learning\n• Cloud Computing (AWS, Azure)\n• Data Analysis\n• React / Full Stack Development\n• Project Management\n\nWould you like recommendations based on your profile?";
  if (m.includes("thank"))
    return "You're welcome! 😊 Feel free to ask me anything else about your career journey. I'm here to help!";
  if (m.includes("premium"))
    return "LinkedIn Premium offers:\n\n• See who viewed your profile\n• InMail credits to message anyone\n• Salary insights\n• Top Applicant badge on jobs\n• LinkedIn Learning access\n\nThere's a 1-month free trial available. Worth trying if you're actively job searching!";
  return "That's a great topic! I'm here to help with your professional journey. You can ask me about:\n\n• Job searching strategies\n• Profile optimization\n• Networking tips\n• Interview preparation\n• Salary negotiation\n• Skills & learning\n\nWhat would you like to explore?";
};

function ChatWindow({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  const isBot = user?.isBot;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Bot greeting on open
  useEffect(() => {
    if (isBot && messages.length === 0) {
      setMessages([{
        id: 1,
        text: "Hello! 👋 I'm your LinkedIn AI Assistant. I can help you with job searching, profile tips, networking strategies, and career advice. What can I help you with today?",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  }, [isBot]);

  if (!user) {
    return (
      <div className="chatWindow">
        <div className="chatWindow__empty">
          <SmartToyIcon style={{ fontSize: 48, color: 'rgba(0,0,0,0.15)', marginBottom: 12 }} />
          <p>Select a conversation or chat with the AI Assistant</p>
        </div>
      </div>
    );
  }

  const displayName = isBot ? BOT_NAME : (user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.username);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput("");

    if (isBot) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: getBotReply(userInput),
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      }, 1000 + Math.random() * 800);
    }
  };

  return (
    <div className="chatWindow">
      {/* Header */}
      <div className="chatWindow__header">
        {isBot ? (
          <div className="chatWindow__headerInfo">
            <div className="chatWindow__botAvatar">
              <SmartToyIcon style={{ fontSize: 22, color: 'white' }} />
            </div>
            <div>
              <span className="chatWindow__headerName">{BOT_NAME}</span>
              <span className="chatWindow__headerStatus">● Always active</span>
            </div>
          </div>
        ) : (
          <div className="chatWindow__headerInfo">
            <Avatar style={{ width: 36, height: 36, fontSize: 15 }}>
              {user.first_name?.[0] || user.username?.[0]}
            </Avatar>
            <div>
              <span className="chatWindow__headerName">{displayName}</span>
              <span className="chatWindow__headerStatus">LinkedIn member</span>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="chatMessages">
        {messages.map(msg => (
          <div key={msg.id} className={`chatBubbleWrap ${msg.sender === 'me' ? 'chatBubbleWrap--me' : ''}`}>
            {msg.sender === 'bot' && (
              <div className="chatWindow__botAvatar chatWindow__botAvatar--sm">
                <SmartToyIcon style={{ fontSize: 14, color: 'white' }} />
              </div>
            )}
            <div className={`chatBubble ${msg.sender === 'me' ? 'chatBubble--me' : 'chatBubble--bot'}`}>
              {msg.text.split('\n').map((line, i) => (
                <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
              ))}
              <span className="chatBubble__time">{msg.time}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chatBubbleWrap">
            <div className="chatWindow__botAvatar chatWindow__botAvatar--sm">
              <SmartToyIcon style={{ fontSize: 14, color: 'white' }} />
            </div>
            <div className="chatBubble chatBubble--bot chatBubble--typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="messageInput">
        <button className="messageInput__icon"><EmojiEmotionsIcon /></button>
        <button className="messageInput__icon"><AttachFileIcon /></button>
        <input
          type="text"
          placeholder={isBot ? "Ask me anything about your career..." : "Write a message..."}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button className="messageInput__send" onClick={sendMessage} disabled={!input.trim()}>
          <SendIcon style={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
