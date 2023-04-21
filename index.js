const {
    Telegraf,
    Markup
} = require('telegraf')
require('dotenv').config()
const text = require('./const')
console.log(text.commands)

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Приветствую тебя кинолюб 📽 ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец '}!`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('films', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Фильмы</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Комедия', 'btn_1'), Markup.button.callback('Фантастика', 'btn_2')],
                [Markup.button.callback('Ужасы', 'btn_3')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})

function addActionBot(name, messages) {
    bot.action(name, async (ctx) => {
        try {
            for (const [src, text] of messages) {
                await ctx.answerCbQuery()
                if (src !== false) {
                    await ctx.replyWithPhoto({
                        source: src
                    })
                }
                await ctx.replyWithHTML(text, {
                    disable_web_page_preview: true
                })
            }
        } catch (e) {
            console.error(e)
        }
    })
}
addActionBot('btn_1', [['./img/1.1.jpg', text.text1], ['./img/1.2.jpg', text.text2], ['./img/1.3.jpg', text.text3]])
addActionBot('btn_2', [['./img/2.1.jpg', text.text4], ['./img/2.2.jpg', text.text5], ['./img/2.3.jpg', text.text6]])
addActionBot('btn_3', [['./img/3.1.jpg', text.text7], ['./img/3.2.jpg', text.text8], ['./img/3.3.jpg', text.text9],])

bot.command('useful_links', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Полезные ссылки для поиска фильмов</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Короткие пересказы фильмов на YouTube', 'btn_5')],
                [Markup.button.callback('Telegram каналы о фильмах', 'btn_6')],
                [Markup.button.callback('Полезные сайты для любителей фильмов', 'btn_7')],
                [Markup.button.callback('Где посмотреть фильм?', 'btn_8')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }

})
addActionBot('btn_5', [['./img/5.jpg', text.text10]])
addActionBot('btn_6', [['./img/6.jpg', text.text11]])
addActionBot('btn_7', [['./img/7.jpg', text.text12]])
addActionBot('btn_8', [['./img/8.jpg', text.text13]])

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 