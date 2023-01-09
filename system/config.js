// Owner number
global.owner = '6285869074622'
// Owner name
global.owner_name = 'Abdullll'
// Database name (Default: database)
global.database = 'database'
// Maximum upload file size limit (Default : 100 MB)
global.max_upload = 200
// Delay for spamming protection (Default : 3 seconds)
global.cooldown = 0
// User Limitation (Default : 25)
global.limit = 25000
global.quotaN = 50000000000
// Time to be temporarily banned and others (Default : 30 minutes)
global.timer = 1800000
// Symbols that are excluded when adding a prefix (Don't change it)
global.evaluate_chars = ['=>', '~>', '<', '>', '$']
// Country code that will be automatically blocked by the system, when sending messages in private chat
global.blocks = ['91', '92', '94', '94', '212']
// Put target jid to forward friends story
global.forwards = global.owner + '@c.us'
// Get neoxr apikey by registering at https://api.neoxr.my.id
global.Api = new (require('./neoxrApi'))(process.env.API_KEY)
// Get bid and key configuration for autoreply chat ai feature by registering at https://brainshop.ai
global.chatai_bid = '171753'
global.chatai_key = 'SQzNcqBzvoQM8fii'
// Timezone (Default : Asia/Jakarta)
global.timezone = 'Asia/Jakarta'
// Bot version
global.version = '2.0',
// Bot name
global.botname = `© 𝚎𝚕𝚊𝚒𝚗𝚊-𝚖𝚞𝚕𝚝𝚒𝚍𝚎𝚟𝚒𝚌𝚎 v ${global.version} || 𝟸𝟶𝟸𝟸`
// Footer text
global.footer = '𝙚𝙡𝙖𝙞𝙣𝙖 || @𝙖𝙗𝙙𝙪𝙡𝙢𝙖𝙨𝙪𝙠𝙨𝙪𝙧𝙜𝙖_'
// Global status
global.status = Object.freeze({
   wait: Func.texted('bold', 'Sedang diproses...'),
   invalid: Func.texted('bold', 'URL is gajelas!'),
   wrong: Func.texted('bold', 'Salah format!'),
   getdata: Func.texted('bold', 'Sedang get metadata . . .'),
   fail: Func.texted('bold', 'gagal get metadata!'),
   error: Func.texted('bold', 'Error!'),
   errorF: Func.texted('bold', 'Fitur ini sedang error :V'),
   premium: Func.texted('bold', 'Fitur ini khusus yang premium premium azzah'),
   owner: Func.texted('bold', 'Hanya untuk owner yang maha siswa'),
   god: Func.texted('bold', 'Khusus yang punya orang dalam'),
   group: Func.texted('bold', 'Cuma bisa di grup njir.'),
   botAdmin: Func.texted('bold', 'Botnya bukan admin anzime :V'),
   admin: Func.texted('bold', 'Nte bukan admin grup boss'),
   private: Func.texted('bold', 'Cuma bisa di pc azzah :v')
})