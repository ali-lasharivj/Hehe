const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "description",
    alias: ["upgdesc", "gdesc"],
    react: "📜",
    desc: "Change the group description.",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, args, q, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("❌ I need to be an admin to update the group description.");
        if (!q) return reply("❌ Please provide a new group description.");

        await conn.groupUpdateDescription(from, q);
        reply("✅ Group description has been updated.");
    } catch (e) {
        console.error("Error updating group description:", e);
        reply("❌ Failed to update the group description. Please try again.");
    }
});

cmd({
    pattern: "left",
    alias: ["leave", "exit"],
    react: "👋🏻",
    desc: "Leave the current group.",
    category: "group",
    filename: __filename
},
async (robin, mek, m, { from, isGroup, isOwner, reply }) => {
    try {
        if (!isGroup) return reply("⚠️ This command can only be used in a group!");
        if (!isOwner) return reply("*уσυ αʀє ɴσт тнє σωɴєʀ! 🚩*");
        await robin.groupLeave(from);
    } catch (e) {
        console.error("Leave Error:", e);
        reply(`❌ Failed to leave the group. Error: ${e.message}`);
    }
});

cmd({
    pattern: "join",
    react: "📬",
    alias: ["joinme", "f_join"],
    desc: "To Join a Group from Invite link",
    category: "group",
    use: '.join < Group Link >',
    filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator, isDev, isAdmins, reply }) => {
    try {
        const msr = {
            own_cmd: "уσυ αʀє ɴσт тнє σωɴєʀ! 🚩*"
        };

        // Only allow the creator to use the command
        if (!isCreator) return reply(msr.own_cmd);

        // If there's no input, check if the message is a reply with a link
        if (!q && !quoted) return reply("*Please write the Group Link*️ 🖇️");

        let groupLink;

        // If the message is a reply to a group invite link
        if (quoted && quoted.type === 'conversation' && isUrl(quoted.text)) {
            groupLink = quoted.text.split('https://chat.whatsapp.com/')[1];
        } else if (q && isUrl(q)) {
            // If the user provided the link in the command
            groupLink = q.split('https://chat.whatsapp.com/')[1];
        }

        if (!groupLink) return reply("❌ *Invalid Group Link* 🖇️");

        // Accept the group invite
        await conn.groupAcceptInvite(groupLink);
        await conn.sendMessage(from, { text: `✔️ *Successfully Joined*` }, { quoted: mek });

    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.log(e);
        reply(`❌ *Error Occurred!!*\n\n${e}`);
    }
});

cmd({
    pattern: "groupname",
    alias: ["upgname", "gname"],
    react: "📝",
    desc: "Change the group name.",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, isOwner, args, q, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isOwner) return reply("❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("❌ I need to be an admin to update the group name.");
        if (!q) return reply("❌ Please provide a new group name.");

        await conn.groupUpdateSubject(from, q);
        reply(`✅ Group name has been updated to: *${q}*`);
    } catch (e) {
        console.error("Error updating group name:", e);
        reply("❌ Failed to update the group name. Please try again.");
    }
});

