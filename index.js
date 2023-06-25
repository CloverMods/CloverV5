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
const  bemvindotexto = JSON.parse(fs.readFileSync('./lib/TextoDoBemvindo.json'));
 // CONFIGURAÇÃO DONO E ETC
const settings = JSON.parse(fs.readFileSync('./config.json'));
const nomeBot = settings.nomeBot
const NomeDoBot = nomeBot

 const { default: makeWASocket, downloadContentFromMessage, useMultiFileAuthState, makeInMemoryStore, DisconnectReason, WAGroupMetadata, relayWAMessage,	MediaPathMap, mentionedJid, processTime, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, delay, fetchLatestBaileysVersion, MessageRetryMap, extractGroupMetadata, generateWAMessageFromContent, proto} = require('@WhiskeySockets/baileys');


// INÍCIO DS FUNÇÃO clover_mods 
async function clover_mods() {
const store = makeInMemoryStore({
logger: P().child({ 
level: 'debug',
stream: 'store' 
 })
})

// NOME DO ARQUIVO DO CÓDIGO QR
const { state, saveCreds } = await useMultiFileAuthState('./arquivo-qr')
// BANER DO TERMINAL
const cfonts = require('cfonts')
const banner = cfonts.render(('Clover|V5'),
{
 font: "block" ,
 align: "center",
 gradient: ["red","blue"]
})

// CONEXÃO 
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
// CONEXÃO ATUALIZAÇÃO 
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



const welkom = JSON.parse(fs.readFileSync('./lib/welkom.json'));
const  bemvindotexto = JSON.parse(fs.readFileSync('./lib/TextoDoBemvindo.json'));
const trevo = bemvindotexto.texto


// GRUPO ATUALIZAÇÃO  
client.ev.on('groups.update', async grup => {
console.log(grup)
try {
ppgc = await client.profilePictureUrl(grup[0].id, 'image')
} catch {
ppgc = 'https://telegra.ph/file/3983c55ac7f3ebea225d3.jpg'
}
let wm_fatih = { url : ppgc }
if (grup[0].announce == true) {
client.sendMessage(grup[0].id, { text:`「 Alterações nas configurações do grupo 」\n\nO grupo foi fechado pelo administrador, agora só os administradores podem enviar mensagens !\n${NomeDoBot}`})
} else if(grup[0].announce == false) {
client.sendMessage(grup[0].id, { text:`「 Alterações nas configurações do grupo 」\n\nO grupo foi aberto pelo administrador, agora os participantes podem enviar mensagens !\n${NomeDoBot}`})
} else if (grup[0].restrict == true) {
client.sendMessage(grup[0].id, { text:`「 Alterações nas configurações do grupo 」\n\nAs informações do grupo foram restritas, agora apenas administradores podem editar informações do grupo !\n${NomeDoBot}`})
} else if (grup[0].restrict == false) {
client.sendMessage(grup[0].id, { text:`「 Alterações nas configurações do grupo 」\n\nInformações do grupo foram abertas, agora os participantes podem editar informações do grupo !\n${NomeDoBot}`})
} else {
client.sendMessage(grup[0].id, { text:`「 Alterações nas configurações do grupo 」\n\nO nome do Grupo foi alterado para *${grup[0].subject}*\n${NomeDoBot}`})
}
})


// PARTICIPANTES DE GRUPO ATUALIZAÇÃO 
client.ev.on('group-participants.update', async (anu) => {
console.log(anu)
if(welkom.includes(anu.id)) {
try {
let metadata = await client.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppimg = await client.profilePictureUrl(anu.participants[0])
} catch {
ppimg = 'https://telegra.ph/file/41598dec8462fb039c130.jpg'
}
memb = metadata.participants.length
if (anu.action == 'add') {
num = anu.participants[0]
client.sendMessage(anu.id, { image: {url: `${ppimg}`},caption: `${trevo}`,headerType: 4
})
} else if (anu.action == 'remove') {
client.sendMessage(anu.id,{ image: {url: `${ppimg}`}, caption: `OLA POVO DO GRUPO:\n*${metadata.subject}*\n\nO Membro: @${num.split('@')[0]}\n\nSaiu do Grp ou foi Banido.`})
}
}} catch (err) {
console.log(err)
}}})

// MENSAGEM ATUALIZAÇÃO 
client.ev.on('messages.upsert', connection => {
//console.log(connection)
const info = connection.messages[0];
if (info.key.fromMe) return;
if (connection.type != 'notify') return;
if (info.key.remoteJid === 'status@broadcast') return;
require('./clover.js')(client, info, settings, color)});

client.ev.on('creds.update', saveCreds)
}

// CHAMA A FUNÇÃO clover_mods QUE E PRATICAMENTE O BOT
clover_mods(), (err) => console.log("[ Error ]", color(String(err), 'red'));
