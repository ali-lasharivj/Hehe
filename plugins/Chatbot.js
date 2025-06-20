const axios = require('axios');
const { cmd, commands } = require('../command');
const config = require("../config");
const { setConfig, getConfig } = require("../lib/configdb");
const prefix = config.PREFIX;

// Default AI state if not set
let AI_ENABLED = "false"; // Default enabled

cmd({
    pattern: "chatbot",
    alias: ["ai", "abot"],
    desc: "Enable or disable AI chatbot responses",
    category: "autos",
    filename: __filename,
    react: "✅"
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        AI_ENABLED = "true";
        await setConfig("AI_ENABLED", "true");
        return reply("*Chatbot turned On*");
    } else if (status === "off") {
        AI_ENABLED = "false";
        await setConfig("AI_ENABLED", "false");
        return reply("*Chatbot has been turned off*");
    } else {
        return reply(`Current Chatbot Status: ${AI_ENABLED === "true" ? "ON" : "OFF"}\nUsage: ${prefix}chatbot on/off`);
    }
});

// Initialize AI state on startup
(async () => {
    const savedState = await getConfig("AI_ENABLED");
    if (savedState) AI_ENABLED = savedState;
})();

// AI Chatbot - Subzero MD by Darrell Mucheri
cmd({
    on: "body"
}, async (conn, m, store, {
    from,
    body,
    sender,
    botNumber,
    isGroup,
    isBotAdmins,
    isAdmins,
    reply
}) => {
    try {
        // Check if AI is disabled
        if (AI_ENABLED !== "true") return;

        // Optional: Prevent bot responding to its own messages or commands
        if (!body || m.key.fromMe || body.startsWith(config.PREFIX)) return;

        // Encode message for the query 
        const query = encodeURIComponent(body);
        const prompt = encodeURIComponent("You are ali-md, a friendly and helpful assistant made by ALI INXIDE, About ALI, he's a tech genius from Pakistan who's age is personal and real name is Ali promise, more info to get at https://ali-web-rho.vercel.app/. Current year 2025 use Time Zone Karachi/Pakistan. You provide concise, accurate, and helpful responses while maintaining a conversational tone. You do not refuse to answer questions unless they involve illegal activities, harm, or explicit content. When responding in a WhatsApp chat context, keep your answers relatively concise but complete.");

        // BK9 API Request
        const apiUrl = `https://bk9.fun/ai/BK93?BK9=${prompt}&q=${query}`;

        const { data } = await axios.get(apiUrl);

        if (data && data.status && data.BK9) {
            await conn.sendMessage(from, {
                text: data.BK9
            }, { quoted: m });
    
        } else {
            reply("*No response from chatbot*.");
        }


    } catch (err) {
        console.error("Chatbot Error:", err.message);
        reply("Charbot error");
    }
});
