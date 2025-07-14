const { cmd } = require("../command");
const axios = require("axios");

// 1. Joke
cmd({
  pattern: "joke",
  desc: "Get a random joke",
  category: "fun",
  filename: __filename,
}, async (conn, m, { reply }) => {
  try {
    const { data } = await axios.get("https://official-joke-api.appspot.com/random_joke");
    reply(`${data.setup}\n${data.punchline}`);
  } catch {
    reply("😔 Couldn't fetch a joke.");
  }
});

// 2. Meme
cmd({
  pattern: "meme",
  desc: "Get a random meme",
  category: "fun",
  filename: __filename,
}, async (conn, m) => {
  try {
    const { data } = await axios.get("https://meme-api.com/gimme");
    await conn.sendMessage(m.chat, { image: { url: data.url }, caption: data.title }, { quoted: m });
  } catch {
    await conn.sendMessage(m.chat, { text: "😔 Couldn't fetch a meme." }, { quoted: m });
  }
});
// 5. Say
cmd({
  pattern: "say",
  desc: "Echo your message",
  category: "fun",
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  if (!args.length) return reply("🔊 Say something!");
  reply(args.join(" "));
});

// 7. Rate
cmd({
  pattern: "rate",
  desc: "Rate someone",
  category: "fun",
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  const name = args.join(" ") || "You";
  const rate = Math.floor(Math.random() * 100);
  reply(`📊 ${name} is ${rate}% cool!`);
});

// 9. Reverse
cmd({
  pattern: "reverse",
  desc: "Reverse text",
  category: "fun",
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  if (!args.length) return reply("🔁 Give text to reverse");
  reply(args.join(" ").split("").reverse().join(""));
});


// 11. Rock Paper Scissors
cmd({
  pattern: "rps",
  desc: "Play rock paper scissors",
  category: "fun",
  filename: __filename,
}, async (conn, m, { reply }) => {
  const choices = ["Rock", "Paper", "Scissors"];
  reply(`🎮 I choose: ${choices[Math.floor(Math.random() * choices.length)]}`);
});

// 12. Slots
cmd({
  pattern: "slots",
  desc: "Slot machine game",
  category: "fun",
  filename: __filename,
}, async (conn, m, { reply }) => {
  const items = ["🍒", "🍋", "🍉", "⭐", "💎"];
  const spin = [0, 0, 0].map(() => items[Math.floor(Math.random() * items.length)]);
  reply(`🎰 ${spin.join(" | ")}\n${(new Set(spin).size === 1) ? "🎉 Jackpot!" : "😢 Try again"}`);
});
// 14. Guess number
cmd({
  pattern: "guess",
  desc: "Guess a number 1-10",
  category: "fun",
  filename: __filename,
}, async (conn, m, { reply }) => {
  const number = Math.floor(Math.random() * 10) + 1;
  reply(`🤔 I'm thinking of a number 1-10... it's ${number}`);
});

// 17. Typing effect
cmd({
  pattern: "type",
  desc: "Typing simulation",
  category: "fun",
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  const msg = args.join(" ");
  if (!msg) return reply("💬 Give something to type");
  for (let i = 1; i <= msg.length; i++) {
    await new Promise(r => setTimeout(r, 100));
    await reply(msg.slice(0, i));
  }
});

// 18. Howgay
cmd({
  pattern: "howgay",
  desc: "How gay are you?",
  category: "fun",
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  const name = args.join(" ") || "You";
  const percent = Math.floor(Math.random() * 100);
  reply(`🌈 ${name} is ${percent}% gay today!`);
});

// 19. Sayjoke (TTS)
cmd({
  pattern: "sayjoke",
  desc: "Tell a joke with TTS",
  category: "fun",
  filename: __filename,
}, async (conn, m) => {
  const jokes = [
    "Why did the chicken cross the road? To get to the other side!",
    "I'm on a seafood diet. I see food and I eat it."
  ];
  const text = jokes[Math.floor(Math.random() * jokes.length)];
  const ttsUrl = `https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(text)}&speaker=1`;
  try {
    await conn.sendMessage(m.chat, { audio: { url: ttsUrl }, mimetype: "audio/mpeg", ptt: true }, { quoted: m });
  } catch {
    await conn.sendMessage(m.chat, { text }, { quoted: m });
  }
});

// 20. Textart
cmd({
  pattern: "textart",
  desc: "Random ASCII art",
  category: "fun",
  filename: __filename,
}, async (conn, m, { reply }) => {
  const arts = [
    "(¯`·.¸¸.·´¯)",
    "(¯`·.¸¸.-> ❤️ <-.¸¸.·´¯)",
    "(づ｡◕‿‿◕｡)づ",
    "(╯°□°）╯︵ ┻━┻"
  ];
  reply(arts[Math.floor(Math.random() * arts.length)]);
});
