const axios = require("axios");
const { cmd } = require("../command");

// Facebook Downloader v1 (basic)
cmd({
  pattern: "fb",
  alias: ["facebook", "fbvideo2"],
  react: '📥',
  desc: "Download videos from Facebook (Basic API)",
  category: "download",
  use: ".fb <Facebook video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const fbUrl = args[0];
    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply('Please provide a valid Facebook video URL. Example: `.fb https://facebook.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://apis.davidcyriltech.my.id/facebook?url=${encodeURIComponent(fbUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.status || !response.data.result || !response.data.result.downloads) {
      return reply('❌ Unable to fetch the video. Please check the URL and try again.');
    }

    const { title, downloads } = response.data.result;
    const downloadLink = downloads.hd?.url || downloads.sd.url;
    const quality = downloads.hd ? "HD" : "SD";

  //  await reply('Downloading video... Please wait.📥');

    await conn.sendMessage(from, {
      video: { url: downloadLink },
      caption: `*🏓 fα¢євσσк ∂σωиℓσα∂є∂*\n` +
        `> *© ᴘσωєʀє∂ ву αℓι м∂⎯꯭̽🐍*`
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error:', error);
    reply('❌ Unable to download the video. Please try again later.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
