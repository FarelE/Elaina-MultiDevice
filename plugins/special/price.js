exports.run = {
   usage: ['premium'],
   category: 'special',
   async: async (m, {
      client,
      isPrefix
   }) => {
      client.reply(m.chat, `*Gada premium sih sebenernya, kalo mau donasi/sewa boleh aja >//<*`, m)
   },
   error: false,
   cache: true,
   location: __filename
}