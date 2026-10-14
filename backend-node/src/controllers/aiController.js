// @desc    Ask AI College Assistant
// @route   POST /api/ai/ask
// @access  Private (All Roles)
const askAI = async (req, res) => {
    try {
        const { prompt } = req.body;

        // Extremely secure: Frontend never sees the API key. Node.js evaluates it.
        // Prevent crashes if the user hasn't supplied their own key yet.
        if (!process.env.AI_API_KEY) {
            return res.json({
                answer: "[🟢 MOCK RESPONSE] The AI is currently working in placeholder mode because 'AI_API_KEY' has not been added to your backend .env file. I am your Smart Campus Assistant! How can I help?"
            });
        }

        // 💡 This block demonstrates how the real call looks using standard fetch 
        // to an OpenAI-compatible endpoint. This can easily be swapped to Gemini/Anthropic.
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.AI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful college assistant for students and faculty at Smart Campus Hub." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Failed to hit LLM API");
        }

        res.json({ answer: data.choices[0].message.content });
    } catch (error) {
        console.error("AI Error:", error.message);
        res.status(500).json({ message: "Failed to communicate with AI provider." });
    }
};

module.exports = { askAI };
