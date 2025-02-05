const { useMultiFileAuthState, DisconnectReason, makeInMemoryStore, msgRetryCounterMap, delay } = require('baileys')
const pino = require('pino'), path = require('path'), fs = require('fs'), colors = require('@colors/colors/safe'), qrcode = require('qrcode-terminal'), axios = require('axios'), spinnies = new (require('spinnies'))()
global.component = new (require('ds-func'))
const { Extra, Function, MongoDB, Scraper } = component
const { Socket, Serialize, Scandir } = Extra
global.Func = Function
//global.scrap = Scraper
if (process.env.DATABASE_URL) {
   MongoDB.db = global.database
}
global.props = process.env.DATABASE_URL ? MongoDB : new(require('./system/localdb'))(global.database)
//const { Socket, Serialize, Scandir } = require('./system/extra')
//global.props = new (require('./system/dataset'))
global.neoxr = new (require('./system/map'))
//global.Func = new (require('./system/function'))
global.scrap = new (require('./system/scraper'))
//const { Function } = require('./system/functionv2')
//global.Func2 = new Function
const _true = fs.readFileSync(`./media/true.webp`)
const _false = fs.readFileSync(`./media/false.webp`)
global.store = makeInMemoryStore({
   logger: pino().child({
      level: 'silent',
      stream: 'store'
   })
})

const connect = async () => {
   require('./system/config')
   const { state, saveCreds } = await useMultiFileAuthState('session')
   global.db = {users:[], chats:[], groups:[], statistic:{}, sticker:{}, setting:{}, ...(await props.fetch() ||{})}
   await props.save(global.db)
   global.client = Socket({
      logger: pino({
         level: 'silent'
      }),
      printQRInTerminal: true,
      browser: ['@Elaina_', 'safari', '1.0.0'],
      auth: state,
      coonectTimeoutMs: 60_000,
      defaultQueryTimeoutMs: 0,
      keepAliveIntervalMs: 10000,
      // To see the latest version : https://web.whatsapp.com/check-update?version=1&platform=web
      version: [2, 2246, 10]
   })

   store.bind(client.ev)
   client.ev.on('connection.update', async (update) => {
      const {
         connection,
         lastDisconnect,
         qr
      } = update
      if (lastDisconnect == 'undefined' && qr != 'undefined') {
         qrcode.generate(qr, {
            small: true
         })
      }
      if (connection === 'open') {
         console.log(colors.green(`Berhasil, Terhubung sebagai ${client.user.name || client.user.verifiedName}`))
      } else if (connection === 'close') {
         if (lastDisconnect.error.output.statusCode == DisconnectReason.loggedOut) {
            console.log(colors.red(`Gagal terhubung`))
            await props.save()
            process.exit(0)
         } else {
            connect().catch(() => connect())
         }
      }
   })

   client.ev.on('creds.update', saveCreds)

   client.ev.on('messages.upsert', async chatUpdate => {
      try {
         m = chatUpdate.messages[0]
         if (!m.message) return
         Serialize(client, m)
         Scandir('./plugins').then(files => {
            global.client.plugins = Object.fromEntries(files.filter(v => v.endsWith('.js')).map(file => [path.basename(file).replace('.js', ''), require(file)]))
         }).catch(e => console.error(e))
         require('./system/baileys'), require('./handler')(client, m)
      } catch (e) {
         console.log(e)
      }
   })

   client.ev.on('contacts.update', update => {
      for (let contact of update) {
         let id = client.decodeJid(contact.id)
         if (store && store.contacts) store.contacts[id] = {
            id,
            name: contact.notify
         }
      }
   })

   client.ev.on('group-participants.update', async (room) => {
      let meta = await (await client.groupMetadata(room.id))
      let member = room.participants[0]
      let text_welcome = `Selamat datang +tag di Grup +grup mari kita sambut.`
      let text_left = `+tag Telah keluar grup cuy`
      let groupSet = global.db.groups.find(v => v.jid == room.id)
      try {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(member, 'image'))
      } catch {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(room.id, 'image'))
      }
      if (room.action == 'add') {
         if (groupSet.localonly) {
            if (global.db.users.some(v => v.jid == member) && !global.db.users.find(v => v.jid == member).whitelist && !member.startsWith('62') || !member.startsWith('62')) {
               client.reply(room.id, Func.texted('bold', `Sorry @${member.split`@`[0]}, Grup ini khusus people +62 azzah bro, utiwi kick.`))
               client.updateBlockStatus(member, 'block')
               return await Func.delay(2000).then(() => client.groupParticipantsUpdate(room.id, [member], 'remove'))
            }
         }
         let txt = (groupSet.text_welcome != '' ? groupSet.text_welcome : text_welcome).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${meta.subject}`)
         if (groupSet.welcome) client.sendMessageModify(room.id, txt, null, {
            largeThumb: true,
            thumbnail: pic,
            url: global.db.setting.link
         })
      } else if (room.action == 'remove') {
         let txt = (groupSet.text_left != '' ? groupSet.text_left : text_left).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${meta.subject}`)
         if (groupSet.left) client.sendMessageModify(room.id, txt, null, {
            largeThumb: true,
            thumbnail: pic,
            url: global.db.setting.link
         })
      }
   })

   /*client.ws.on('CB:call', async json => {
      if (json.content[0].tag == 'offer') {
         let object = json.content[0].attrs['call-creator']
         await Func.delay(2000)
         await client.updateBlockStatus(object, 'block')
      }
   })*/

   setInterval(async () => {
      if (global.db) await props.save(global.db)
   }, 30_000)
   
   return client
}

connect().catch(() => connect())