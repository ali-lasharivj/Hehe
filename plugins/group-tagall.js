const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')


cmd({
    pattern: "tagall",
    react: "📑",
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, isAdmins, reply, isGroup, senderNumber, groupAdmins, prefix, command, isCreator, args, pushname, body }) => {
    try {
        if (!isGroup) return reply("*📛 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs.*");
        
        const botOwner = conn.user.id.split(":")[0]; // Extract bot owner's number
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!isCreator && !isAdmins) {
            return reply("*📛 σɴℓʏ gʀσᴜᴘ α∂мιɴs σʀ тнє σωɴєʀ ᴄαɴ ᴜsє тнιѕ ᴄσммαɴ∂.*");
        }

        // Ensure group metadata is fetched properly
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ No members found in this group.");

        let emojis = ['⚡', '✨', '🎖️', '💎', '🔱', '💗',  '❤‍🩹', '👻', '🌟', '🪄', '🎋', '🪼', '🍿', '👀', '👑', '🦋', '🐋', '🌻', '🌸', '🔥', '🍉', '🍧', '🍨', '🍦', '🧃', '🪀', '🎾', '🪇', '🎲', '🎡', '🧸', '🎀', '🎈', '🩵', '♥️', '🚩' , '🏳️‍🌈', '🔪', '🎏', '🫐', '🍓', '🍇', '🐍', '🪻', '🪸', '💀', '🇦🇱'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Proper message extraction
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "αттєитισи єνєяуσиє"; // Default message

        let teks = `*➲ мєѕѕαgє: ${message}*\n*➲ αυтнσя:* ${pushname}\n\n*╭┈──✪〘 𝐌𝐄𝐍𝐓𝐈𝐎𝐍𝐒 〙✪───*\n`;

        for (let mem of participants) {
            if (!mem.id) continue; // Prevent undefined errors
            teks += `*│${randomEmoji} ᩧ𝆺ྀི𝅥* @${mem.id.split('@')[0]}\n`;
	}

        conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});

cmd({
    pattern: "tagadmins",
    react: "👑",
    alias: ["admin" ,"admin","tagadmin"],
    desc: "To Tag all Admins of the Group",
    category: "group",
    use: '.tagadmins [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        
        const botOwner = conn.user.id.split(":")[0]; // Extract bot owner's number
        const senderJid = senderNumber + "@s.whatsapp.net";

        // Ensure group metadata is fetched properly
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let admins = await getGroupAdmins(participants);
        let totalAdmins = admins ? admins.length : 0;
        if (totalAdmins === 0) return reply("❌ No admins found in this group.");

        let emojis = ['⚡', '✨', '🎖️', '💎', '🔱', '💗',  '❤‍🩹', '👻', '🌟', '🪄', '🎋', '🪼', '🍿', '👀', '👑', '🦋', '🐋', '🌻', '🌸', '🔥', '🍉', '🍧', '🍨', '🍦', '🧃', '🪀', '🎾', '🪇', '🎲', '🎡', '🧸', '🎀', '🎈', '🩵', '♥️', '🚩' , '🏳️‍🌈', '🔪', '🎏', '🫐', '🍓', '🍇', '🐍', '🪻', '🪸', '💀'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Proper message extraction
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "ATTENTION ADMINS"; // Default message

        let teks = `*▢ GROUP : ${groupName}*\n*▢ ADMINS : ${totalAdmins}*\n*▢ MESSAGE: ${message}*\n\n‎*╭──❍「 ADMINS MENTION 」❍*\n`;

        for (let admin of admins) {
            if (!admin) continue; // Prevent undefined errors
            teks += `*│${randomEmoji} ᩧ𝆺ྀི𝅥* @${admin.split('@')[0]}\n`;
        }

       // teks += "└──✪ ALI ┃ MD ✪──";

        conn.sendMessage(from, { text: teks, mentions: admins }, { quoted: mek });

    } catch (e) {
        console.error("TagAdmins Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});
      
