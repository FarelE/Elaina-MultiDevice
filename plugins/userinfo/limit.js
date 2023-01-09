exports.run = {
   usage: ['limit'],
   category: 'user info',
   async: async (m, {
      client,
      isPrefix,
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.limit < 1) return client.reply(m.chat, `Limit nte uda abis*`, m)
      client.reply(m.chat, `Limit Anda: [ *${Func.formatNumber(user.limit)}* ]${!user.premium ? `\n\n*Cukup gak limit segitu? :v*` : ''}`, m)
   },
   error: false
}