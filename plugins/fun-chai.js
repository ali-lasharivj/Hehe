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


cmd({
    pattern: "sadgirl",
    desc: "Create a sadgirl text effect",
    category: "logo",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply("❌ Please provide a name. Example: sadgirl Empire");
        }
        
        const name = args.join(" ");
        
        // API URL with user-provided name
        const apiUrl = `https://api-pink-venom.vercel.app/api/logo?url=https://en.ephoto360.com/write-text-on-wet-glass-online-589.html&name=${encodeURIComponent(name)}`;

        // Fetch JSON response
        const result = await fetchJson(apiUrl);

        // Check if the download_url is present
        if (!result?.result?.download_url) {
            return;
        }

        // Send the 3D Comic-style text effect image
        await conn.sendMessage(from, {
            image: {
                url: result.result.download_url
            }
        });

    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});
