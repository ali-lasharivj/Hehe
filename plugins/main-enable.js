const fs = require("fs");
const { cmd, commands } = require('../command');
const config = require('../config');
const axios = require('axios');
const prefix = config.PREFIX;
const AdmZip = require("adm-zip");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');


cmd({
    pattern: "mode",
    react: "🫟",
    desc: "Set bot mode to private or public.",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    // Si aucun argument n'est fourni, afficher le mode actuel et l'usage
    if (!args[0]) {
        return reply(`*🏷️ єχαмρℓє: мσ∂є ρυвℓι¢/ρʀιναтє*`);
    }

    const modeArg = args[0].toLowerCase();

    if (modeArg === "private") {
        config.MODE = "private";
        return reply("*🛰️ вσт мσ∂є ιѕ ɴσω ѕєт тσ ρʀιναтє*");
    } else if (modeArg === "public") {
        config.MODE = "public";
        return reply("*✅ вσт мσ∂є ιѕ ɴσω ѕєт тσ ρυвℓι¢*")
        const {exec} = require("child_process")
reply("*_RESTARTING NOW...🚀_*")
await sleep(1500)
exec("pm2 restart all")
reply("*_ALI-MD STARTED NOW...🚀_*");
    } else {
        return reply("*🏷️ єχαмρℓє: мσ∂є ρυвℓι¢/ρʀιναтє*");
    }
});


