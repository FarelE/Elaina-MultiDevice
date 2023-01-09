const { decode } = require('html-entities')
exports.run = {
   usage: ['zippy'],
   hidden: ['zp'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www18.zippyshare.com/v/9q3ETqpm/'), m)
         if (!args[0].match(/(https:\/\/www18.zippyshare.com\/)/gi)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
      client.reply(m.chat, Func.texted('bold', global.status.wait), m)
         let json = await Api.zippy(args[0])
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let text = `*BOT NOLEP ZIPPYSHARE*\n\n`
         text += '◦  *Name* : ' + unescape(decode(json.hasil.filename)) + '\n'
         text += '◦  *Size* : ' + json.hasil.filesizeH + '\n'
         text += '◦  *Short* : ' + json.hasil.tofile + '\n'
         text += '◦  *Last Download* : ' + json.hasil.lastDownload + '\n'
         text += '◦  *Uploaded* : ' + json.hasil.aploud + '\n\n'
         text += global.footer
         let chSize = Func.sizeLimit(json.hasil.filesizeH, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `💀 File size (${json.hasil.size}) exceeds the maximum limit, download it by yourself via this link : ${await (await scrap.shorten(json.hasil.link)).data.url}`, m)
         client.sendMessageModify(m.chat, text, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://i.ibb.co/2ZTr9Cn/IMG-20221209-052817-412.jpg')
         }).then(async () => {
            client.sendFile(m.chat, json.hasil.url, unescape(decode(json.hasil.filename)), '', m)
         })
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}