

const axios = require('axios');
const { Message } = require('../models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");
const sequelize = require("../database/connection");

function addMessage(message) {
    return Message.create(message).catch((err) => console.log(err));
}
function sendUnicodeMessage(body) {
    return axios.get('http://127.0.0.1:1401/send', {
        params: {
            username: 'fanan',
            password: 'fanapwd',
            to: body.phoneNumber,
            from: body.shortCode,
            content: body.message,
            coding: 8,
            binary: body.msg
        }
    }).catch((err) => {
        console.log(err);
    })
}
function sendMessage(body) {
    return axios.get('http://127.0.0.1:1401/send', {
        params: {
            username: 'fanan',
            password: 'fanapwd',
            to: body.phoneNumber,
            from: body.shortCode,
            content: body.message
        }
    }).catch((err) => {
        console.log(err);
    })
}
function getAllMessages(offset, limit, date, message, phonenumber) {
    // console.log(message, phonenumber, moment(date).format('YYYY-MM-DD hh:mm:ss'), moment(date).add(24, 'hours').format('YYYY-MM-DD hh:mm:ss'));
    var dates = moment(date);
    var searchedDate = moment(date).format("YYYY-MM-DD");
    if (dates.isValid()) {
      return Message.findAndCountAll({
        where: {
          [Op.and]: [
            { message: { [Op.like]: "%" + message + "%" } },
            { phoneNumber: { [Op.like]: "%" + phonenumber + "%" } }
          ],
          createdAt: {
            [Op.gte]: searchedDate,
            [Op.lt]: moment(searchedDate)
              .add(24, "hours")
              .format("YYYY-MM-DD ")
          }
        },
        offset,
        limit,
        order: [["createdAt", "DESC"]]
  
      }).catch(err => console.log(err));
    } else {
      return Message.findAndCountAll({
        where: {
          [Op.and]: [
            { message: { [Op.like]: "%" + message + "%" } },
            { phoneNumber: { [Op.like]: "%" + phonenumber + "%" } }
          ]
        },
        offset,
        limit,
        order: [["createdAt", "DESC"]]
      }).catch(err => console.log(err));
    }
}

module.exports = {
    sendMessage,
    sendUnicodeMessage,
    addMessage,
    getAllMessages
};