cmd({
    pattern: "ginfo",
    react: "🥏",
    alias: ["groupinfo"],
    desc: "Get group information.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, isCmd, isGroup, sender, isBotAdmins,
    isAdmins, isDev, reply, groupMetadata, participants
}) => {
    try {
        // Requirements
    // Check for group, bot admin, and user admin permissions
    if (!isGroup) return reply('This command can only be used in a group.');
    if (!isBotAdmins) return reply('*📛 ι ɴєє∂ тσ вє αɴ α∂мιɴ тσ ᴜѕє тнιѕ ᴄσммαɴ∂.*');
    if (!isAdmins) return reply('*📛 σɴℓʏ gʀσᴜᴘ α∂мιɴs σʀ тнє σωɴєʀ ᴄαɴ ᴜsє тнιѕ ᴄσммαɴ∂.*');

        const fallbackPpUrls = [
            'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
            'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
        ];
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(from, 'image');
        } catch {
            ppUrl = fallbackPpUrls[Math.floor(Math.random() * fallbackPpUrls.length)];
        }

        const metadata = await conn.groupMetadata(from);
        const groupAdmins = participants.filter(p => p.admin);
        const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
        const owner = metadata.owner || groupAdmins[0]?.id || "unknown";

        const gdata = `╭───「 *GROUP INFO* 」───◆
│ 🏷️ *ɢʀᴏᴜᴘ ɴᴀᴍᴇ:* ${metadata.subject}
│ 🆔 *ɢʀᴏᴜᴘ ɪᴅ:* ${metadata.id} 
│ 👥 *ᴛᴏᴛᴀʟ ᴍᴇᴍʙᴇʀs:* ${metadata.size}
│ 👨🏻‍💻 *ᴄʀᴇᴀᴛᴏʀ:* @${owner.split('@')[0]}  
│ 👑 *ᴀᴅᴍɪɴs:* (${groupAdmins.length})*:\n${listAdmin}
│ 📑 *ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:* ${metadata.desc?.toString() || 'No description'}
╰──────────────────◆`

        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: gdata,
            mentions: groupAdmins.map(v => v.id).concat([owner])
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`❌ An error occurred:\n\n${e}`);
    }
});

cmd({
  pattern: "getgpp",
   alias: ["getgcpp"],
  category: "group",
  desc: "Send the profile picture of the group",
  filename: __filename
}, async (conn, m, msg, { isGroup, reply }) => {
  try {
    if (!isGroup) return reply("❌ this command only working in group.");

    const groupJid = m.chat;

    let ppUrl;
    try {
      // Try to fetch high resolution photo first
      ppUrl = await conn.profilePictureUrl(groupJid, "image");
    } catch (e) {
      // Fallback to low res if high res fails
      try {
        ppUrl = await conn.profilePictureUrl(groupJid);
      } catch (err) {
        return reply("❌ can't find group picture or not set.");
      }
    }

    await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption: "🖼️ Profile picture of group" }, { quoted: m });

  } catch (err) {
    console.error("getgcpp Error:", err);
    reply(`❌ error :\n${err.message}`);
  }
});

cmd({
  pattern: "getallgc",
  desc: "Get all group invite links with their names and participant count",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    let allGroups = await conn.groupFetchAllParticipating();
    let groupIds = Object.keys(allGroups);

    if (groupIds.length === 0) {
      return reply("❌ No groups found.");
    }

    let resultText = `📋 *List of Groups and Invite Links*\n\n`;

    for (let groupId of groupIds) {
      try {
        let metadata = allGroups[groupId];
        let name = metadata.subject || "Unnamed";
        let participantsCount = metadata.participants.length;

        // Try to get group invite code
        let inviteCode = await conn.groupInviteCode(groupId);
        let inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

        resultText += `📌 *${name}*\n👥 Members: ${participantsCount}\n🔗 Link: ${inviteLink}\n\n`;
      } catch (err) {
        console.log(`⚠️ Failed to fetch invite for group ${groupId}:`, err);
        resultText += `📌 *${allGroups[groupId].subject || "Unnamed"}*\n❌ Failed to fetch link\n\n`;
      }
    }

    reply(resultText);
  } catch (err) {
    console.error("getallgc Error:", err);
    reply(`❌ Error occurred:\n${err.message}`);
  }
});     

cmd({
  pattern: "kick",
  alias: ["k", "✈️"],
  desc: "Removes a participant by replying to or mentioning their message. (Admins can also be kicked)",
  react: "🚪",
  category: "group",
  filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    isAdmins,
    isOwner,
    participants,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        // Only admins or the owner can use this command
        if (!isAdmins && !isOwner) return reply("*📛 σɴℓʏ gʀσᴜᴘ α∂мιɴs σʀ тнє σωɴєʀ ᴄαɴ ᴜsє тнιѕ ᴄσммαɴ∂.*");
        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply("*📛 ι ɴєє∂ тσ вє αɴ α∂мιɴ тσ кι¢к мємвєʀs.*");
        
        // Determine the target user using reply or mention
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length > 0) {
            target = m.msg.contextInfo.mentionedJid[0];
        }
        
        if (!target) {
            return reply("❌ Please mention or reply to the message of the participant to remove.");
        }
        
        // Remove the participant from the group (admins can also be kicked)
        await conn.groupParticipantsUpdate(from, [target], "remove")
          .catch(err => {
              console.error(`⚠️ Failed to remove ${target}:`, err);
              return reply("❌ An error occurred while trying to remove the participant.");
          });
        
        // Extraire le tag à partir du JID (ex: "1234567890" sans "@s.whatsapp.net")
        const tag = target.split('@')[0];
        reply(`*@${tag} кι¢кє∂ ѕᴜᴄᴄєѕѕfᴜℓℓу!*`, { mentions: [target] });
    } catch (error) {
        console.error('Error while executing kick:', error);
        reply('❌ An error occurred while executing the command.');
    }
});


