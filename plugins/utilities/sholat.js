exports.run = {
   usage: ['sholat'],
   hidden: ['solat'],
   use: 'city',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Jakarta'), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.sholat(text)
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let teks = '*JADWAL SHOLAT*\n\n'
         teks += `“Menampilkan Waktu Sholat *${Func.ucword(json.city)}* pada *${json.date}.*”\n\n`
         teks += '◦  ```Imsak  :``` ' + json.data.imsak + '\n'
         teks += '◦  ```Subuh  :``` ' + json.data.subuh + '\n'
         teks += '◦  ```Dhuha  :``` ' + json.data.dhuha + '\n'
         teks += '◦  ```Dzuhur :``` ' + json.data.dzuhur + '\n'
         teks += '◦  ```Ashar  :``` ' + json.data.ashar + '\n'
         teks += '◦  ```Magrib :``` ' + json.data.magrib + '\n'
         teks += '◦  ```Isya   :``` ' + json.data.isya + '\n\n'
         teks += global.footer
         client.sendMessageModify(m.chat, teks, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://i.ibb.co/2ZTr9Cn/IMG-20221209-052817-412.jpg')
         })
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false
}