import { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({scroll}) => {
    const [message, setMessage] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim === " " ) {
            alert("Enter a vlaid message")
            return;
        }
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
            text: message,
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid,
          });
          setMessage("");
          scroll.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
      <form className="send-message" onSubmit={(e) => sendMessage(e)}>
        <label htmlFor="messageInput" hidden>
          Enter Message
        </label>
        <input
          id="messageInput"
          name="messageInput"
          type="text"
          className="form-input__input"
          placeholder="type message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    );
  };
  
  export default SendMessage;
  