cmd({
    pattern: "invite",
    desc: "Get group invite link.",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { isGroup, isBotAdmins, from, reply }) => {
    try {
        if (!isGroup) return reply("*This command can only be used in groups!*");
        if (!isBotAdmins) return reply("*I'm not an admin, so I can't generate an invite link!*");

        const groupInviteCode = await conn.groupInviteCode(from);
        const inviteLink = `https://chat.whatsapp.com/${groupInviteCode}`;

        return conn.sendMessage(from, {
            text: `*Here is the group invite link.*\n${inviteLink}`,
            linkPreview: false
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        return reply("*Error fetching the invite link. Please try again later!*");
    }
});

cmd({
    pattern: "mute",
    alias: ["groupmute"],
    react: "🔇",
    desc: "Mute the group (Only admins can send messages).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isOwner, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isOwner) return reply("*📛 ᴏɴʟʏ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴs ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");
        if (!isBotAdmins) return reply("*📛 ɴᴇᴇᴅ ᴛᴏ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜɴᴍᴜᴛᴇ ᴛʜᴇ ɢʀᴏᴜᴘ*");
        
        await conn.groupSettingUpdate(from, "announcement");
        reply("*gʀσᴜρ мᴜтє∂ sᴜᴄᴄєѕѕfᴜℓℓу 🔐*");
    } catch (e) {
        console.error("Error muting group:", e);
        reply("❌ Failed to mute the group. Please try again.");
    }
});

cmd({
    pattern: "lockgc",
    alias: ["lock"],
    react: "🔒",
    desc: "Lock the group (Prevents new members from joining).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isOwner) return reply("❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("❌ I need to be an admin to lock the group.");

        await conn.groupSettingUpdate(from, "locked");
        reply("✅ Group has been locked Ony Settings Changed Admins");
    } catch (e) {
        console.error("Error locking group:", e);
        reply("❌ Failed to lock the group. Please try again.");
    }
});

cmd({
    pattern: "promote",
    react: "👑",
    alias: ["addadmin"],
    desc: "Promote a user to admin.",
    category: "group",
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    isAdmins,
    isOwner,
    participants,
    isBotAdmins,
    reply
}) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isOwner) return reply("*📛 ᴏɴʟʏ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴs ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");
        if (!isBotAdmins) return reply("*📛 ɴᴇᴇᴅ ᴛᴏ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜɴᴍᴜᴛᴇ ᴛʜᴇ ɢʀᴏᴜᴘ*");

        // ➡️ Détecter le participant à promouvoir (en réponse ou mention)
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length > 0) {
            target = m.msg.contextInfo.mentionedJid[0];
        }

        if (!target) return reply("*ρℓєαѕє мєɴтισɴ σʀ ʀєρℓу тσ α υѕєʀ тσ ρʀσмσтє 🚩*");

        // ➡️ Vérifier si l'utilisateur est déjà admin
        const isAlreadyAdmin = participants.some(p => p.id === target && p.admin !== null);
        if (isAlreadyAdmin) return reply("❗ User is already an admin.");

        // ➡️ Promouvoir le participant
        await conn.groupParticipantsUpdate(from, [target], "promote")
            .catch(err => {
                console.error(`⚠️ Failed to promote ${target}:`, err);
                return reply("❌ An error occurred while promoting the participant.");
            });

        // ➡️ Extraire le tag à partir du JID
        const tag = target.split('@')[0];
        reply(`*@${tag} ᴘʀσмσтє∂ ѕυᴄᴄєѕѕfυℓℓу*`, { mentions: [target] });

    } catch (error) {
        console.error('Error while executing promote:', error);
        reply('❌ An error occurred while executing the command.');
    }
});

