const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const Groq = require('groq-sdk');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors()); 

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
  secret: process.env.GROQ_API_SECRET 
});


app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
   
    const chatCompletion = await getGroqChatCompletion(question);
    const answer = chatCompletion.choices[0]?.message?.content || "";

    
    res.json({ answer });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


async function getGroqChatCompletion(question) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
      model: "llama3-8b-8192", 
    });
    return response;
  } catch (error) {
    throw new Error('Error getting chat completion from Groq: ' + error.message);
  }
}


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
