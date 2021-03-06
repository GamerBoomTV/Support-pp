//2.6.3
const cVersion = "2.6.3";
/**
 * Copyright (C) 2017- 2020 KlexHub UG (haftungsbeschränkt)
 * E-Mail: <support@klexhub.com>
 * This work is licensed under the MIT License
 *
 * All Sounds file Copyright (C) 2020 sounds.support-pp.de
 * Sounds: https://sounds.support-pp.de
 *
 *  Status
 * https://status.support-pp.de
 *
 * Website
 * https://support-pp.de
 *
 * Forum:
 * https://meta.support-pp.de
 */

var DSGVO =
  "Datenschutzerklärung Wir freuen uns sehr über Ihr Interesse an unserem Projekt. Datenschutz hat einen besonders hohen Stellenwert für die Projektleitung des Support++ Projektes. https://support-pp.de/datenschutz.html";

registerPlugin(
  {
    name: "Support++",
    version: cVersion,
    description:
      "Advanced support script + ticket system + Telegram and Discord notification + channel rename",
    author: "Support++ <support@support-pp.de>",
    requiredModules: ["db", "http"],
    engines: ">= 1.0.0",

    vars: [
      {
        name: "spWelcome",
        title:
          "Welcome to the configuration of Support (v2). \n Thank you for choosing this script. \n\nPlease fill out all fields with (*), as these are mandatory. \n\nIf you find a bug, please report it to the forum. \n\nI wish you much fun with Support ++",
      },
      {
        name: "spDatenschutz",
        title: DSGVO,
        type: "select",
        options: ["Accept", "Deny"],
      },
      {
        name: "spLanguage",
        title: "Select the language:",
        type: "select",
        options: ["English"],
        default: "0",
        conditions: [
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spNewsletter",
        title:
          "[Newsletter] You want recive news / changelog or special information? Then subscribe to our newsletter!",
        placeholder: "mymail@mydomain.de",
        type: "string",
        conditions: [
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
        /* REMOV in version 2.1.0
    }, {
        name: 'spSorryGermanNot',
        indent: 2,
        title: 'Sorry :/ but German is not available. But in the next version 2.0.5',
        conditions: [{
            field: 'spLanguage',
            value: 0
        }, {
            field: 'spDatenschutz',
            value: 0
        }]
        */
      },
      {
        name: "spSupportChannels",
        indent: 2,
        title: "Support Channels (*)",
        type: "array",
        vars: [
          {
            name: "spSupportChannel",
            indent: 1,
            title:
              "Select the support channel that users will enter when they need support (*)",
            type: "channel",
          },
          {
            name: "spSupporterId",
            indent: 1,
            title: "Supporter servergroup ID (*)",
            type: "strings",
          },
          {
            name: "spSupportUserMessage",
            indent: 1,
            title:
              "Message sent to the user when he joins the support channel (*)",
            placeholder:
              "Hello &u, please wait. A supporter has been informed [Variable &u = Username | &spI = Anzahl der Online Supporter (int)]",
            default:
              "Hello &u, please wait. A supporter has been informed. There are &spI supporter online.",
            type: "string",
          },
          {
            name: "spSupportMessage",
            indent: 1,
            title:
              "Message sent to the supporter if a user requested help [Variable &u = Username] (*)",
            placeholder: "User &u needs support!",
            default: "Hello the user &u need support!",
            type: "string",
          },
        ],
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spIgnoreId",
        indent: 2,
        title: "Ignore servergroup ID (*)",
        type: "strings",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spAfkChannels",
        indent: 2,
        title: "AFK Channels - ignore Supporter... (*)",
        type: "array",
        vars: [
          {
            name: "spAfkChannel",
            title: "AFK Channel ignore Supporters. (*)",
            type: "channel",
          },
          {
            name: "spAfkChannelSub",
            title: "Ignore all sub channels... (for big server)",
            type: "checkbox",
          },
        ],
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spSupportUserNoMessage",
        indent: 2,
        title:
          "Response sent to the user if no supporter is online [Variable &u = Username] (*)",
        placeholder: "Sorry &u, there is no supporter online right now!",
        default: "Sorry &u, there is no supporter online right now!",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spSupportUserIgnoreMessage",
        indent: 2,
        title: "Message sent to ignored users [Variable &u = Username] (*)",
        placeholder: "Sorry &u but you on the ignore list.",
        default: "Sorry &u but you on the ignore list.",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spMsgMode_user",
        title: "Notification mode for users (*)",
        type: "select",
        options: ["Poke", "Chat"],
        default: "0",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spMsgMode_sp",
        title: "Notification mode for supporters (*)",
        type: "select",
        options: ["Poke", "Chat"],
        default: "0",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      //------------------------------------------------------------------- {Module Config} ---------------------------------------------------------------------------------
      {
        name: "spModule",
        title: "Support++ module. Activate the module with the Checkbox.",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                        -> MySQL
      {
        name: "spMySQLActiv",
        indent: 2,
        title: "[MySQL] Advanced storage for module",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spDBINFO",
        indent: 4,
        title:
          "This module connects the SinusBot with your MySQL DB. The Module automatically creates all necessary tables for you.",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spMySQLActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spHost",
        indent: 4,
        title: "Database host (PRO: db.support-pp.de) (*)",
        placeholder: "49.145.xx.xx or domain",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spMySQLActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spUsername",
        indent: 4,
        title: "Database username (Please don't use the root account!) (*)",
        placeholder: "Support-pp",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spMySQLActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spPassword",
        indent: 4,
        title:
          "Database password (Please only use an account with a password assigned!) (*)",
        placeholder: "xxxxxxxxxxxxxxxxx",
        type: "password",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spMySQLActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spDB",
        indent: 4,
        title: "Database name (PRO: sp_) (*)",
        placeholder: "SinusbotSupportSorage",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spMySQLActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spDBPROINFO",
        indent: 4,
        title:
          "[ i ] You don't have a MySQL DB? All PRO members receive a free DB from us. In that case, we mailed you your credentials with your donation confirmation. Questions? Please contact us.",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spMySQLActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                         -> Ticket
      {
        name: "spTicketActiv",
        indent: 2,
        title:
          "[TicketSystem] TicketSystem Advanced and Minimal. Manage your Tickets with a webpanal... [NEW] ",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTicketCommand",
        indent: 4,
        title: "Command to send a ticket (e.g !ticket) (*)",
        placeholder: "!t | !ticket | !tr ...",
        type: "string",
        default: "!t",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTicketActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTicketSendMsg",
        indent: 4,
        title: "Ticket confirmation message [Variable &u = Username] (*)",
        placeholder: "Your ticket has been sent",
        default: "&u, your ticket has been sent",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTicketActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spNewTicketMsg",
        indent: 4,
        title:
          "Message sent to supporters when receiving a new ticket [Variable &u = Username, &client = Client[Object] ] (*)",
        placeholder: "New ticket from &u !",
        default: "New Ticket from &client",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTicketActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTicketLargeActiv",
        indent: 4,
        title: "Ignore this Checkbox please! ",
        type: "checkbox",
        default: false,
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTicketActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTicketForceIgnoredUsers",
        indent: 4,
        title: "Allow ignored users to create a ticket.",
        type: "checkbox",
        default: true,
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTicketActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      //                          Ticket  <-

      //                        -> Telegram

      {
        name: "spTelegramActiv",
        indent: 2,
        title: "[TelegramNotification] Notification via Telegram?",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTelegramModeTicket",
        indent: 4,
        title: "Ticket notification mode via Telegram (*)",
        type: "select",
        options: ["Always", "When no supporter online", "Never"],
        default: "0",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTelegramActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTelegramModeSupport",
        indent: 4,
        title: "Support notification mode via Telegram (*)",
        type: "select",
        options: ["Always", "When no supporter online", "Never"],
        default: "0",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTelegramActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTelegramID",
        indent: 4,
        title: "Telegram ChatId (*)",
        placeholder: "123456789",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTelegramActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTelegramToken",
        indent: 4,
        title: "Telegram Bot token (*)",
        placeholder: "987654321",
        type: "password",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTelegramActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTelegrammTextSupport",
        indent: 4,
        title: "Support | Telegram message [Variables: &u = username] (*)",
        placeholder:
          "Hello support team,\n\n User &u joined the support room and needs support.\n\n Help would be appreciated!\n Thanks ;)",
        default:
          "Hello support team,\n\n User &u joined the support room and needs support.\n\n Help would be appreciated!\n Thanks ;)",
        type: "multiline",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTelegramActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTelegrammTextTicket",
        indent: 4,
        title:
          "Ticket | Telegram message [Variables: &u = username | &msg = message | &u_id = uid | &u_ip = ip] (*)",
        placeholder:
          "Hello supporter,\n\n you've got a new ticket:\nname: &u\nmessage: &msg\n\n Please answer the ticket, thanks ;)",
        default:
          "Hello supporter,\n\n you've got a new ticket:\nname: &u\nmessage: &msg\n\n Please answer the ticket, thanks ;)",
        type: "multiline",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spTelegramActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                        Telegram <-

      //                        -> Discord

      {
        name: "spDiscordActiv",
        indent: 2,
        title: "🆕 [DiscordNotification] Notification via Discord?",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spDiscordModeTicket",
        indent: 4,
        title: "Ticket notification mode via Discord (*)",
        type: "select",
        options: ["Always", "When no supporter online", "Never"],
        default: "0",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDiscordActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spDiscordModeSupport",
        indent: 4,
        title: "Support notification mode via Discord (*)",
        type: "select",
        options: ["Always", "When no supporter online", "Never"],
        default: "0",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDiscordActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spDiscordToken",
        indent: 4,
        title: "🔑 Token >Infos  https://bit.ly/2TPetBs(*)",
        placeholder: "eyhjirtzui765ghjo0987tghj",
        type: "multiline",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDiscordActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spDiscordTextSupport",
        indent: 4,
        title: "Support | Discord message [Variables: &u = username] (*)",
        placeholder:
          "Hello support team,\n\n User &u joined the support room and needs support.\n\n Help would be appreciated!\n Thanks ;)",
        default:
          "Hello support team,\n\n User &u joined the support room and needs support.\n\n Help would be appreciated!\n Thanks ;)",
        type: "multiline",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDiscordActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spDiscordTextTicket",
        indent: 4,
        title:
          "Ticket | Discord message [Variables: &u = username | &msg = message | &u_id = uid | &u_ip = ip] (*)",
        placeholder:
          "Hello supporter,\n\n you've got a new ticket:\nname: &u\nmessage: &msg\n\n Please answer the ticket, thanks ;)",
        default:
          "Hello supporter,\n\n you've got a new ticket:\nname: &u\nmessage: &msg\n\n Please answer the ticket, thanks ;)",
        type: "multiline",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDiscordActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                        Discord <-

      //                        -> ChannelEdit
      {
        name: "spChannelEditActiv",
        indent: 2,
        title: "[ChannelEdit] Edit your Channel",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spChanneleditInfoTutorial",
        indent: 2,
        title:
          'The new ChannelEdit System. This module now works with a "parameter"! You can now open / close every channel with the command: <!offline> <parameter> IDEA: A example parameter is "ts" = "!online ts"',
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spSupportChannelCommandOpen",
        indent: 2,
        title: "Channel open command (*)",
        placeholder: "!online",
        default: "!online",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spSupportChannelCommandClose",
        indent: 2,
        title: "Channel close command (*)",
        placeholder: "!offline",
        default: "!offline",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spChannelEdit",
        indent: 2,
        title: "ChannelEdit",
        type: "array",
        vars: [
          {
            name: "spSupportChannelNameOnlineMsg",
            indent: 1,
            title: "Channel name to set when support is open (!online)",
            placeholder: "[cspacer]Support [Online]",
            default: "[cspacer]Support [Online]",
            type: "string",
          },
          {
            name: "spSupportChannelNameOnlinDescription",
            indent: 1,
            title: "Channel description to set when support is open (!online)",
            placeholder: "Support channel is open.",
            type: "multiline",
          },
          {
            name: "spSupportChannelMaxClientsOnline",
            indent: 1,
            title: "Change the maxClients when online.",
            default: 10,
            placeholder: "10",
            type: "number",
          },
          {
            name: "spSupportChannelNameOfflineMsg",
            indent: 1,
            title: "Channel name to set when support is closed (!offline)",
            placeholder: "[cspacer]Support [Offline]",
            default: "[cspacer]Support [Offline]",
            type: "string",
          },
          {
            name: "spSupportChannelNameOfflineDescription",
            indent: 1,
            title:
              "Channel description to set when support is closed (!offline)",
            placeholder: "Support channel is closed.",
            type: "multiline",
          },
          {
            name: "spSupportChannelMaxClientsOffline",
            indent: 1,
            title: "Change the maxClients when offline.",
            placeholder: "0",
            default: 0,
            type: "number",
          },
          {
            name: "spSupportChannelOpenHours",
            indent: 1,
            title:
              "[NEW] Channel open hours. You customers can see the support times.",
            placeholder: "19:30 - 20:00 Uhr Support",
            type: "multiline",
          },
          {
            name: "spSupportChannelNameChange",
            indent: 1,
            title: "The channel that should be renamed (*)",
            type: "channel",
          },
          {
            name: "spSupportChannelSupporterId",
            indent: 1,
            title: "Supporter Id's for selected Channel. (*)",
            type: "strings",
          },
          {
            name: "spSupportChannelPasswordActiv",
            indent: 1,
            title:
              "Close offline channel with password. (No User can join.) (*)",
            type: "select",
            default: "Yes",
            options: ["Yes", "NO"],
          },
          {
            name: "spSupportChannelKickActiv",
            indent: 1,
            title:
              "If a channel is closed, kick all waiting users? (only one) (*)", // only one?
            type: "select",
            options: ["Yes", "NO"],
            default: "Yes",
          },
          {
            name: "spSupportChannelPrefix",
            indent: 1,
            title: "Support channel parameter (*)",
            placeholder: "ts //open the channel with !online ts",
            type: "string",
            default: "ts",
          },
        ],
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spSupportChannelSupporterId",
        indent: 3,
        title: "Default Supporter Id. Can change all channels. (*)",
        type: "strings",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                        ChannelEdit <-

      //                        -> Automatic Channel Manager

      {
        name: "spAutomaticChannelManager",
        indent: 2,
        title:
          "[Automatic Channel Manager] Close and open your channel autmoatically",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spSupportChannelOpenAutomatic",
        indent: 3,
        title:
          "The channel should open automatically, when supporters are online.",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spAutomaticChannelManager",
            value: true,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spSupportChannelCloseAutomatic",
        indent: 3,
        title:
          "The channel should close automatically, when no supporter is online or is afk. ",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spAutomaticChannelManager",
            value: true,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                        -> Time

      {
        name: "spTimeChannelManagerActiv",
        indent: 2,
        title: "[Time Channel Manager] Close and open your channel by schedule",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTimeZo",
        indent: 3,
        title: "Select your time zone. Check the time with !time. (*)",
        type: "select",
        options: [
          "UTC-12:00",
          "UTC-11:00",
          "UTC-10:00",
          "UTC-09:30",
          "UTC-09:00",
          "UTC-08:00",
          "UTC-07:00",
          "UTC-06:00",
          "UTC-05:00",
          "UTC-04:30",
          "UTC-04:00",
          "UTC-03:30",
          "UTC-03:00",
          "UTC-02:00",
          "UTC-01:00",
          "UTC-00:00",
          "UTC+01:00",
          "UTC+02:00",
          "UTC+03:00",
          "UTC+03:30",
          "UTC+04:00",
          "UTC+04:30",
          "UTC+05:00",
          "UTC+05:30",
          "UTC+05:45",
          "UTC+06:00",
          "UTC+06:30",
          "UTC+07:00",
          "UTC+08:00",
          "UTC+08:30",
          "UTC+08:45",
          "UTC+09:00",
          "UTC+09:30",
          "UTC+10:00",
          "UTC+10:30",
          "UTC+11:00",
          "UTC+12:00",
          "UTC+12:45",
          "UTC+13:00",
          "UTC+14:00",
        ],
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spTimeChannelManagerActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spTimeChannelManager",
        indent: 2,
        title: "Select yout time (*)",
        type: "array",
        vars: [
          {
            name: "spTimePrefix",
            indent: 1,
            title:
              "Your ChannelEdit parameter from the Module ChannelEdit! (*).",
            type: "string",
          },
          {
            name: "spTime",
            indent: 1,
            title: "Select the time for a action",
            placeholder: "17:00 or 09:00",
            type: "string",
          },
          {
            name: "spTimeAction",
            indent: 1,
            title: "Select the action on this Time. Open or Close?",
            type: "select",
            options: ["open Channel", "close channel"],
          },
        ],
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spChannelEditActiv",
            value: true,
          },
          {
            field: "spTimeChannelManagerActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                        -> Queue

      {
        name: "spQueueActiv",
        indent: 2,
        title: "[Queue] Play music for waiting users...",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spQueueOwnActiv",
        indent: 4,
        title: "Use own Music / Soundfiles",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //Start audio von stram server!

      {
        name: "spQueueTrackOffline",
        indent: 4,
        title: "Sound file (supporter offline): ",
        placeholder: "Search for track...",
        type: "track",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spQueueOwnActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spQueueTrackOnline",
        indent: 4,
        title: "Sound file (supporter online): ",
        placeholder: "Search for track...",
        type: "track",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spQueueOwnActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "best_thanks_006mi4",
        indent: 0,
        title:
          "-> Special thanks for the professional sound records to 006mi4. Check out his website: https://vcircle.eu/",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spQueueText0",
        indent: 4,
        title: "[DE] Support Offline",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Offline_FAQ_Musik",
        indent: 6,
        title: "[1] FAQ with Musik (02:17 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Offline_Lite_DE",
        indent: 6,
        title: "[2] Lite (00:11 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Offline_Lite_Dunkle_Stimme",
        indent: 6,
        title: "[3] Lite Dunkle Stimme (00:07 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Offline_Lite_Helle_Stimme",
        indent: 6,
        title: "[4] Lite Helle Stimme (00:09 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Offline_Lite_Langame_Stimme",
        indent: 6,
        title: "[5] Lite Langsamme Stimme (00:09 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Offline_Lite_Musik",
        indent: 6,
        title: "[6] Lite mit Musik (03:31 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spQueueText1",
        indent: 4,
        title: "[DE] Support Online",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Online_FAQ_DE",
        indent: 6,
        title: "[7] FAQ ohne Musik (00:21 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Online_FAQ_Musik",
        indent: 6,
        title: "[8] FAQ mit Musik (02:16 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Online_Funny_EricCartman",
        indent: 6,
        title: "[9] Funny EricCartman (00:10 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Online_Funny_EricCartman_Musik",
        indent: 6,
        title: "[10] Funny EricCartman mit Musik (02:48 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Online_Lite_Mitarbeiter",
        indent: 6,
        title: "[11] Lite Mitarbeiter (00:10 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Online_Lite_Mitarbeiter_Gespräch",
        indent: 6,
        title: "[12] Lite Mitarbeiter Gespräch (00:05 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Online_Lite_Supporter",
        indent: 6,
        title: "[13] Lite Supporter (00:10 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Online_Lite_Supporter_Gespräch",
        indent: 6,
        title: "[14] Lite Supporter Gespräch (00:05 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Online_Lite_Supporter_Gespräch_Musik",
        indent: 6,
        title: "[15] Lite Supporter Gespräch Musik (02:41 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      //Willkommen

      {
        name: "spQueueText2",
        indent: 4,
        title: "[DE] Willkommen",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Willkommen_Lite",
        indent: 6,
        title: "[16] Lite  (00:19 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Willkommen_Regeln_Funny_Musik",
        indent: 6,
        title: "[17] Regeln Funny Musik (01:38 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Willkommen_Regeln_Happy",
        indent: 6,
        title: "[18] Regeln Happy (00:14 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Willkommen_Regeln_Happy_Musik",
        indent: 6,
        title: "[19] Regeln Happy Musik (02:20 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Willkommen_Regeln_Webseite_Musik_1",
        indent: 6,
        title: "[20] Regeln Webseite Musik 1 (02:16 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Willkommen_Regeln_Webseite_Musik_2",
        indent: 6,
        title: "[21] Regeln Webseite Musik 2 (02:17 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spQueueText3",
        indent: 4,
        title: "[EN] Support",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      {
        name: "Support_Offline_Lite",
        indent: 6,
        title: "[22] Lite Funny (00:11 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "Support_Offline_Liste_Music",
        indent: 6,
        title: "[23] Lite Funny Music (03:55 min)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spSelectMusic",
        indent: 1,
        title: "Select the nummber of the Online Song. (*)",
        placeholder: "2",
        type: "number",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spSelectMusicOffline",
        indent: 1,
        title: "Select the nummber of the Offline Song. (*)",
        placeholder: "2",
        type: "number",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "best_thanks_006mi4_2",
        indent: 0,
        title:
          "-> Special thanks for the professional sound records to 006mi4. Check out his website: https://vcircle.eu/",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spQueueVolumen",
        indent: 4,
        title: "Select the Volumen:  (*)",
        placeholder: "60",
        type: "number",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spQueueResume",
        indent: 4,
        title: "Resume to last played track after queue track?",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spQueueMove",
        indent: 4,
        title: "Move the bot to the Support Channel? (Buggy!)",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spQueueActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                        -> Queue

      //                        -> AntiFlood

      {
        name: "spAntiFloodActiv",
        indent: 2,
        title: "[AntiFlood] AntiFlood Protection",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spAntiFloodInfo",
        indent: 4,
        title:
          "This module will protect your ticket / support bot against flood. (WARNING: This module uses the internal storage.)",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spAntiFloodActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spAntiFloodPointsReduce",
        indent: 4,
        title: "Reduce points per minute (*)",
        placeholder: "5",
        default: 5,
        type: "number",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spAntiFloodActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spAntiFloodPointsLimit",
        indent: 4,
        title: "Points to lock the user (*)",
        placeholder: "60",
        default: 60,
        type: "number",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spAntiFloodActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spAntiFloodPointsTicket",
        indent: 4,
        title: "Points for each ticket (*)",
        placeholder: "20",
        default: 20,
        type: "number",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spAntiFloodActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spAntiFloodPointsSupport",
        indent: 4,
        title: "Points for each support request (*)",
        placeholder: "20",
        default: 20,
        type: "number",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spAntiFloodActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                         AntiFlood <-

      //                          -> coffee stop

      {
        name: "spCoffeeStopActiv",
        indent: 2,
        title: "[☕ CoffeeBreak] Group to ignore the supporter",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spCoffeeStopGroup",
        indent: 4,
        title: "Servergroup Id to ignore the supporter. (*)",
        type: "strings",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spCoffeeStopActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                        -> Themen Notification

      {
        name: "spThemenNotificationActiv",
        indent: 2,
        title: "[ThemenNotification] Notify the topic supporter",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spThemen",
        indent: 4,
        title: "Topic (*)",
        placeholder: "2",
        type: "array",
        vars: [
          {
            name: "spThemaName",
            indent: 1,
            title: "Name of the topic (*)",
            type: "string",
          },
          {
            name: "spThemaId",
            indent: 1,
            title: "ID of the topic (*)",
            type: "number",
          },
          {
            name: "spThemaSupporterGroups",
            indent: 1,
            title: "Supporter servergroup ID for the topic (*)",
            type: "strings",
          },
        ],
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spThemenNotificationActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spThemenMessageSupporter",
        indent: 4,
        title: "Message supporter [Variable &u = User, &thema = Thema] (*)",
        placeholder: "Hey, the User &u needs support for topic &thema !",
        default: "Hey, the User &u needs support for topic &thema !",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spThemenNotificationActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spThemenMessageUser",
        indent: 4,
        title: "Message User [Variable &u = User, &thema = Thema] (*)",
        placeholder:
          "Please wait &u, a special supporter for topic &thema has been notified.",
        default:
          "Please wait &u, a special supporter for topic &thema has been notified.",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spThemenNotificationActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spThemenMessage",
        indent: 4,
        title: "Select the topic message. (*)",
        placeholder: "Please select a topic ID...\n",
        default: "Please select a topic ID...\n",
        type: "multiline",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spThemenNotificationActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                        -> Prefix

      {
        name: "spPrefixActiv",
        indent: 2,
        title: "[Prefix] Change the default prefix (e.g. Support |) (v2.0.0)",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spPrefixTicketReplay",
        indent: 4,
        title: "Change the ticket reply prefix [PRO version]",
        placeholder: "[B]Ticket replay | [/B]",
        default: "[B]Ticket replay | [/B]",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spPrefixActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spPrefixTicket",
        indent: 4,
        title: "Change the ticket prefix",
        placeholder: "[B]Ticket | [/B]",
        default: "[B]Ticket | [/B]",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spPrefixActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spPrefixSupport",
        indent: 4,
        title: "Change the support prefix",
        placeholder: "[B]Support | [/B]",
        default: "[B]Support | [/B]",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spPrefixActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spPrefixFeedback",
        indent: 4,
        title: "Change the feedback prefix",
        placeholder: "[B][Feedback][/B]",
        default: "[B][Feedback][/B]",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spPrefixActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      //                         Prefix <-

      //                          -> Feedback
      {
        name: "spFeedbackActiv",
        indent: 2,
        title:
          "[Feedback] Get feedback after a support talk. [requires MySQL] ",
        type: "checkbox",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "spFeedbackQuestions",
        indent: 4,
        title:
          "Set the Questions (Hint: The questions must be answered with a number of stars.) (*)",
        type: "array",
        vars: [
          {
            name: "spFeedbackQuestion",
            indent: 4,
            title: "Set the Question (*)",
            placeholder: "How satisfied are you with the supporter?",
            type: "string",
          },
        ],
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spFeedbackActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "msg_feedback_openFeedbakSession",
        indent: 4,
        title: "[MSG] Welcome message. Start with the feedback system (*)",
        default:
          "Welcome to the feedback system! Please help use with your participation! Thanks!",
        placeholder:
          "Welcome to the Feedback System! Please help use with your participation! Thanks!",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spFeedbackActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "msg_feedback_errorFeedbakSession",
        indent: 4,
        title: "[MSG] User pressed an unallowed key (*)",
        default: "Sorry, please complete the feedback or exit with !exit",
        placeholder: "Sorry, please complete the feedback or exit with !exit",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spFeedbackActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "msg_feedback_closeFeedbakSession",
        indent: 4,
        title: "[MSG] Close the Feedback session (*)",
        default: "Oh, ok, we close your feedback session :/",
        placeholder: "Oh, ok, we close your feedback session :/",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spFeedbackActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },
      {
        name: "msg_feedback_closeFeedbakSessionOk",
        indent: 4,
        title:
          "[MSG] Finish the Feedback session. Thanks for the participation (*)",
        default: "Thank you for your Feedback!",
        placeholder: "Thank you for your Feedback!",
        type: "string",
        conditions: [
          {
            field: "spLanguage",
            value: 0,
          },
          {
            field: "spFeedbackActiv",
            value: true,
          },
          {
            field: "spDatenschutz",
            value: 0,
          },
        ],
      },

      {
        name: "spCopyright",
        title:
          "This script is build with ❤️ by Support++ . This work is licensed under the MIT License. Support++ is a open source  project from KlexHub UG (haftungsbeschränkt)",
      },
    ],
  },
  function (sinusbot, config, info) {
    const cVersion = "2.6.0";
    //--------------------------------------------------- {Variablen} -----------------------------------------------------------

    var message_channeledit_kickreason;
    var message_channeledit_all_closed;
    var message_channeledit_all_open;
    var message_channeledit_closed;
    var message_channeledit_open;
    var message_antiflood_blocked;
    var message_channeledit_no_permission_all;
    var message_channeledit_no_permission;

    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    // Englisch Message...
    message_channeledit_kickreason = "The support channels are closed.";
    message_channeledit_all_closed =
      "[B]ChannelEdit | [/B] All support channels are now closed";
    message_channeledit_all_open =
      "[B]ChannelEdit | [/B] All support channels are now open";
    message_channeledit_closed =
      "[B]ChannelEdit | [/B] The support channels are now closed!";
    message_channeledit_open =
      "[B]ChannelEdit | [/B] The support channels are now open!";
    message_antiflood_blocked =
      "[color=#aa0000][b][Support++] This action is currently not possible because of spam protection. Try again in a few seconds.[/b][/color]";
    message_channeledit_no_permission_all =
      "[color=#aa0000][b][Support++] You dont have permission to change all support channel! Put your server group id into the field: 'Default Supporter Id. Can change all Channel' [/b][/color]";
    message_channeledit_no_permission =
      "[color=#aa0000][b][Support++] You dont have permission to change the support channel '&channel' ! Put your server group id into the field: 'Supporter Id's for selected Channel.' [/b][/color]";
    //}

    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    //Require module variables
    var event = require("event");
    var engine = require("engine");
    var backend = require("backend");
    var media = require("media");
    var audio = require("audio");
    var store = require("store");
    var db = require("db");
    var helpers = require("helpers");
    var http = require("http");

    //Warning! At the moment the part below don't work! Wait on update of the lib (command.js)
    //============================ { Register Commands for lib (command.js) created by Multivitamin } ============================

    // We use the Command.js version for our commands. You can see now all commands with !help.
    //Register command.js lib!

    event.on("load", () => {
      var Command3rd = require("command");
      if (!Command3rd) {
        engine.log(
          "Command.js library not found! Please download Command.js and enable it to be able use this script! Or use the Version > 1.0.0"
        );
        return;
      }

      /*
       * Register commands for the command.js lib by multivitamine
       */

      const sppCmd = Command3rd.createCommandGroup("spp").help(
        "Support++ Commands"
      );

      sppCmd
        .addCommand("info")
        .help("Show info about the installed Script")
        .exec((client, args, reply) => {
          client.chat(
            `Support++ [${cVersion}] [url=https://forum.sinusbot.com/resources/support.229/]Sinusbot Forum[/url] - [url=https://meta.support-pp.de]Support++ Forum[/url]`
          );
        });

      sppCmd
        .addCommand("version")
        .help("Show the current script version")
        .exec((client, args, reply) => {
          client.chat(`Version [${cVersion}]`);
        });

      sppCmd
        .addCommand("time")
        .help("Debug command for ChannelEdit time module.")
        .exec((client, args, reply) => {
          client.chat(`Current time [${new Date().toString()}]`);
        });

      //Check and register if possible.
      if (config.spTicketCommand.length < 2) {
        console.log(
          "Error: The Ticket command from Support++ need a min length of two chars! e.g. !t"
        );
        return;
      }
      var ticketCmdSep = config.spTicketCommand.replace(
        config.spTicketCommand.charAt(0),
        ""
      );
      if (config.spTicketActiv) {
        Command3rd.createCommand(ticketCmdSep)
          .help("create a new ticket")
          .manual(`Create a new ticket with ${config.spTicketCommand} <text>`)
          .forcePrefix(config.spTicketCommand.charAt(0))
          .addArgument((args) => args.string.setName("text"))

          /*
            .checkPermission(client => {
            //returns true when the client is in the list of allowed clients
            return allowed.includes(client.uid())
            })
            */
          .exec((client, args, reply, raw) => {
            //nothing handle self.
          });
      }
    });

    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    //Set default undefined! Defaults vars...

    if (!config) config = {};

    if (typeof config.spSupportUserNoMessage == "undefined") {
      config.poke = "Sorry &u, but no supporter are online!";
      engine.saveConfig(config);
    }
    if (typeof config.spSupportUserIgnoreMessage == "undefined") {
      config.poke = "Sorry &u, but you are on the ignore list!";
      engine.saveConfig(config);
    }

    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    var useReplayToken = true;
    //function
    var startOk = true;
    if (typeof config.spSupportChannels == "undefined") {
      startOk = false;
    }
    if (typeof config.spMsgMode_sp == "undefined") {
      startOk = false;
    }
    if (typeof config.spTicketResponseToken == "undefined") {
      useReplayToken = false;
    }

    var ChannelOpenCommand = "!online";
    if (config.spSupportChannelCommandOpen != "") {
      ChannelOpenCommand = config.spSupportChannelCommandOpen;
    }
    var ChannelCloseCommand = "!offline";
    if (config.spSupportChannelCommandClose != "") {
      ChannelCloseCommand = config.spSupportChannelCommandClose;
    }

    if (startOk) {
      engine.notify("Support++ is running!");
    } else {
      engine.notify("Support ++ | You must fill out all required (*) fields ");
      engine.log("WARNING! You have to compleate all required (*) fields!");
    }
    var n_sp = 0;
    var n_user = 1;

    if (typeof config.spMsgMode_sp != "undefined") {
      n_sp = config.spMsgMode_sp;
    }

    if (typeof config.spMsgMode_user != "undefined") {
      n_user = config.spMsgMode_user;
    }

    //--------------------------------------------------- {ReplayTicket (PRO)} -----------------------------------------------------------

    if (useReplayToken && config.spDiscordActiv) {
      setInterval(function () {
        replayTicketMessage();
      }, 20000);
    }

    function replayTicketMessage() {
      /*
        http({
            url: 'https://api.support-pp.de/discord?re=replay&token=' + encodeURIComponent(config.spDiscordToken) + "&id=" + encodeURIComponent(config.spDiscordID) + "&replayToken=" + encodeURIComponent(config.spTicketResponseToken)
        }, function (err, res) {
            if (err) {
                log('phpCode: ' + err);
                return
            }
            if (res.statusCode == 200) {
                var response = JSON.parse(res.data);

                response.forEach(function (r) {
                    var uid = r.uid;
                    var msg = r.msg;
                    if (msg != "") {
                        //Check Online User.
                        var sendLive = false;
                        backend.getClients().forEach(function (client) {
                            if (uid == client.uid()) {
                                sendLive = true;
                            }
                        });

                        if (sendLive) {
                            //Send Replay live to online user
                            if (config.spMsgMode_user == 0) {
                                backend.getClientByUID(uid).poke(prefixTicketReplay + msg);
                            } else {
                                backend.getClientByUID(uid).chat(prefixTicketReplay + msg);
                            }
                        } else {
                            //Save the Replay into the sorage. 
                            store.set("replay_" + uid, msg)
                            engine.log('Set replay to store.')

                        }


                    }

                });

            }
        });
        */
    }

    //--------------------------------------------------- {ReplayTicket (PRO)} -----------------------------------------------------------

    // Function startsWith
    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function (searchString, position) {
        return this.substr(position || 0, searchString.length) === searchString;
      };
    }
    function sendTelegram(text) {
      if (config.spTelegramActiv) {
        http.simpleRequest({
          url:
            "https://api.telegram.org/bot" +
            encodeURIComponent(config.spTelegramToken) +
            "/sendMessage?chat_id=" +
            encodeURIComponent(config.spTelegramID) +
            "&text=" +
            encodeURIComponent(text),
          timeout: 60000,
        });
        engine.log("TelegramNotification send...");
      }
    }

    //Please change the url, if you want to use a selfhost bot.
    const DiscordApiUrl = "https://api.support-pp.de";
    function sendDiscord(text, clientUid) {
      if (config.spDiscordActiv) {
        engine.log("    > Send DiscordNotification (...)");
        http.simpleRequest(
          {
            method: "POST",
            url: DiscordApiUrl + "/api/discord/notification",
            timeout: 60000,
            body: JSON.stringify({ embed: true, message: text }),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + config.spDiscordToken,
            },
          },
          function (error, response) {
            if (error) {
              engine.log("    = Error: " + error);
              return;
            }

            if (response.statusCode != 200) {
              engine.log("    = HTTP Error: " + response.status);
              return;
            }
            var res;
            try {
              res = JSON.parse(response.data.toString());
            } catch (err) {
              engine.log("    = " + err.message);
            }

            if (res === undefined) {
              engine.log("    = Invalid JSON.");
              return;
            }

            // success!
            engine.log("    = " + JSON.stringify(res));
          }
        );
      }
    }

    function deleteDuplicates(arr) {
      var temp = {};
      for (var i = 1; i < arr.length; i++) temp[arr[i]] = true;
      var r = [];
      for (var k in temp) r.push(k);
      return r;
    }

    function getSupporter(groupArray) {
      var supporter = [];
      var i = 0;

      if (groupArray == "all") {
        config.spSupportChannels.forEach(function (spg) {
          backend.getClients().forEach(function (client) {
            client.getServerGroups().forEach(function (group) {
              spg.spSupporterId.forEach(function (group2) {
                if (isAFK(client.getChannels()[0].id())) {
                  if (!isInCoffeeBreak(client)) {
                    if (group.id() == group2) {
                      i = i + 1;

                      supporter[i] = client.id();
                    }
                  }
                }
              });
            });
          });
        });
      } else {
        backend.getClients().forEach(function (client) {
          client.getServerGroups().forEach(function (group) {
            groupArray.forEach(function (group2) {
              if (isAFK(client.getChannels()[0].id())) {
                if (!isInCoffeeBreak(client)) {
                  if (group.id() == group2) {
                    i = i + 1;
                    supporter[i] = client.id();
                  }
                }
              }
            });
          });
        });
      }

      return supporter;
    }

    function getSupporterInt() {
      var supporter = [];
      var i = 0;
      config.spSupportChannels.forEach(function (spg) {
        backend.getClients().forEach(function (client) {
          client.getServerGroups().forEach(function (group) {
            spg.spSupporterId.forEach(function (group2) {
              if (isAFK(client.getChannels()[0].id())) {
                if (!isInCoffeeBreak(client)) {
                  if (group.id() == group2) {
                    i = i + 1;

                    supporter[i] = client.id();
                  }
                }
              }
            });
          });
        });
      });

      var re = deleteDuplicates(supporter);
      return re.length - 1;
    }

    //Check Ignore User
    function isIgnore(client) {
      var ignore = false;
      config.spSupportChannels.forEach(function (spg) {
        backend
          .getClientByID(client)
          .getServerGroups()
          .forEach(function (group) {
            config.spIgnoreId.forEach(function (group2) {
              spg.spSupporterId.forEach(function (group3) {
                if (group.id() == group2 || group.id() == group3) {
                  ignore = true;
                }
              });
            });
          });
      });
      return ignore;
    }

    //Check CoffeeBreak Supporter
    function isInCoffeeBreak(client) {
      if (!config.spCoffeeStopActiv) {
        return false;
      }

      var ignore = false;

      client.getServerGroups().forEach(function (group) {
        config.spCoffeeStopGroup.forEach(function (group2) {
          if (group.id() == group2) {
            ignore = true;
          }
        });
      });

      return ignore;
    }

    //Check Ignore User
    function isIgnore(client) {
      var ignore = false;
      config.spSupportChannels.forEach(function (spg) {
        backend
          .getClientByID(client)
          .getServerGroups()
          .forEach(function (group) {
            config.spIgnoreId.forEach(function (group2) {
              spg.spSupporterId.forEach(function (group3) {
                if (group.id() == group2 || group.id() == group3) {
                  ignore = true;
                }
              });
            });
          });
      });
      return ignore;
    }

    // AFK Channel?

    function isAFK(id) {
      var afkChannels = config.spAfkChannels;
      if (afkChannels != undefined) {
        for (var i = 0; i < afkChannels.length; i++) {
          if (afkChannels[i].spAfkChannel == id) {
            return false;
          }
          if (backend.getChannelByID(id).parent() != undefined) {
            if (
              afkChannels[i].spAfkChannel ==
              backend.getChannelByID(id).parent().id()
            ) {
              return false;
            }
          }
        }
      }
      return true;
    }

    function IsUserSupporter(clientId) {
      var is = false;
      config.spSupportChannels.forEach(function (spg) {
        backend
          .getClientByID(clientId)
          .getServerGroups()
          .forEach(function (group) {
            spg.spSupporterId.forEach(function (group3) {
              if (group.id() == group3) {
                is = true;
              }
            });
          });
      });
      return is;
    }

    /**
     * Remove duplicates from array
     *
     */

    function deleteDuplicates(arr) {
      var temp = {};
      for (var i = 0; i < arr.length; i++) temp[arr[i]] = true;
      var r = [];
      for (var k in temp) r.push(k);
      return r;
    }

    //--------------------------------------------------- {Prefix} -----------------------------------------------------------

    var prefixTicket;
    var prefixSupport;
    var feedback_prefix;
    var prefixTicketReplay;

    if (config.spPrefixActiv) {
      if (typeof config.spPrefixTicket == "undefined") {
        prefixTicket = "[B]Ticket | [/B]";
      } else {
        prefixTicket = config.spPrefixTicket + " ";
      }
      if (typeof config.spPrefixFeedback == "undefined") {
        feedback_prefix = "[B][Feedback] [/B] ";
      } else {
        feedback_prefix = config.spPrefixFeedback + " ";
      }
      if (typeof config.spPrefixSupport == "undefined") {
        prefixSupport = "[B]Support | [/B]";
      } else {
        prefixSupport = config.spPrefixSupport + " ";
      }
      if (typeof config.spPrefixTicketReplay == "undefined") {
        prefixTicketReplay = "[B]Ticket replay | [/B]";
      } else {
        prefixSupport = config.spPrefixSupport + " ";
      }
    } else {
      prefixSupport = "[B]Support | [/B]";
      prefixTicket = "[B]Ticket | [/B]";
      prefixTicketReplay = "[B]Ticket replay | [/B]";
      feedback_prefix = "[B][Feedback] [/B] ";
    }

    //--------------------------------------------------- {Support++ API} -----------------------------------------------------------

    function SendCreateTicketToAPI(title, content, userid, author) {
      if (config.spAPIActiv) {
        http.simpleRequest(
          {
            method: "POST",
            url:
              "http://api.support-pp.de:9696/api/ticket?title=" +
              encodeURIComponent(title) +
              "&content=" +
              encodeURIComponent(content) +
              "&tagid=2&userid=" +
              encodeURIComponent(userid) +
              "&author=" +
              encodeURIComponent(author) +
              "&platform=teamspeak",
            timeout: 6000,
            headers: {
              authorization: config.spAPIToken,
              "cache-control": "no-cache",
            },
          },
          function (error, response) {
            if (response.statusCode != 200) {
              engine.log(error);
              return;
            }

            var res;
            try {
              res = JSON.parse(response.data);
            } catch (err) {
              engine.log(err.message);
            }
            if (res === undefined) {
              engine.log("Error in JSON!");
              return;
            }
            if (res.Status == 201) {
              engine.log("[Support++ API] Ticket succesfull created!");
              return;
            }
            engine.log(
              " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ SUPPORT++ | ERROR ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
            );
            engine.log(res);
            engine.log(
              " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ SUPPORT++ | ERROR ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
            );
          }
        );
        //
      }
    }

    //--------------------------------------------------- {AntiFlood} -----------------------------------------------------------

    function AntiFlood(clientId, points) {
      if (config.spAntiFloodActiv) {
        var uid = backend.getClientByID(clientId).uid();
        var ds = store.get(uid);

        store.set(uid, ds + points);
      } else {
        return false;
      }
    }

    function isFlood(clientId, points) {
      var uid = backend.getClientByID(clientId).uid();
      var client = backend.getClientByID(clientId);
      var ds = store.get(uid);

      if (ds >= config.spAntiFloodPointsLimit) {
        client.chat(message_antiflood_blocked);
        AntiFlood(clientId, points);
        return true;
      } else {
        AntiFlood(clientId, points);
        return false;
      }
    }
    setInterval(function () {
      store.getKeys().forEach(function (key) {
        var ds = store.get(key);
        if (ds <= 0) {
          store.unset(key);
        } else {
          store.set(key, ds - config.spAntiFloodPointsReduce);
        }
      });
    }, 60000);

    //--------------------------------------------------- {function  event} -----------------------------------------------------------

    //MoveEvent -> User joint Support Channel
    event.on("clientMove", function (ev) {
      if (!backend.isConnected()) return;
      if (ev.client.isSelf()) return;
      if (typeof ev.toChannel == "undefined") return;

      //Send Message (Supporter)
      function sendMessage(client, message, type) {
        if (type == "sp") {
          if (n_sp == 0) {
            client.poke(
              prefixSupport + message.replace("&u", ev.client.name())
            );
          } else {
            client.chat(
              prefixSupport + message.replace("&u", ev.client.name())
            );
          }
        } else {
          if (n_user == 0) {
            client.poke(
              prefixSupport + message.replace("&u", ev.client.name())
            );
          } else {
            client.chat(
              prefixSupport + message.replace("&u", ev.client.name())
            );
          }
        }
      }

      //--------------------------------------------------- {Replay Store Message (PRO)} -----------------------------------------------------------

      if (useReplayToken) {
        store.getKeys().forEach(function (s) {
          if (s.startsWith("replay_")) {
            if (s == "replay_" + ev.client.uid()) {
              var msg = store.get("replay_" + ev.client.uid());
              if (n_user == 0) {
                ev.client.poke(prefixTicketReplay + msg);
              } else {
                ev.client.chat(prefixTicketReplay + msg);
              }
              store.unset("replay_" + ev.client.uid());
            }
          }
        });
      }

      //--------------------------------------------------- {Join Support Channel} -----------------------------------------------------------

      var channel;

      //Check is join Support Channel
      config.spSupportChannels.forEach(function (sp) {
        channel = ev.client.getChannels();
        if (channel[0].id() == sp.spSupportChannel) {
          if (config.spThemenNotificationActiv) {
            ev.client.chat(config.spThemenMessage);
          } else {
            //Check is user ignore?
            if (isFlood(ev.client.id(), config.spAntiFloodPointsSupport)) {
            } else {
              if (isIgnore(ev.client.id())) {
                sendMessage(
                  ev.client,
                  config.spSupportUserIgnoreMessage,
                  "user"
                );
              } else {
                //Check Supporter Online?
                if (!(getSupporter(sp.spSupporterId).length > 0)) {
                  if (
                    (config.spDiscordModeSupport == 1 ||
                      config.spDiscordModeSupport == 0) &&
                    config.spDiscordActiv
                  ) {
                    sendDiscord(
                      config.spDiscordTextSupport.replace(
                        "&u",
                        ev.client.name()
                      ),
                      0,
                      0
                    );
                  }
                  if (
                    (config.spTelegramModeSupport == 1 ||
                      config.spTelegramModeSupport == 0) &&
                    config.spTelegramActiv
                  ) {
                    sendTelegram(
                      config.spTelegrammTextSupport.replace(
                        "&u",
                        ev.client.name()
                      )
                    );
                  }
                  playQueuTrackOffline(ev.client.getChannels()[0]);
                  sendMessage(ev.client, config.spSupportUserNoMessage, "user");
                } else {
                  //Supporter is Online!

                  getSupporter(sp.spSupporterId).forEach(function (
                    onlineSupporterID
                  ) {
                    //GetSupporter action
                    setTimeout(function () {
                      sendMessage(
                        backend.getClientByID(onlineSupporterID),
                        sp.spSupportMessage.replace("&spI", getSupporterInt()),
                        "sp"
                      );
                    }, 10);
                  });
                  //Send User Message
                  sendMessage(
                    ev.client,
                    sp.spSupportUserMessage.replace("&spI", getSupporterInt()),
                    "user"
                  );
                  if (config.spTelegramModeSupport == 0) {
                    sendTelegram(
                      config.spTelegrammTextSupport.replace(
                        "&u",
                        ev.client.name()
                      )
                    );
                  }
                  if (config.spDiscordModeSupport == 0) {
                    sendDiscord(
                      config.spDiscordTextSupport.replace(
                        "&u",
                        ev.client.name()
                      ),
                      0,
                      0
                    );
                  }
                  //playTTS(sp.spSupportUserMessage.replace("&u", ev.client.name()))
                  playQueuTrack(ev.client.getChannels()[0]);
                }
              }
            }
          }
        }
      });
    });

    //--------------------------------------------------- {Feedback System} -----------------------------------------------------------
    // This is a new Module (like 2.0.5)
    //With this module you can get Feedback from your User after a Support talk!
    // The Feedback is save in the MySQL DB.
    var session_prefix = "$session_feedback_new_";
    var msg_feedback_openFeedbakSession =
      "Welcome to the feedback system! Please help use with your participation! Thanks! Inert a number beetween 1 and 5.";
    var msg_feedback_errorFeedbakSession =
      "Sorry, please complete the feedback or exit with !exit";
    var msg_feedback_closeFeedbakSession =
      "Oh, ok, we close your feedback session :/";
    var msg_feedback_closeFeedbakSessionOk = "Thank you for the feedback!";
    var msg_feedback_to_invoker = "We ask the user &u for a feedback.";
    var msg_feedbacl_list_failCommand =
      "You can get the feedback of a supporter with !feedbacks <uid>";
    var msg_feedback_unknow =
      "Oh, I have a problem with the mysql connection! Please check if uid exist and sinusbot can connect to MySQL.";

    if (typeof config.msg_feedback_openFeedbakSession != "undefined") {
      msg_feedback_openFeedbakSession = config.msg_feedback_openFeedbakSession;
    }
    if (typeof config.msg_feedback_errorFeedbakSession != "undefined") {
      msg_feedback_errorFeedbakSession =
        config.msg_feedback_errorFeedbakSession;
    }
    if (typeof config.msg_feedback_closeFeedbakSession != "undefined") {
      msg_feedback_closeFeedbakSession =
        config.msg_feedback_closeFeedbakSession;
    }
    if (typeof config.msg_feedback_closeFeedbakSessionOk != "undefined") {
      msg_feedback_closeFeedbakSessionOk =
        config.msg_feedback_closeFeedbakSessionOk;
    }
    if (typeof config.msg_feedback_openFeedbakSession != "undefined") {
      msg_feedback_openFeedbakSession = config.msg_feedback_openFeedbakSession;
    }

    //Create DB if activated
    event.on("clientMove", function (ev) {
      if (!config.spFeedbackActiv) return;
      if (!backend.isConnected()) return;
      if (ev.client.isSelf()) return;
      if (typeof ev.toChannel == "undefined") {
        if (feedback_has_activ_session(ev.client.id())) {
          feedback_close_session(ev.client.id());
        }
      }

      var formChannelId = 0;
      if (ev.fromChannel != null) {
        formChannelId = ev.fromChannel.id();
      }

      if (feedback_has_activ_session(ev.client.id())) return;
      //Check is user move out from Support channel

      config.spSupportChannels.forEach(function (channels) {
        if (formChannelId == channels.spSupportChannel) {
          feedback_start_session(ev.client.id(), ev.invoker.uid());
          //TODO IGNORE
        }
      });

      function feedback_start_session(clientId, supporterUid) {
        store.set(session_prefix + clientId, supporterUid);
        store.set(session_prefix + clientId + "_id", 0);
        ev.client.chat(feedback_prefix + msg_feedback_openFeedbakSession);
        ev.invoker.chat(
          feedback_prefix +
            msg_feedback_to_invoker.replace("&u", ev.client.name())
        );
        feedback_ask_question(ev.client.id());
      }
    });

    function feedback_register_answear(clientId, answearId) {
      var id = store.get(session_prefix + clientId + "_id");
      var supporterUUID = store.get(session_prefix + clientId);
      //store.unset(session_prefix + clientId + "_id");
      //store.set(session_prefix + clientId + "_id", id = id+1);
      var questionCount = 0;
      var question;
      //Save to DB
      config.spFeedbackQuestions.forEach(function (s, i, o) {
        questionCount = questionCount + 1;
        if (id == i) {
          if (!feedback_has_activ_session(clientId)) return;
          var isExist = true;
          var existData = { count: 0, answearSum: 0 };
          question = s.spFeedbackQuestion;
          if (dbc)
            dbc.query(
              "SELECT * FROM sp_feedback WHERE fb_question = ? AND sp_uid = ?",
              s.spFeedbackQuestion,
              supporterUUID,
              async function (err, res) {
                if (!err) {
                  if (res.length == 0) {
                    isExist = false;
                  } else {
                    await res.forEach(function (row) {
                      existData.count = row.fb_count;
                      existData.answearSum = row.fb_answear;
                    });
                  }
                }
                engine.log("[MySQL] Insert new Question to DB.");
                if (dbc)
                  if (!isExist) {
                    engine.log("INSERT QUESTION");
                    dbc.exec(
                      "INSERT INTO sp_feedback (sp_uid, fb_question, fb_answear, fb_count) VALUE (?, ?, ?, ?)",
                      supporterUUID,
                      s.spFeedbackQuestion,
                      answearId,
                      1
                    );
                  } else {
                    engine.log("UPDATE QUESTION");
                    dbc.exec(
                      "UPDATE sp_feedback SET fb_answear = ?, fb_count = ? WHERE fb_question = ? AND sp_uid = ?",
                      parseInt(existData.answearSum) + parseInt(answearId),
                      existData.count + 1,
                      s.spFeedbackQuestion,
                      supporterUUID
                    );
                  }
              }
            );
        }
      });

      store.set(session_prefix + clientId + "_id", (id = id + 1));
      var nid = store.get(session_prefix + clientId + "_id");
      if (nid == questionCount) {
        feedback_close_session(clientId);
      } else {
        feedback_ask_question(clientId);
      }
    }

    event.on("chat", function (ev) {
      if (!backend.isConnected()) return;
      if (ev.client.isSelf()) return;

      if (ev.text == "!feedbacks") {
        ev.client.chat(feedback_prefix + msg_feedbacl_list_failCommand);
        return;
      }

      if (ev.text.startsWith("!feedbacks ")) {
        var error = true;
        ev.client.chat(
          "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ Feddbacks | " +
            ev.text.replace("!feedbacks ", "") +
            " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
        );
        if (dbc)
          dbc.query(
            "SELECT * FROM sp_feedback WHERE sp_uid = ?",
            ev.text.replace("!feedbacks ", ""),
            function (err, res) {
              engine.log("REQUEST :: " + JSON.stringify(res));
              if (res.length == 0) {
                ev.client.chat("No user found with this uid.");
                return;
              }

              if (!err) {
                engine.log(res);
                res.forEach(function (row) {
                  error = false;
                  engine.log(row.fb_answear / row.fb_count);
                  ev.client.chat(
                    "❯ " +
                      parseString(row.fb_question) +
                      " | " +
                      IntToStarString(row.fb_answear / +row.fb_count, 2) +
                      " | Ø" +
                      extround(row.fb_answear / +row.fb_count, 2)
                  );
                });
              } else {
                ev.client.chat("ERROR :: " + err);
              }
              ev.client.chat(
                "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ Feddbacks | " +
                  ev.text.replace("!feedbacks ", "") +
                  " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
              );
            }
          );
        return;
      }
      function extround(zahl, n_stelle) {
        zahl = Math.round(zahl * n_stelle) / n_stelle;
        return zahl;
      }

      if (!feedback_has_activ_session(ev.client.id())) return;
      if (ev.text == "!info") return;
      if (ev.text == "!help") return;
      if (ev.text == "!time") return;
      if (ev.text == "!version") return;

      if (ev.text == "!exit") {
        feedback_close_session(ev.client.id());
        ev.client.chat(msg_feedback_closeFeedbakSession);
        return;
      }

      if (ev.text <= 5) {
        feedback_register_answear(ev.client.id(), ev.text);
      } else {
        ev.client.chat(msg_feedback_errorFeedbakSession);
        return;
      }
    });

    function feedback_ask_question(clientId) {
      var id = store.get(session_prefix + clientId + "_id");
      var tmpID = 0;
      config.spFeedbackQuestions.forEach(function (s, i, o) {
        if (id == i++) {
          backend.getClientByID(clientId).chat(s.spFeedbackQuestion);
          return;
        } else {
          tmpID = tmpID + 1;
        }
      });
    }

    function feedback_has_activ_session(clientId) {
      if (store.get(session_prefix + clientId) != null) {
        return true;
      } else {
        return false;
      }
    }

    function feedback_close_session(clientId) {
      store.unset(session_prefix + clientId);
      backend
        .getClientByID(clientId)
        .chat(feedback_prefix + msg_feedback_closeFeedbakSessionOk);
    }

    function IntToStarString(aNumber) {
      engine.log("A NUMBER :: " + aNumber);
      var starString = "☆☆☆☆☆";
      if (aNumber > 0) {
        starString = "☆☆☆☆☆";
      }
      if (aNumber > 0.5) {
        starString = "★☆☆☆☆";
      }
      if (aNumber > 1.5) {
        starString = "★★☆☆☆";
      }
      if (aNumber > 2.5) {
        starString = "★★★☆☆";
      }
      if (aNumber > 3.5) {
        starString = "★★★★☆";
      }
      if (aNumber > 4.5) {
        starString = "★★★★★";
      }
      return starString;
    }

    //--------------------------------------------------- {/Feedback System} -----------------------------------------------------------

    //--------------------------------------------------- {MySQL Connection} -----------------------------------------------------------

    //INFO reset: ALTER TABLE sp_supporter AUTO_INCREMENT = 1
    //Create Table `sp_supporter`

    if (config.spMySQLActiv) {
      var mysql_host = config.spHost;
      var mysql_username = config.spUsername; //config.spUsername;
      var mysql_db = config.spDB;
      var mysql_password = config.spPassword; //config.spPassword;

      var dbc = db.connect(
        {
          driver: "mysql",
          host: mysql_host,
          username: mysql_username,
          password: mysql_password,
          database: mysql_db,
        },
        function (err) {
          if (err) {
            engine.log(err);
          } else {
            engine.log("[Support++] DB connection OK!");
          }
        }
      );
      if (dbc)
        dbc.exec(
          "CREATE TABLE IF NOT EXISTS `sp_supporter` ( `id` int(11) NOT NULL AUTO_INCREMENT, `sp_uid` varchar(100) NOT NULL, `sp_name` varchar(100) DEFAULT NULL, `sp_hierarchy_id` int(20) DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `unique_index` (`sp_name`,`sp_uid`) ) CHARSET=utf8mb4"
        );
      if (dbc)
        dbc.exec(
          "CREATE TABLE IF NOT EXISTS `sp_feedback` ( `id` int(11) NOT NULL AUTO_INCREMENT, `sp_uid` varchar(100) NOT NULL, `fb_question` TEXT NOT NULL, `fb_answear` int(11) NOT NULL, `fb_count` int(11) NOT NULL, PRIMARY KEY (`id`) ) CHARSET=utf8mb4"
        );
      if (dbc)
        /*  dbc.exec(
          "CREATE TABLE IF NOT EXISTS `sp_tickets` (`id` int(11) NOT NULL AUTO_INCREMENT,`text` text NOT NULL,`uuid` varchar(30) NOT NULL,`name` text NOT NULL,`version` varchar(60) NOT NULL,`status` tinyint(4) NOT NULL,`data_close` timestamp NULL DEFAULT NULL,`date_open` timestamp NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8"
        );*/
        engine.log("[Support++] Create new DB if not exist...");

      //if (dbc) dbc.exec("INSERT INTO sp_supporter (sp_uid, sp_name) VALUES ('fdff', 'dddd')");
      if (dbc)
        dbc.query("SELECT * FROM sp_supporter", function (err, res) {
          if (!err) {
            res.forEach(function (row) {
              engine.log("FROM DB: " + helpers.toString(row.sp_uid));
            });
          }
        });
    }

    function parseString(val) {
      return Array.isArray(val)
        ? val.map((c) => String.fromCharCode(c)).join("")
        : "";
    }
    //--------------------------------------------------- {/MySQL Connecion} -----------------------------------------------------------

    //--------------------------------------------------- {functionen Chat} -----------------------------------------------------------

    event.on("chat", function (ev) {
      if (!backend.isConnected()) return;
      if (ev.client.isSelf()) return;

      if (ev.client.isSelf()) {
        return;
      }

      // Send Message (Supporter)
      function sendMessage(client, message, tr, type) {
        if (tr) {
          if (type == "sp") {
            if (n_sp == 0) {
              client.poke(
                prefixTicket + message.replace("&u", ev.client.name())
              );
            } else {
              client.chat(
                prefixTicket + message.replace("&u", ev.client.name())
              );
            }
          } else {
            if (n_user == 0) {
              client.poke(
                prefixTicket + message.replace("&u", ev.client.name())
              );
            } else {
              client.chat(
                prefixTicket + message.replace("&u", ev.client.name())
              );
            }
          }
        } else {
          if (type == "sp") {
            if (n_sp == 0) {
              client.poke(prefixTicket + message);
            } else {
              client.chat(prefixTicket + message);
            }
          } else {
            if (n_user == 0) {
              client.poke(prefixTicket + message);
            } else {
              client.chat(prefixTicket + message);
            }
          }
        }
      }
      //--------------------------------------------------- {Ticket System } -----------------------------------------------------------

      var discord = false;
      var discordTicket = config.spDiscordTextTicket;
      var telegram = false;
      var telegramTicket = config.spTelegrammTextTicket;

      function sendToNotificationModule() {
        if (
          (telegram && config.spTelegramModeTicket == 0) ||
          config.spTelegramModeTicket == 1
        ) {
          sendTelegram(telegramTicket);
        }
        if (
          (discord && config.spDiscordModeTicket == 0) ||
          config.spDiscordModeTicket == 1
        ) {
          sendDiscord(discordTicket, ev.client.uid(), 1);
        }
      }
      var ticket = "no Text!";

      //Ticket replace
      ticket = ev.text.replace(config.spTicketCommand, "");

      if (config.spDiscordActiv) {
        discordTicket = discordTicket.replace("&u", ev.client.name());
        discordTicket = discordTicket.replace("&msg", ticket);
        discordTicket = discordTicket.replace("&u_id", ev.client.uid());
        discordTicket = discordTicket.replace(
          "&u_ip",
          ev.client.getIPAddress()
        );
        discord = true;
      }
      if (config.spTelegramActiv) {
        telegram = true;
        telegramTicket = telegramTicket.replace("&u", ev.client.name());
        telegramTicket = telegramTicket.replace("&msg", ticket);
        telegramTicket = telegramTicket.replace("&u_id", ev.client.uid());
        telegramTicket = telegramTicket.replace(
          "&u_ip",
          ev.client.getIPAddress()
        );
      }

      if (ev.text.split(" ")[0] == config.spTicketCommand) {
        if (ev.text.split(" ").length == 1) {
          ev.client.chat(
            `Please add a text to you ticket. Usage: ${config.spTicketCommand} <text for ticket>`
          );
          return;
        }
        if (!isFlood(ev.client.id(), config.spAntiFloodPointsSupport)) {
          if (!isIgnore(ev.client.id()) || config.spTicketForceIgnoredUsers) {
            //|| config.spTicketCommand
            //send bestätigung Ticket
            engine.log("Create Ticket");
            if (config.spThemenNotificationActiv) {
              config.spThemen.forEach(function (themen) {
                var startsWithCommand = ticket.startsWith(
                  " " + themen.spThemaId
                );
                engine.log("Ticket " + ticket + " ID " + themen.spThemaId);
                engine.log(startsWithCommand);
                if (startsWithCommand) {
                  ticket.replace(themen.spThemaId);
                  sendMessage(ev.client, config.spTicketSendMsg, true, "user");
                  backend.getClients().forEach(function (client) {
                    client.getServerGroups().forEach(function (group) {
                      themen.spThemaSupporterGroups.forEach(function (group2) {
                        if (isAFK(client.getChannels()[0].id())) {
                          if (group.id() == group2) {
                            var client_object =
                              "[URL=client://0/" +
                              ev.client.uid() +
                              "]" +
                              ev.client.name() +
                              "[/URL]";
                            var msg = config.spNewTicketMsg.replace(
                              "&u",
                              ev.client.name()
                            );
                            if (n_sp == 0) {
                              client.poke(
                                prefixTicket +
                                  msg.replace("&client", client_object)
                              );
                            } else {
                              client.chat(
                                prefixTicket +
                                  msg.replace("&client", client_object)
                              );
                            }
                            client.chat(prefixTicket + ticket);
                            if (config.spTicketLargeActiv == 1) {
                              engine.log("Create ticket (DB)");
                              CreateTicketDb(ev.client, ticket);
                            }
                            SendCreateTicketToAPI(
                              "Tichet from " + ev.client.name(),
                              ticket,
                              ev.client.uid(),
                              ev.client.name()
                            );
                          }
                        }
                      });
                    });
                  });
                }
              });
              setTimeout(function () {
                sendToNotificationModule();
              }, 10);
            } else if (!config.spThemenNotificationActiv) {
              engine.log("Themen Module -> Ticket recived");
              sendMessage(ev.client, config.spTicketSendMsg, true, "user");
              config.spSupportChannels.forEach(function (spg) {
                backend.getClients().forEach(function (client) {
                  client.getServerGroups().forEach(function (group) {
                    spg.spSupporterId.forEach(function (group2) {
                      if (isAFK(client.getChannels()[0].id())) {
                        if (group.id() == group2) {
                          var client_object =
                            "[URL=client://0/" +
                            ev.client.uid() +
                            "]" +
                            ev.client.name() +
                            "[/URL]";
                          var msg = config.spNewTicketMsg.replace(
                            "&u",
                            ev.client.name()
                          );
                          if (n_sp == 0) {
                            client.poke(
                              prefixTicket +
                                msg.replace("&client", client_object)
                            );
                          } else {
                            client.chat(
                              prefixTicket +
                                msg.replace("&client", client_object)
                            );
                          }
                          client.chat(prefixTicket + ticket);
                          SendCreateTicketToAPI(
                            "Tichet from " + ev.client.name(),
                            ticket,
                            ev.client.uid(),
                            ev.client.name()
                          );
                          if (config.spTicketLargeActiv == 1) {
                            engine.log("Create ticket (DB)");
                            CreateTicketDb(ev.client, ticket);
                          }
                        }
                      }
                    });
                  });
                });
              });
              setTimeout(function () {
                sendToNotificationModule();
              }, 10);
            }
          } else {
            if (n_user == 0) {
              ev.client.poke(
                config.spSupportUserIgnoreMessage.replace(
                  "&u",
                  ev.client.name()
                )
              );
            } else {
              ev.client.chat(
                config.spSupportUserIgnoreMessage.replace(
                  "&u",
                  ev.client.name()
                )
              );
            }
          }
        }
      }

      function getDateTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
          var month = "0" + month;
        }
        if (day.toString().length == 1) {
          var day = "0" + day;
        }
        if (hour.toString().length == 1) {
          var hour = "0" + hour;
        }
        if (minute.toString().length == 1) {
          var minute = "0" + minute;
        }
        if (second.toString().length == 1) {
          var second = "0" + second;
        }
        var dateTime =
          year +
          "/" +
          month +
          "/" +
          day +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second;
        return dateTime;
      }

      //--------------------------------------------------- { Themen Module } -----------------------------------------------------------

      function sendMessage(client, message, type) {
        if (type == "sp") {
          if (n_sp == 0) {
            client.poke(
              prefixSupport + message.replace("&u", ev.client.name())
            );
          } else {
            client.chat(
              prefixSupport + message.replace("&u", ev.client.name())
            );
          }
        } else {
          if (n_user == 0) {
            client.poke(
              prefixSupport + message.replace("&u", ev.client.name())
            );
          } else {
            client.chat(
              prefixSupport + message.replace("&u", ev.client.name())
            );
          }
        }
      }

      //Themen Module

      if (config.spThemenNotificationActiv) {
        var inSupportChannelThema = false;
        config.spSupportChannels.forEach(function (sp) {
          channel = ev.client.getChannels();
          if (channel[0].id() == sp.spSupportChannel) {
            //User is in Support Channel
            inSupportChannelThema = true;
          }
        });
        if (inSupportChannelThema) {
          config.spThemen.forEach(function (thema) {
            if (ev.text == thema.spThemaId) {
              //
              if (isFlood(ev.client.id(), config.spAntiFloodPointsSupport)) {
              } else {
                if (isIgnore(ev.client.id())) {
                  sendMessage(
                    ev.client,
                    config.spSupportUserIgnoreMessage,
                    "user"
                  );
                } else {
                  //Check Supporter Online?
                  if (
                    !(getSupporter(thema.spThemaSupporterGroups).length > 0)
                  ) {
                    //Supporter is Offline

                    if (
                      config.spDiscordModeSupport == 1 ||
                      config.spDiscordModeSupport == 0
                    ) {
                      sendDiscord(
                        config.spDiscordTextSupport.replace(
                          "&u",
                          ev.client.name()
                        ),
                        0,
                        0
                      );
                    }
                    if (
                      config.spTelegramModeSupport == 1 ||
                      config.spTelegramModeSupport == 0
                    ) {
                      sendTelegram(
                        config.spTelegrammTextSupport.replace(
                          "&u",
                          ev.client.name()
                        )
                      );
                    }

                    sendMessage(
                      ev.client,
                      config.spSupportUserNoMessage,
                      "user"
                    );
                    playQueuTrackOffline(ev.client.getChannels()[0]);
                  } else {
                    //Supporter is Online!

                    getSupporter(thema.spThemaSupporterGroups).forEach(
                      function (onlineSupporterID) {
                        //GetSupporter action
                        setTimeout(function () {
                          sendMessage(
                            backend.getClientByID(onlineSupporterID),
                            config.spThemenMessageSupporter.replace(
                              "&thema",
                              thema.spThemaName
                            ),
                            "sp"
                          );
                        }, 10);
                      }
                    );
                    //Send User Message getSupporter(sp.spSupporterId).length

                    sendMessage(
                      ev.client,
                      config.spThemenMessageUser.replace(
                        "&thema",
                        thema.spThemaName
                      ),
                      "user"
                    );
                    if (config.spTelegramModeSupport == 0) {
                      sendTelegram(
                        config.spTelegrammTextSupport
                          .replace("&u", ev.client.name())
                          .replace("&thema", thema.spThemaName)
                      );
                    }
                    if (config.spDiscordModeSupport == 0) {
                      sendDiscord(
                        config.spDiscordTextSupport
                          .replace("&u", ev.client.name())
                          .replace("&thema", thema.spThemaName),
                        0,
                        0
                      );
                    }
                    //playTTS(sp.spSupportUserMessage.replace("&u", ev.client.name()))
                    playQueuTrack(ev.client.getChannels()[0]);
                  }
                }
              }
              //
            }
          });
        }
      }

      //--------------------------------------------------- {ChannelEdit} -----------------------------------------------------------
      var tz = [
        -11,
        -10,
        -9,
        -8.5,
        -8,
        -7,
        -6,
        -5,
        -4,
        -3.5,
        -3,
        -2.5,
        -2,
        -1,
        0,
        1,
        2,
        3,
        4,
        4.5,
        5,
        5.5,
        6,
        6.5,
        6.75,
        7,
        7.5,
        8,
        9,
        9.5,
        9.75,
        10,
        10.5,
        11,
        11.5,
        12,
        13,
        13.75,
        14,
        15,
      ];

      function time() {
        var nonutc = new Date();
        var utc = nonutc.getTime() + nonutc.getTimezoneOffset() * 60000;
        var now = new Date(utc + 3600000 * tz[config.spTimeZo]);
        var h = now.getHours();
        var m = now.getMinutes();

        if (m < 10) {
          m = "0" + m;
        }

        return (ntime = h + ":" + m);
      }

      //Channel Edit for Channel with prefix

      if (
        ev.text.startsWith(ChannelOpenCommand + " ") == 1 &&
        config.spChannelEditActiv
      ) {
        var parameter = ev.text.replace(ChannelOpenCommand + " ", "");

        if (issupporter(ev.client.id(), parameter)) {
          ev.client.chat(message_channeledit_open);
          openSupportChannel(parameter);
        } else {
          ev.client.chat(
            message_channeledit_no_permission.replace("&channel", parameter)
          );
          engine.log(
            message_channeledit_no_permission.replace("&channel", parameter)
          );
        }
      }

      if (
        ev.text.startsWith(ChannelCloseCommand + " ") == 1 &&
        config.spChannelEditActiv
      ) {
        var parameter = ev.text.replace(ChannelCloseCommand + " ", "");
        if (issupporter(ev.client.id(), parameter)) {
          ev.client.chat(message_channeledit_closed);
          closeSupportChannel(parameter);
        } else {
          ev.client.chat(
            message_channeledit_no_permission.replace("&channel", parameter)
          );
          engine.log(
            message_channeledit_no_permission.replace("&channel", parameter)
          );
        }
      }

      if (
        ev.text == ChannelOpenCommand &&
        typeof config.spSupportChannelSupporterId != "undefined"
      ) {
        var allowChangeAllChannel = false;

        ev.client.getServerGroups().forEach(function (gr1) {
          config.spSupportChannelSupporterId.forEach(function (gr2) {
            if (gr1.id() == gr2) {
              allowChangeAllChannel = true;
            }
          });
        });

        if (allowChangeAllChannel) {
          config.spChannelEdit.forEach(function (channelEdit) {
            openSupportChannel(channelEdit.spSupportChannelPrefix);
          });
          ev.client.chat(message_channeledit_all_open);
        } else {
          ev.client.chat(message_channeledit_no_permission_all);
          engine.log(message_channeledit_no_permission_all);
        }
      }

      if (
        ev.text == ChannelCloseCommand &&
        typeof config.spSupportChannelSupporterId != "undefined"
      ) {
        var allowChangeAllChannel = false;

        ev.client.getServerGroups().forEach(function (gr1) {
          config.spSupportChannelSupporterId.forEach(function (gr2) {
            if (gr1.id() == gr2) {
              allowChangeAllChannel = true;
            }
          });
        });

        if (allowChangeAllChannel) {
          config.spChannelEdit.forEach(function (channelEdit) {
            closeSupportChannel(channelEdit.spSupportChannelPrefix);
          });
          ev.client.chat(message_channeledit_all_closed);
        } else {
          ev.client.chat(message_channeledit_no_permission_all);
          engine.log(message_channeledit_no_permission_all);
        }
      }
    });

    function issupporter(clientId, prefix) {
      var isSupporter = false;
      config.spChannelEdit.forEach(function (channelEdit) {
        backend
          .getClientByID(clientId)
          .getServerGroups()
          .forEach(function (group) {
            channelEdit.spSupportChannelSupporterId.forEach(function (group2) {
              if (channelEdit.spSupportChannelPrefix == prefix) {
                if (group2 == group.id()) {
                  isSupporter = true;
                }
              }
            });
          });
      });
      return isSupporter;
    }

    function issupporterOnline(prefix) {
      var issupporterOnline = false;

      config.spChannelEdit.forEach(function (channelEdit) {
        if (prefix == channelEdit.spSupportChannelPrefix) {
          backend.getClients().forEach(function (clients) {
            if (isAFK(clients.getChannels()[0].id())) {
              clients.getServerGroups().forEach(function (groups) {
                channelEdit.spSupportChannelSupporterId.forEach(function (
                  group2
                ) {
                  if (group2 == groups.id()) {
                    issupporterOnline = true;
                  }
                });
              });
            }
          });
        }
      });
      return issupporterOnline;
    }

    function isDefaultsupporter(clientId) {
      var isSupporter = false;
      if (!config.spSupportChannelSupporterId) {
        return isSupporter;
      }

      config.spSupportChannelSupporterId.forEach(function (group) {
        backend
          .getClientByID(clientId)
          .getServerGroups()
          .forEach(function (group) {
            if (group2 == group.id()) {
              isSupporter = true;
            }
          });
      });
      return isSupporter;
    }

    function generatePassword(length) {
      var result = "";
      var charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++)
        result += charset.charAt(Math.floor(Math.random() * charset.length));
      return result;
    }

    function closeSupportChannel(parameter) {
      config.spChannelEdit.forEach(function (channelEdit) {
        if (channelEdit.spSupportChannelNameOfflineMsg.split("").length > 40) {
          engine.log(
            " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ SUPPORT++ | ERROR ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
          );
          engine.log(
            "[ChannelEdit] Your channel name is to long! Teamspeak has a max size from 40 chars!"
          );
          engine.log("     => Please shortness your channel name. ");
          engine.log(
            " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ SUPPORT++ | ERROR ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
          );
        }

        var channel = backend.getChannelByID(
          channelEdit.spSupportChannelNameChange
        );
        if (channelEdit.spSupportChannelPrefix == parameter) {
          if (
            backend
              .getChannelByID(channelEdit.spSupportChannelNameChange)
              .name() == channelEdit.spSupportChannelNameOfflineMsg
          ) {
            return;
          }

          var dec = "";
          dec = dec + "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ SUPPORT HOURS ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n";
          dec = dec + channelEdit.spSupportChannelOpenHours + "\n";
          dec = dec + "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n";
          dec = dec + channelEdit.spSupportChannelNameOfflineDescription;

          if (
            channelEdit.spSupportChannelOpenHours == "" ||
            channelEdit.spSupportChannelOpenHours == undefined
          ) {
            dec = "";
            dec =
              dec + channelEdit.spSupportChannelNameOfflineDescription ==
              undefined
                ? ""
                : channelEdit.spSupportChannelNameOfflineDescription;
          }

          if (channelEdit.spSupportChannelPasswordActiv == 0) {
            backend
              .getChannelByID(channelEdit.spSupportChannelNameChange)
              .update({
                name:
                  channelEdit.spSupportChannelNameOfflineMsg == ""
                    ? undefined
                    : channelEdit.spSupportChannelNameOfflineMsg,
                password: generatePassword(20),
                description: dec == "" ? undefined : dec,
                maxClients: channelEdit.spSupportChannelMaxClientsOffline,
              });
          } else {
            backend
              .getChannelByID(channelEdit.spSupportChannelNameChange)
              .update({
                name:
                  channelEdit.spSupportChannelNameOfflineMsg == ""
                    ? undefined
                    : channelEdit.spSupportChannelNameOfflineMsg,
                description: dec == "" ? undefined : dec,
                maxClients: channelEdit.spSupportChannelMaxClientsOffline,
              });
          }
        }

        if (channelEdit.spSupportChannelKickActiv == 0) {
          var ch = channel.getClients();
          ch.forEach(function (client) {
            if (!client.isSelf()) {
              client.kickFromChannel(message_channeledit_kickreason);
            }
          });
        }
      });
      pw = "";
    }

    function openSupportChannel(parameter) {
      config.spChannelEdit.forEach(function (channelEdit) {
        if (channelEdit.spSupportChannelNameOnlineMsg.split("").length > 40) {
          engine.log(
            " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ SUPPORT++ | ERROR ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
          );
          engine.log(
            "[ChannelEdit] Your channel name is to long! Teamspeak has a max size from 40 chars!"
          );
          engine.log("     => Please shortness your channel name. ");
          engine.log(
            " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ SUPPORT++ | ERROR ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
          );
        }
        var bool = true;
        if (channelEdit.spSupportChannelPrefix == parameter) {
          if (
            backend
              .getChannelByID(channelEdit.spSupportChannelNameChange)
              .name() == channelEdit.spSupportChannelNameOnlineMsg
          ) {
            return;
          }

          backend
            .getChannelByID(channelEdit.spSupportChannelNameChange)
            .update({
              name:
                channelEdit.spSupportChannelNameOnlineMsg == ""
                  ? undefined
                  : channelEdit.spSupportChannelNameOnlineMsg,
              password: "",
              description:
                channelEdit.spSupportChannelNameOnlinDescription == ""
                  ? undefined
                  : channelEdit.spSupportChannelNameOnlinDescription,
              maxClients: channelEdit.spSupportChannelMaxClientsOnline,
            });
        }
      });
    }

    //--------------------------------------------------- { Automatic SupportChannel Manager} -----------------------------------------------------------
    event.on("clientMove", function (ev) {
      if (!backend.isConnected()) return;
      if (ev.client.isSelf()) return;

      var formChannelId = 0;
      if (ev.fromChannel != null) {
        formChannelId = ev.fromChannel.id();
      }

      if (formChannelId == 0 && config.spMySQLActiv) {
        if (IsUserSupporter(ev.client.id())) {
          if (dbc)
            dbc.exec(
              "INSERT INTO sp_supporter (sp_uid, sp_name) VALUES ('" +
                ev.client.uid() +
                "', '" +
                ev.client.name() +
                "') ON DUPLICATE KEY UPDATE sp_name = '" +
                ev.client.name() +
                "'"
            ); // TODO: ESCAPE!
        }
      }

      if (config.spAutomaticChannelManager) {
        var fromAfk = false;
        var toAFK = false;
        var subAFK = false;

        var afkChannels = config.spAfkChannels;
        for (var i = 0; i < afkChannels.length; i++) {
          if (formChannelId == afkChannels[i].spAfkChannel) {
            fromAfk = true;
          }
          try {
            if (ev.toChannel.id() == afkChannels[i].spAfkChannel) {
              toAFK = true;
            }
          } catch (err) {}
        }

        if (fromAfk && toAFK) {
          return;
        }

        function isAFK(id) {
          var afkChannels = config.spAfkChannels;
          var bool = false;
          if (afkChannels != undefined) {
            for (var i = 0; i < afkChannels.length; i++) {
              if (backend.getChannelByID(id).parent() != undefined) {
                if (
                  afkChannels[i].spAfkChannel ==
                  backend.getChannelByID(id).parent().id()
                ) {
                  //  engine.log("IsSUB!")
                  bool = true;
                }
              }
            }
          }
          if (bool) {
            return true;
          } else {
            return false;
          }
        }
        try {
          config.spAfkChannels.forEach(function (afkCh) {
            if (
              (ev.fromChannel == null &&
                config.spSupportChannelOpenAutomatic &&
                ev.toChannel.isDefault()) ||
              (formChannelId == afkCh.spAfkChannel &&
                config.spSupportChannelOpenAutomatic) ||
              (isAFK(formChannelId) && config.spSupportChannelOpenAutomatic)
            ) {
              engine.log(
                "Open: " + afkCh.spAfkChannel + " | " + ev.toChannel.id()
              );
              config.spChannelEdit.forEach(function (channelEdit) {
                ev.client.getServerGroups().forEach(function (group) {
                  channelEdit.spSupportChannelSupporterId.forEach(function (
                    group2
                  ) {
                    if (group.id() == group2) {
                      engine.log(
                        "Supporter " +
                          ev.client.name() +
                          " joint Server! Check Suppport Channel.."
                      );
                      openSupportChannel(channelEdit.spSupportChannelPrefix);
                    }
                  });
                });
              });
            }
          });
        } catch (err) {
          engine.log("Support++ | ChannelEdit ");
        }

        config.spAfkChannels.forEach(function (afkCh) {
          if (ev.toChannel == null && config.spSupportChannelCloseAutomatic) {
            config.spChannelEdit.forEach(function (channelEdit) {
              ev.client.getServerGroups().forEach(function (group) {
                channelEdit.spSupportChannelSupporterId.forEach(function (
                  group2
                ) {
                  if (group.id() == group2) {
                    engine.log(
                      "Supporter " +
                        ev.client.name() +
                        " leave Server! Check Suppport Channel.."
                    );
                    if (
                      !issupporterOnline(channelEdit.spSupportChannelPrefix)
                    ) {
                      closeSupportChannel(channelEdit.spSupportChannelPrefix);
                    } else {
                    }
                  }
                });
              });
            });
          } else if (
            (ev.toChannel.id() == afkCh.spAfkChannel &&
              config.spSupportChannelCloseAutomatic) ||
            (isAFK(ev.toChannel.id()) && config.spSupportChannelCloseAutomatic)
          ) {
            config.spChannelEdit.forEach(function (channelEdit) {
              ev.client.getServerGroups().forEach(function (group) {
                channelEdit.spSupportChannelSupporterId.forEach(function (
                  group2
                ) {
                  if (group.id() == group2) {
                    engine.log(
                      "Supporter " +
                        ev.client.name() +
                        " got to AFK Channel! Check Suppport Channel.."
                    );
                    if (
                      !issupporterOnline(channelEdit.spSupportChannelPrefix)
                    ) {
                      closeSupportChannel(channelEdit.spSupportChannelPrefix);
                    } else {
                    }
                  }
                });
              });
            });
          }
        });
      }
    });

    //--------------------------------------------------- { Time SupportChannel Manager} -----------------------------------------------------------

    if (config.spTimeChannelManagerActiv) {
      setInterval(function () {
        var timeNow = time();
        config.spTimeChannelManager.forEach(function (timeManager) {
          if (timeNow == timeManager.spTime) {
            if (timeManager.spTimeAction == 0) {
              openSupportChannel(timeManager.spTimePrefix);
              engine.log(
                "Support channel " +
                  timeManager.spTimePrefix +
                  " are open by time."
              );
            } else {
              closeSupportChannel(timeManager.spTimePrefix);
              engine.log(
                "Support channel " +
                  timeManager.spTimePrefix +
                  " are close by time."
              );
            }
          }
        });
      }, 50000);
    }

    //--------------------------------------------------- {ChannelEdit} -----------------------------------------------------------

    //--------------------------------------------------- {Queue play track} -----------------------------------------------------------

    //For this module, I would like to thank TS3Index. I have been inspired by the "welcome sound" script...

    var resumePlayback = false;
    var resumeTrack = false;
    var resumePlaylist = false;
    var resumePos = 0;
    var securejoin = true;
    var spQueueVolumen;
    var oldVolumen;
    var currentTrack;
    var posTrack;
    var queueChannel;
    var queueClient;

    var connectUrl = "https://s3.eu-central-1.amazonaws.com/sppaudio/v1/";
    var playUrl;

    var sounds = [
      "null",
      "Support_Offline_FAQ_Musik.wav",
      "Support_Offline_Lite.wav",
      "Support_Offline_Lite_Dunkle_Stimme.wav",
      "Support_Offline_Lite_Helle_Stimme.wav",
      "Support_Offline_Lite_Langame_Stimme.wav",
      "Support_Offline_Lite_Musik.wav",

      "Support_Online_FAQ.wav",
      "Support_Online_FAQ_Musik.wav",
      "Support_Online_Funny_EricCartman.wav",
      "Support_Online_Funny_EricCartman_Musik.wav",
      "Support_Online_Lite_Mitarbeiter.wav",
      "Support_Online_Lite_Mitarbeiter_Gespräch.wav",
      "Support_Online_Lite_Supporter.wav",
      "Support_Online_Lite_Supporter_Gespräch.wav",
      "Support_Online_Lite_Supporter_Gespräch_Musik.wav",

      "Willkommen_Lite.wav",
      "Willkommen_Regeln_Funny_Musik.wav",
      "Willkommen_Regeln_Happy.wav",
      "Willkommen_Regeln_Happy_Musik.wav",
      "Willkommen_Regeln_Webseite_Musik_1.wav",
      "Willkommen_Regeln_Webseite_Musik_2.wav",

      "Support_Offline_Lite_EN.wav",
      "Support_Offline_Lite_Music_EN.wav",
    ];

    function playQueuTrack(channelId) {
      if (config.spQueueActiv) {
        //  if (!(typeof config.spQueueTrackOnline == 'undefined')) {
        if (typeof config.spQueueVolumen == "undefined") {
          spQueueVolumen = 70;
        } else {
          spQueueVolumen = config.spQueueVolumen;
        }
        setTimeout(function () {
          TrackBotJoin(channelId);
        }, 600);
        engine.log("Queue starting...");
        var currentTrack = media.getCurrentTrack();
        if (audio.isPlaying()) {
          resumePlayback = true;
          resumePos = audio.getTrackPosition();
          resumeTrack = currentTrack;
          resumePlaylist = media.getActivePlaylist()
            ? media.getActivePlaylist().id()
            : false;
          if (config.spQueueOwnActiv) {
            media.playURL(
              config.spQueueTrackOnline.url + "&callback=spQueue&copy=true"
            );
          } else {
            media.playURL(
              connectUrl +
                sounds[config.spSelectMusic] +
                "&callback=spQueue&copy=true"
            );
          }
        } else if (resumePlayback) {
          securejoin = false;

          if (config.spQueueOwnActiv) {
            media.playURL(
              config.spQueueTrackOnline.url + "&callback=spQueue&copy=true"
            );
          } else {
            media.playURL(
              connectUrl +
                sounds[config.spSelectMusic] +
                "&callback=spQueue&copy=true"
            );
          }
        } else {
          if (config.spQueueOwnActiv) {
            media.playURL(config.spQueueTrackOnline.url);
          } else {
            media.playURL(connectUrl + sounds[config.spSelectMusic]);
          }

          //config.spQueueTrackOnline.url
        }
        // } else {
        //   engine.log('No Track select!')
        //}
      }
    }
    function playQueuTrackOffline(channelId) {
      if (config.spQueueActiv) {
        //  if (!(typeof config.spQueueTrackOnline == 'undefined')) {
        if (typeof config.spQueueVolumen == "undefined") {
          spQueueVolumen = 70;
        } else {
          spQueueVolumen = config.spQueueVolumen;
        }
        setTimeout(function () {
          TrackBotJoin(channelId);
        }, 600);
        engine.log("Queue starting...");
        var currentTrack = media.getCurrentTrack();
        if (audio.isPlaying()) {
          resumePlayback = true;
          resumePos = audio.getTrackPosition();
          resumeTrack = currentTrack;
          resumePlaylist = media.getActivePlaylist()
            ? media.getActivePlaylist().id()
            : false;
          if (config.spQueueOwnActiv) {
            media.playURL(
              config.spQueueTrackOffline.url + "&callback=spQueue&copy=true"
            );
          } else {
            media.playURL(
              connectUrl +
                sounds[config.spSelectMusicOffline] +
                "&callback=spQueue&copy=true"
            );
          }
        } else if (resumePlayback) {
          securejoin = false;

          if (config.spQueueOwnActiv) {
            media.playURL(
              config.spQueueTrackOffline.url + "&callback=spQueue&copy=true"
            );
          } else {
            media.playURL(
              connectUrl +
                sounds[config.spSelectMusicOffline] +
                "&callback=spQueue&copy=true"
            );
          }
        } else {
          if (config.spQueueOwnActiv) {
            media.playURL(config.spQueueTrackOffline.url);
          } else {
            media.playURL(connectUrl + sounds[config.spSelectMusicOffline]);
          }

          //config.spQueueTrackOnline.url
        }
        // } else {
        //   engine.log('No Track select!')
        //}
      }
    }

    event.on("trackEnd", function (ev, callback) {
      engine.log("Queue trach finnish");
      if (callback == "spQueue" && resumePlayback) {
        if (securejoin && resumeTrack) {
          engine.log("Resume last track: " + resumeTrack.Title());
          resumePlayback = false;
          TrackBotJoin(queueChannel);
          if (resumeTrack.Type() == "url" && resumeTrack.Filename()) {
            media.playURL(resumeTrack.Filename());
          } else if (resumeTrack.id()) {
            audio.setMute(true);
            if (resumePlaylist)
              media.getPlaylistByID(resumePlaylist).setActive();
            media.playURL("track://" + resumeTrack.id());
            audio.seek(resumePos);
            audio.setMute(false);
          }
        }
        securejoin = true;
      }
    });

    function TrackBotJoin(channelId) {
      if (config.spQueueMove) {
        backend.getClients().forEach(function (client) {
          if (client.isSelf() == true) {
            queueClient = client.id();
            client.getChannels().forEach(function (channel) {
              queueChannel = channel;
              if (channel.id() == channelId.id()) {
                engine.log("[Queue] Is alredy in Channel..");
              } else {
                client.moveTo(channelId);
              }
            });
          }
        });
      }
    }
    //----------------------------------------------------- { Newsletter } ------------------------------------------------------------
    if (config.spNewsletter != "") {
      if (store.get("newsletter-mail") != "") {
        if (store.get("newsletter-mail") != config.spNewsletter) {
          engine.log(
            "[Your e-mail adresse was changed! Pleas accept the new mail adress! :=]"
          );
          addMailToNewsletter(config.spNewsletter);
          store.set("newsletter-mail", config.spNewsletter);
        }
      }
      if (store.get("newsletter-mail") != "") {
        return;
      }
      engine.log("[Thank you for subscribing to our Newsletter! :=]");
      store.set("newsletter-mail", config.spNewsletter);
      addMailToNewsletter(config.spNewsletter);
      engine.log("->>  " + store.get("newsletter-mail"));
    } else {
      if (store.get("newsletter-mail") == "") {
        return;
      }
      engine.log("[Oh, you unsubscribed from our Newsletter! :=]");
      store.set("newsletter-mail", "");
    }

    function addMailToNewsletter(email) {
      http.simpleRequest(
        {
          method: "POST",
          url: "https://newsletter-spp.herokuapp.com/newsletter",
          timeout: 90000,
          headers: {
            email: email,
            "cache-control": "no-cache",
          },
        },
        function (error, response) {
          if (response.statusCode != 200) {
            engine.log(error);
            return;
          }

          var res;
          try {
            res = JSON.parse(response.data);
            engine.log("[DEBUG] Newsletter-Status:: " + res.status);
          } catch (err) {
            engine.log(err);
          }
          if (res === undefined) {
            engine.log("Error in JSON!");
            return;
          }
        }
      );
    }

    //--------------------------------------------------- {Queue play track} -----------------------------------------------------------

    function CreateTicketDb(client, text) {
      if (dbc)
        dbc.exec(
          "INSERT INTO sp_tickets (text, uuid, name, version, status ) VALUE ('" +
            helpers.base64Encode(text) +
            "', '" +
            client.uid() +
            "', '" +
            client.name() +
            "', '" +
            client.getPlatform() +
            "::" +
            client.getVersion() +
            "', '1')"
        ); // TODO: ESCAPE!
      engine.log("Create ticket in the db!");
    }

    function ChangeTicketStatusDb(id, status) {
      if (dbc)
        dbc.exec(
          "UPDATE sp_tickets SET status='" + status + "' WHERE id='" + id + "'"
        ); // TODO: ESCAPE!
      engine.log("Update ticket in the db!");
    }

    //Data
    var date;
    date = new Date();
    date =
      date.getUTCFullYear() +
      "-" +
      ("00" + (date.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getUTCDate()).slice(-2) +
      " " +
      ("00" + date.getUTCHours()).slice(-2) +
      ":" +
      ("00" + date.getUTCMinutes()).slice(-2) +
      ":" +
      ("00" + date.getUTCSeconds()).slice(-2);

    function CloseTicket(id, status) {
      ChangeTicketStatusDb(id, 0);
      if (dbc)
        dbc.exec(
          "UPDATE sp_tickets SET data_close='" +
            date +
            "' WHERE id='" +
            id +
            "'"
        ); // TODO: ESCAPE!
      engine.log("Update ticket in the db!");
    }

    // ****** WEB EVENT ****

    event.on("api:sp_config", function (ev) {
      return { succes: true, data: info };
    });

    event.on("api:sp_tickets_get", function (ev) {
      return { succes: true, data: info };
    });

    event.on("api:sp_tickets_get", function (ev) {
      return { succes: true, data: info };
    });
  }
);
