exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/,
   async: async (m, {
      client,
      body,
      users,
      setting,
      prefixes
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => Func.ttFixed(v).match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `Limit nte ga cukup.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               client.reply(m.chat, Func.texted('bold', global.status.wait), m)
               let old = new Date()
               Func.hitstat('tiktok', m.sender)
               links.map(async link => {
                  let json = await Api.tiktok(Func.ttFixed(link))
                  if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
                  client.sendButton(m.chat, json.data.video, `*Bot Nolep Tiktok Downloader*\nKlik button dibawah jika ingin soundnya.`, ``, m, [{
                     buttonId: `${prefixes[0]}tikmp3 ${link}`,
                     buttonText: {
                        displayText: 'Backsound'
                     },
                     type: 1
                  }])
               })
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}