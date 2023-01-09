const { Configuration, OpenAIApi } = require('openai')
exports.run = {
   usage: ['ai', 'artinama', 'urban', 'arti'],
   hidden: ['brainly'],
   use: 'question',
   category: 'special',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'example react js'), m)
         //client.sendReact(m.chat, '🕒', m.key)
         const configuration = new Configuration({
            apiKey: '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'
         })
         const openai = new OpenAIApi(configuration)
         const json = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.7,
            max_tokens: 3500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
         })
         if (json.statusText != 'OK' || json.data.choices.length == 0) return client.reply(m.chat, global.status.fail, m)
         client.reply(m.chat, json.data.choices[0].text.trim(), m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   private: true,
   limit: true,
   restrict: true
}