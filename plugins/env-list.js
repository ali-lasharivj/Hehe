const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;

cmd({
    pattern: "allvar",
    react: "🎐",
    alias: ["setting" ,"settings"],
    desc: "cheack uptime",
    category: "info",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `*⚙️ \`BOT-SETTINGS\` ⚙️*
‎*╭──────────────────✑*
‎*┋ \`MODE ${config.MODE || "public"}*
‎*┋ υѕαgє: ${config.PREFIX}mode private/public*
‎*┋ \`AUTO-TYPING ${config.AUTO_TYPING || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αυтσтуριɴg σɴ/σff*
‎*┋ \`ALWAYS-ONLINE ${config.ALWAYS_ONLINE || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αℓωαуѕσɴℓιɴє σɴ/σff*
‎*┋ \`AUTO-RECORDING ${config.AUTO_RECORDING || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αυтσʀєᴄσʀ∂ιɴg σɴ/σff*
‎*┋ \`STATUS-REACTION ${config.AUTO_STATUS_REACT || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}statusreact on/off*
‎*┋ \`BAD-WORD ${config.ANTI_BAD_WORD || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αɴтιвα∂ σɴ/σff*
‎*┋ \`ANTI-DELETE ${config.ANTI_DELETE || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αɴтι∂єℓєтє σɴ/σff*
‎*┋ \`AUTO-STICKER ${config.AUTO_STICKER || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αυтσѕтιᴄкєʀ σɴ/σff*
‎*┋ \`AUTO-REPLY ${config.AUTO_REPLY || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αυтσʀєρℓу σɴ/σff*
‎*┋ \`AUTO-REACT ${config.AUTO_REACT || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αυтσʀєαᴄт σɴ/σff*
‎*┋ \`STATUS-REPLY ${config.AUTO_STATUS_REPLY || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αυтσѕтαтυѕʀєρℓу σɴ/σff*
‎*┋ \`ANTI LINK ${config.ANTI_LINK_KICK || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αɴтιℓιɴк <σρтισɴ>*
‎*┋ \`OWNER-REACT ${config.OWNER_REACT || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}σωɴєʀʀєαᴄт σɴ/σff
‎*┋ \`ANTI-CALL ${config.ANTI_CALL || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}αɴтιᴄαℓℓ σɴ/σff*
‎*┋ \`ADMIN-STATUS ${config.ADMIN_STATUS || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}α∂мιɴ-ѕтαтυѕ σɴ/σff*
‎*┋ \`WEL-COME ${config.WELCOME || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}ωєℓᴄσмє σɴ/σff*
‎*┋ \`GOOD-BYE ${config.GOODBYE || "off"}\`*
‎*┋ υѕαgє: ${config.PREFIX}gσσ∂вує σɴ/σff*
*╰──────────────────✑*
*📍ɴσтє: ʀєρℓα¢є \`"σɴ/σff"\` ωιтн тнє ∂єѕιʀє∂ ѕтαтє тσ єɴαвℓє σʀ ∂ιѕαвℓє α fєαтυʀє.*
`
if (!config.ALIVE_IMG.includes('mp4')) {
await conn.sendMessage(from,{image:{url: config.ALIVE_IMG},caption:status,
                             contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363318387454868@newsletter',
      newsletterName: config.BOT_NAME,
      serverMessageId: 999
    }
  }
}, { quoted: mek });
} else {
await conn.sendMessage(from,{video:{url: config.ALIVE_IMG},caption:status,
                             contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363318387454868@newsletter',
      newsletterName: config.BOT_NAME,
      serverMessageId: 999
    }
  }
}, { quoted: mek });
}
} catch (e) {
console.log(e)
reply(`${e}`)
}
})
