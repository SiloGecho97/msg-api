const smsService = require("../services/sms.service");

const moment = require("moment");
const { io } = require("../../server");

function checkOrigin(req,res,next){
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let local = ip.split(":").pop();
  if(local == 1){
    next()
  }else{
    res.status(401).send("Unauthorized");
  }
}

function incomingSms(req, res, next) {
  let queryParams = req.query;
  allSmsHandler(queryParams)
    .then((response) => {
      if (response.processed) {
        next();
      } else {
        res.status(200).send("ACK/Jasmin");
      }
    })
    .catch((err) => {
      res.status(200).send("ACK/Jasmin");
    });
}

async function allSmsHandler(message) {

  const msg = decodeMessages(message)
//   const codes = await adminService.getCodebyName(message.to);
//   if (!codes) {
//     return {
//       processed: false,
//       message: "Short Code not Found"
//     }
//   }
  let smsAll = await smsService.addMessage({
    message: msg ? msg : message.content,
    shortCode: message.to,
    phoneNumber: message.from,
    receivedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  if (smsAll) {
    return { processed: true };
  }
  return { processed: false };
}

function parseKey(message) {
  message = message.trim();
  let key = message.split(" ")[0].toUpperCase() || "";
  let msg = message.slice(key.length).trim();

  return { key, msg };
}

function decodeMessages(message) {
  if (message.binary && message.coding == 8) {
    let ms = message.binary.match(/.{1,4}/g);
    msg = ""
    ms.forEach((element) => {
      msg = msg + String.fromCodePoint("0x" + element)
    });
    return msg;
  }
}

function toUnicode(str) {
  return str.split('').map(function (value, index, array) {
    var temp = value.charCodeAt(0).toString(16).padStart(4, '0');
    if (temp.length > 2) {
      return temp;
    }
    return value;
  }).join('');
}

function isUnicode(str) {
  for (var i = 0, n = str.length; i < n; i++) {
    if (str.charCodeAt(i) > 255) { return true; }
  }
  return false;
}

async function sendMessageHandler(body) {
  const isUn = isUnicode(body.message);
  // console.log(toUnicode("M-1 "))
  if (isUn) {
    const msg = toUnicode(body.message);
    const sendUnicode = await smsService.sendUnicodeMessage({ ...body.dataValues, msg })
  } else {
    const send = await smsService.sendMessage(body);
  }
}

function getAllMessage(req, res, next) {
  const { page, pageSize, date, message, phoneNumber } = req.query;
  getAllMessageHandler(
    page || 0,
    pageSize || 8,
    date || "",
    message || "",
    phoneNumber || ""
  )
    .then(resp => res.status(200).send({ message: resp }))
    .catch(err => res.status(500).send({ message: err }));
}

async function getAllMessageHandler(page, pageSize, date, msg, phoneNumber) {
  const offset = parseInt(page) * parseInt(pageSize);
  const limit = parseInt(pageSize);
  const message = await smsService.getAllMessages(
    offset,
    limit,
    date,
    msg,
    phoneNumber
  );
  if (!message) {
    throw "unable to fetch messages";
  }
  return message;
}


module.exports = {
  checkOrigin,
  incomingSms,
  getAllMessage
};
