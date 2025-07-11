const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const FormData = require("form-data");
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');
const commandPrefix = config.PREFIX;


cmd({
    pattern: "menu",
    alias: ["help", "commands"],
    desc: "Show all menu categories",
    category: "menu",
    react: "⏳",
    filename: __filename
},
async (conn, mek, m, { from, pushname: _0x1279c5, reply }) => {
    try {
        const os = require("os");
        const uptime = process.uptime();
        const totalMem = os.totalmem() / (1024 ** 3);
        const freeMem = os.freemem() / (1024 ** 3);
        const usedMem = totalMem - freeMem;

        const version = "𝟐.𝟎.𝟎";
        const plugins = commands.length;
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", { hour12: true, timeZone: "Asia/Karachi" });
        const date = now.toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" });

        const days = Math.floor(uptime / (3600 * 24));
        const hours = Math.floor((uptime % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeStr = `${days}ᴅ ${hours}ʜ ${minutes}ᴍ ${seconds}s`;

        let menuText = `*╭┈──「${config.BOT_NAME}」┈───⊷*
*│ 🫟 ᴍᴏᴅᴇ: ${config.MODE}*
*│ 🪄 ᴘʀᴇғɪx: ${commandPrefix}*
*│ 🇦🇱 xᴅ ᴜsᴇʀ:* ${_0x1279c5 || "User"}
*│ 📍 ᴘʟᴜɢɪɴs: ${plugins}*
*│ 🎐 ᴠᴇʀsɪᴏɴ : 𝟻.𝟶︎.𝟶︎*
*│ 📟 ᴜᴘᴛɪᴍᴇ: ${uptimeStr}*
*│ ⏰ ᴛɪᴍᴇ ɴᴏᴡ: ${time}*
*│ 📅 ᴅᴀᴛᴇ ᴛᴏᴅᴀʏ: ${date}*
*│ 👑 ᴄʀᴇᴀᴛᴏʀ: ᴀʟɪ xᴅ*
‎*╰┈─────────────────┈⊷*\n`;

        // حذف دسته‌های menu، nothing و misc
        const filteredCommands = commands.filter(cmd =>
            !["menu", "nothing", "misc"].includes(cmd.category)
        );

        const categories = [...new Set(filteredCommands.map(cmd => cmd.category))];

        const fancy = (txt) => {
            const map = {
                a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ',
                g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ',
                m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
                s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x',
                y: 'ʏ', z: 'ᴢ', "1": "1", "2": "2", "3": "3",
                "4": "4", "5": "5", "6": "6", "7": "7", "8": "8",
                "9": "9", "0": "0", ".": ".", "-": "-", "_": "_"
            };
            return txt.split('').map(c => map[c.toLowerCase()] || c).join('');
        };

        for (const category of categories) {
            const cmdsInCat = filteredCommands.filter(cmd => cmd.category === category);
            if (cmdsInCat.length === 0) continue;

            menuText += `\`${category.toUpperCase()}\`\n‎*╭──────────────────✑*\n`;
            cmdsInCat.forEach(cmd => {
                menuText += `‎*┋* *⬡  ${fancy(cmd.pattern)}*\n`;
            });
            menuText += `‎*╰──────────────────✑*\n\n`;
        }

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://qu.ax/zrqFX.jpg' }, 
            caption: menuText.trim(),
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363318387454868@newsletter',
                    newsletterName: config.BOT_NAME, 
                    serverMessageId: 143
        }
      }
    }, { quoted: mek });
    

  } catch (e) {
    console.error("❌ Error in menu:", e);
    reply(`❌ Menu error: ${e.message}`);
  }
});