cmd({
    pattern: "demote",
    react: "🤡",
    alias: ["dismiss"],
    desc: "Demote a user from admin.",
    category: "group",
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    isAdmins,
    isOwner,
    participants,
    isBotAdmins,
    reply
}) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isOwner) return reply("*📛 ᴏɴʟʏ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴs ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");
        if (!isBotAdmins) return reply("*📛 ɴᴇᴇᴅ ᴛᴏ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜɴᴍᴜᴛᴇ ᴛʜᴇ ɢʀᴏᴜᴘ*");

        // ➡️ Détecter le participant à rétrograder (en réponse ou mention)
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length > 0) {
            target = m.msg.contextInfo.mentionedJid[0];
        }

        if (!target) return reply("*ρℓєαѕє мєɴтισɴ σʀ ʀєρℓу тσ α υѕєʀ тσ ∂ємσтє 🚩*");

        // ➡️ Vérifier si l'utilisateur est bien admin
        const isAdmin = participants.some(p => p.id === target && p.admin !== null);
        if (!isAdmin) return reply("❗ User is not an admin.");

        // ➡️ Rétrograder le participant
        await conn.groupParticipantsUpdate(from, [target], "demote")
            .catch(err => {
                console.error(`⚠️ Failed to demote ${target}:`, err);
                return reply("❌ An error occurred while demoting the participant.");
            });

        // ➡️ Extraire le tag à partir du JID
        const tag = target.split('@')[0];
        reply(`*@${tag} ∂ємσтє∂ ѕυᴄᴄєѕѕfυℓℓу*`, { mentions: [target] });

    } catch (error) {
        console.error('Error while executing demote:', error);
        reply('❌ An error occurred while executing the command.');
    }
});

cmd({
    pattern: "revoke",
    react: "🖇️",
    alias: ["revokegrouplink", "resetglink", "revokelink"],
    desc: "To Reset the group link",
    category: "group",
    use: '.revoke',
    filename: __filename
},
async (conn, mek, m, {
    from, isCmd, isGroup, sender, isOwner, isBotAdmins,
    isAdmins, reply
}) => {
    try {
        if (!isGroup) return reply(`❌ This command only works in groups.`);
        if (!isAdmins && !isOwner) return reply(`⛔ You must be a *Group Admin* to use this command.`);
        if (!isBotAdmins) return reply(`❌ I need to be *admin* to reset the group link.`);

        await conn.groupRevokeInvite(from);
        await conn.sendMessage(from, {
            text: `✅ *Group Link has been reset successfully!*`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply(`❌ Error resetting group link.`);
    }
});

cmd({
    pattern: "unlockgc",
    alias: ["unlock"],
    react: "🔓",
    desc: "Unlock the group (Allows new members to join).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isOwner, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins && !isOwner) return reply("❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("❌ I need to be an admin to unlock the group.");

        await conn.groupSettingUpdate(from, "unlocked");
        reply("✅ Group has been unlocked. All Members Settings Changed This Group");
    } catch (e) {
        console.error("Error unlocking group:", e);
        reply("❌ Failed to unlock the group. Please try again.");
    }
});

cmd({
    pattern: "unmute",
    alias: ["groupunmute"],
    react: "🔊",
    desc: "Unmute the group (Everyone can send messages).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("*📛 ᴏɴʟʏ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴs ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.*");
        if (!isBotAdmins) return reply("*📛 ɴᴇᴇᴅ ᴛᴏ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴜɴᴍᴜᴛᴇ ᴛʜᴇ ɢʀᴏᴜᴘ*");

        await conn.groupSettingUpdate(from, "not_announcement");
        reply("*gʀσᴜρ ᴜɴмυтє∂ sᴜᴄᴄєѕѕfᴜℓℓу🔓*");
    } catch (e) {
        console.error("Error unmuting group:", e);
        reply("❌ Failed to unmute the group. Please try again.");
    }
});
