const { cmd } = require('../command');

cmd({
    pattern: "chai",
    desc: "Displays a quirky chai-samosa themed animated message.",
    category: "tools",
    react: "☕",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const loadingMessage = await conn.sendMessage(from, { text: '☕' });
        const chaiMessages = [
            "☕", "🥟", "😋", "🍵", "🌧️", "🥳",
            "🍪", "🔥", "☕", "🥟", "😋", "🍵",
            "🌧️", "🥳", "🍪", "🔥", "☕", "🥟",
            "😋", "🍵", "🌧️", "🥳", "🍪", "🔥"
        ];

        for (const line of chaiMessages) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: loadingMessage.key,
                        type: 14,
                        editedMessage: {
                            conversation: line,
                        },
                    },
                },
                {}
            );
        }
        await conn.sendMessage(from, { text: "Chai-Samosa Time! ☕🥟" });
    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});


