const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);
exports.run = {
   async: async (m, {
      client,
      body,
      chats,
      setting
   }) => {
      try { 
          if (body && !global.evaluate_chars.some(v => body.startsWith(v))) {
         const promption = body
         const completion = await openai.createCompletion({model: "text-davinci-003",prompt: promption,max_tokens: 2500,temperature: 0.7,stop: [" Human:", " AI:"]});
         
         if (!m.fromMe && setting.chatbot) return client.reply(m.chat, completion.data.choices[0].text, m)
      }
      } catch (e) {
         console.log(e)
      }
   },
   error: false,
   private: true,
   cache: true,
   location: __filename
}