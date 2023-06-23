const fs = require('fs')
const P = require('pino') 
const { Boom } = require('@hapi/boom')
const fetch = require('node-fetch')
const chalk = require('chalk')
//const { color } = require('./cores')
const moment = require('moment-timezone')
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YY')
const yts = require('yt-search');
const speed = require('performance-now')
const ffmpeg = require('fluent-ffmpeg')
const { exec, spawn, execSync } = require("child_process")
const axios = require("axios")
const { color, bgcolor, logs } = require('./lib/color');

 // Configuração
const settings = JSON.parse(fs.readFileSync('./config.json'));

 const { default: makeWASocket, downloadContentFromMessage, useMultiFileAuthState, makeInMemoryStore, DisconnectReason, WAGroupMetadata, relayWAMessage,	MediaPathMap, mentionedJid, processTime, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, delay, fetchLatestBaileysVersion, MessageRetryMap, extractGroupMetadata, generateWAMessageFromContent, proto} = require('@WhiskeySockets/baileys');

async function clover_mods() {
const store = makeInMemoryStore({
logger: P().child({ 
level: 'debug',
stream: 'store' 
 })
})

// Conexão com o qr
const { state, saveCreds } = await useMultiFileAuthState('./arquivo-qr')

const cfonts = require('cfonts')
const banner = cfonts.render(('Clover|V5'),
{
 font: "block" ,
 align: "center",
 gradient: ["red","blue"]
})
const client = makeWASocket({
logger: P({ level: 'silent' }),
printQRInTerminal: true,
auth: state,
msgRetryCounterMap: MessageRetryMap,
defaultQueryTimeoutMs: undefined, 
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(message.buttonsMessage || message.listMessage);
if (requiresPatch) {
message = {viewOnceMessage: {
message: {messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {},
},...message }}}}
return message;
}});
console.log(banner.string)
console.log('\033[1;32mClover 5.0 online\x1b[1;37m')
store.bind(client.ev)

client.ev.on("creds.update", saveCreds)
store.bind(client.ev)
client.ev.on("chats.set", () => {
console.log("Tem conversas", store.chats.all())
})
client.ev.on("contacts.set", () => {
console.log("Tem contatos", Object.values(store.contacts))
})
client.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update
if(connection === "close") {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
console.log("Conexão fechada devido a", lastDisconnect.error, "Tentando reconectar...", shouldReconnect);
if(shouldReconnect) {
clover_mods()
}

} else if(connection === "open") {
console.log(chalk.keyword("red")("Conectado com sucesso!"));
}
})

client.ev.on('messages.upsert', connection => {
const info = connection.messages[0];
if (info.key.fromMe) return;
if (connection.type != 'notify') return;
if (info.key.remoteJid === 'status@broadcast') return;
require('./clover.js')(client, info, settings, color)});

client.ev.on('creds.update', saveCreds)
}

clover_mods(), (err) => console.log("[ Error ]", color(String(err), 'red'));

var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');


var app = express()
var mainrouter = require('./main')
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

app.use('/', mainrouter);
//app.use('/api', mainrouter);


app.listen(8080, () => {
    console.log("Server running on port 8080")
})