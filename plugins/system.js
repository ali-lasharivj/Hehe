const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const FormData = require("form-data");
const config = require('../config');
const { cmd, commands } = require('../command');
const moment = require("moment");
let botStartTime = Date.now(); // Recording the start time of the bot

cmd({
    pattern: "runtime",
    desc: "Check bot online or no.",
    react: "🌸",
    alias: ["uptime" ,"runtime"],
    category: "info",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Variables
        const name = pushname || conn.getName(sender);
        const murl = 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47';
        const img = 'https://i.imgur.com/vTs9acV.jpeg';
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", { hour12: true, timeZone: "Asia/Karachi" });
        const date = now.toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" });
        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        const formattedInfo = `
👤 *ʜᴇʏ* ${pushname}
🕒 *ᴛɪᴍᴇ*: *${time}*
📅 *ᴅᴀᴛᴇ*: *${date}*
⏳ *ᴜᴘᴛɪᴍᴇ*: *${runtimeHours} ʜᴏᴜʀs, ${runtimeMinutes} ᴍɪɴᴜᴛᴇs, ${runtimeSeconds} sᴇᴄᴏɴᴅs*
`.trim();

        // Constructing the contact message
        const con = {
            key: {
                fromMe: false,
                participant: `${sender.split('@')[0]}@s.whatsapp.net`,
                ...(isGroup ? { remoteJid: '923003588997@s.whatsapp.net' } : {}),
            },
            message: {
                contactMessage: {
                    displayName: name,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                },
            },
        };

        // Text message with context info
        const message = {
            text: formattedInfo,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363318387454868@newsletter',
                    newsletterName: '—˹𝐀ɭīī 𝐌Ɗ 𝐒ʊ̊𝐏𝐏๏፝֟ɼʈ⎯꯭̽💀🚩',
                    serverMessageId: -1
                },
                mentionedJid: [sender],
                externalAdReply: {
                    title: config.BOT_NAME || 'ALI-MD 🥀',
                    body: config.DESCRIPTION || 'POWERED BY ALI INXIDE 🤌💗',
                    thumbnailUrl: config.ALIVE_IMG || 'https://files.catbox.moe/6ku0eo.jpg',
                    sourceUrl: murl,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                },
            }
        };

        // Send the message
        await conn.sendMessage(from, message, { quoted: con });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