cmd({
    pattern: "admin-action",
    alias: ["admin-status"],
    desc: "Enable or disable admin event notifications",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ADMIN_ACTION = "true";
        return reply("*✅ α∂мιɴ-ѕтαтυѕ нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.ADMIN_ACTION = "false";
        return reply("*❌ α∂мιɴ-ѕтαтυѕ нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: α∂мιɴ-ѕтαтυѕ σɴ/σff*`);
    }
});

cmd({
    pattern: "welcome",
    alias: ["wc"],
    desc: "Enable or disable welcome messages for new members",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.WELCOME = "true";
        return reply("*✅ gσσ∂вує нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.WELCOME = "false";
        return reply("*❌ gσσ∂вує нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: ωєℓ¢σмє σɴ/σff*`);
    }
});

cmd({
    pattern: "anti-call",
    react: "🫟",
    alias: ["anticall"],
    desc: "Enable or disable welcome messages for new members",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTI_CALL = "true";
        return reply("*✅ αɴтι-¢αℓℓ нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.ANTI_CALL = "false";
        return reply("*❌ αɴтι-¢αℓℓ нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: αɴтι-¢αℓℓ σɴ/σff*`);
    }
});


cmd({
    pattern: "goodbye",
    alias: ["gb"],
    desc: "Enable or disable welcome messages for new members",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.GOODBYE = "true";
        return reply("*✅ gσσ∂вує нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.GOODBYE = "false";
        return reply("*❌ gσσ∂вує нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .gσσ∂вує σɴ/σff*`);
    }
});

cmd({
    pattern: "auto-typing",
    description: "Enable or disable auto-typing feature.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🏷️ єχαмρℓє: .αυтσ-туριɴg σɴ/σff*");
    }

    config.AUTO_TYPING = status === "on" ? "true" : "false";
    return reply(`*✅ αυтσ-туριɴg нαѕ вєєɴ ${status}.*`);
});

//mention reply 

cmd({
    pattern: "mention-reply",
    alias: ["menetionreply", "mee"],
    description: "Set bot status to always online or offline.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.MENTION_REPLY = "true";
        return reply("*✅ мєɴтισɴ-ʀєρℓу нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.MENTION_REPLY = "false";
        return reply("*❌ мєɴтισɴ-ʀєρℓу нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .мєɴтισɴ-ʀєρℓу σɴ/σff*`);
    }
});
//--------------------------------------------
// ALWAYS_ONLINE COMMANDS
//--------------------------------------------
cmd({
    pattern: "always-online",
    alias: ["alwaysonline"],
    desc: "Enable or disable the always online mode",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ALWAYS_ONLINE = "true";
        await reply("*✅ αℓωαуѕ-σɴℓιиє нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.ALWAYS_ONLINE = "false";
        await reply("*❌ αℓωαуѕ-σɴℓιиє нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        await reply(`*🏷️ єχαмρℓє: .αℓωαуѕ-σɴℓιиє σɴ/σff*`);
    }
});
//--------------------------------------------
//  AUTO_RECORDING COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-recording",
    alias: ["autorecoding"],
    description: "Enable or disable auto-recording feature.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("*🏷️ єχαмρℓє: .αυтσ-ʀє¢σʀ∂ιɴg σɴ/σff*");
    }

    config.AUTO_RECORDING = status === "on" ? "true" : "false";
    if (status === "on") {
        await conn.sendPresenceUpdate("recording", from);
        return reply("*✅ αυтσ-ʀє¢σʀ∂ιɴg нαѕ вєєɴ єɴαвℓє∂*");
    } else {
        await conn.sendPresenceUpdate("available", from);
        return reply("*❌ αυтσ-ʀє¢σʀ∂ιɴg нαѕ вєєɴ ∂ιѕαвℓє∂*");
    }
});
//--------------------------------------------
// AUTO_VIEW_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-seen",
    alias: ["autostatusview","status-view"],
    desc: "Enable or disable auto-viewing of statuses",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_VIEW_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_SEEN = "true";
        return reply("*✅ ѕтαтυѕ-νιєω нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_SEEN = "false";
        return reply("*❌ ѕтαтυѕ-νιєω нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .ѕтαтυѕ-νιєω σɴ/σff*`);
    }
}); 
//--------------------------------------------
// AUTO_LIKE_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "status-react",
    alias: ["statusreaction"],
    desc: "Enable or disable auto-liking of statuses",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_LIKE_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_REACT = "true";
        return reply("*✅ ѕтαтυѕ-ʀєα¢т нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REACT = "false";
        return reply("*❌ ѕтαтυѕ-ʀєα¢т нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .ѕтαтυѕ-ʀєα¢т σɴ/σff*`);
    }
});
//--------------------------------------------
//  READ-MESSAGE COMMANDS
//--------------------------------------------
cmd({
    pattern: "read-message",
    alias: ["autoread"],
    desc: "enable or disable readmessage.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.READ_MESSAGE = "true";
        return reply("*✅ ʀєα∂-мєѕѕαgє нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.READ_MESSAGE = "false";
        return reply("*❌ ʀєα∂-мєѕѕαgє нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: ʀєα∂-мєѕѕαgє σɴ/σff*`);
    }
});

// AUTO_VOICE

cmd({
    pattern: "auto-voice",
    alias: ["autovoice"],
    desc: "enable or disable readmessage.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_VOICE = "true";
        return reply("*✅ αυтσ-νσι¢є нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_VOICE = "false";
        return reply("*❌ αυтσ-νσι¢є нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .αυтσ-νσι¢є σɴ/σff*`);
    }
});
//--------------------------------------------
//  AUTO-STICKER COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-sticker",
    alias: ["autosticker"],
    desc: "enable or disable auto-sticker.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_STICKER = "true";
        return reply("*✅ αυтσ-ѕтι¢кєʀ нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_STICKER = "false";
        return reply("*❌ αυтσ-ѕтι¢кєʀ нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .αυтσ-ѕтι¢кєʀ σɴ/σff*`);
    }
});
//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-reply",
    alias: ["autoreply"],
    desc: "enable or disable auto-reply.",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REPLY = "true";
        return reply("*✅ αυтσ-ʀєρℓу нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_REPLY = "false";
        return reply("*❌ αυтσ-ʀєρℓу нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .αυтσ-ʀєρℓу σɴ/σff*`);
    }
});
//--------------------------------------------
//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto-react",
    alias: ["autoreact"],
    desc: "Enable or disable the autoreact feature",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REACT = "true";
        await reply("*✅ αυтσ-ʀєα¢т нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_REACT = "false";
        await reply("*❌ αυтσ-ʀєα¢т нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        await reply(`*🏷️ єχαмρℓє: .αυтσ-ʀєα¢т σɴ/σff*`);
    }
});

cmd({
  pattern: "🍼",
  alias: ["l"],
  desc: "Leaves the current group",
}, async (conn, mek, m, { from, reply }) => {
  try {
    // `from` is the group chat ID
    await conn.groupLeave(from);
    reply("Successfully left the group🙂.");
  } catch (error) {
    console.error(error);
    reply("Failed to leave the group.🤦🏽‍♂️");
  }
});

cmd({
    pattern: "owner-react",
    alias: ["ownerreact","selfreact"],
    desc: "Enable or disable the autoreact feature",
    category: "owner",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.OWNER_REACT = "true";
        await reply("*✅ σωɴєʀ-ʀєα¢т нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.OWNER_REACT = "false";
        await reply("*❌ σωɴєʀ-ʀєα¢т нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        await reply(`*🏷️ єχαмρℓє: .σωɴєʀ-ʀєα¢т σɴ/σff*`);
    }
});
