require('dotenv').config();
const express = require('express');
const app = express();

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

app.use(bot.webhookCallback('/secret-path'));

app.get('/', (req, res) => {
  res.send('This is a Telegram bot!');
});

bot.start(ctx => ctx.reply('Welcome'));
bot.help(ctx => ctx.reply('Call me baby, +234 812 688 7684'));

bot.command('getwebsite', ctx => ctx.reply('https://www.phadafx.com'));
bot.hears('hi', ctx => ctx.reply('Hey there'));
bot.on('text', msg => {
  console.log(msg.message.text);
  let text = msg.message.text.toLowerCase().includes('help');
  text
    ? msg.reply('You need help? come to ILC 2022')
    : msg.reply('Hello, make use of any commands available /help');
});

// Handle sticker or photo update
bot.on(['sticker', 'photo'], ctx => {
  return ctx.reply('Cool!');
});

bot.on('message', ctx => {
  return ctx.reply('Hi, make use of any commands available /help');
});
bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});
const PORT = process.env.PORT || 5000;
bot.launch();
app.listen(PORT, () => console.log('Listening on port', PORT));
