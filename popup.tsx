import { useState } from "react";

function IndexPopup() {
  // State variables to manage user input and response
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('Ask a question to see the response here 🤩');

  // Function to handle generating a response
  async function handleGenerateResponse() {
    try {
      if (command.trim() === '') {
        setResponse('Please enter a valid command.');
        return;
      }

      // Make an API request to the backend to generate a response
      const response = await fetch('http://localhost:3000/api/generateResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      // Parse the API response and update the UI with the generated text
      const data = await response.json();
      setResponse(data[0].generated_text);
    } catch (error) {
      console.error(error);
      setResponse('An error occurred while generating the response.');
    }
  }

  return (
    <div style={{ width: 500, height: 500, padding: 16 }}>
      <div style={{ padding: 60, minHeight: 100, fontSize: 17, textAlign: "justify", textJustify: "inter-word" }}>
        <p>{response}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly", paddingTop: "110px" }}>
        <input
          type="text"
          placeholder="Write your query here ✨✨✨"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          style={{ width: "260px" }}
        />
        <button style={buttonStyle} onClick={handleGenerateResponse}>
          Generate
        </button>
      </div>
    </div>
  );
}

// Style for the "Generate" button
const buttonStyle = {
  backgroundColor: "#afeba2",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #7fc76f",
};

export default IndexPopup;
