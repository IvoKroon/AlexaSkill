/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

"use strict";
const Alexa = require("alexa-sdk");
// const db = require("./friebaseInit");
const { getLastAddedRecord, addInvoice } = require("./requests");

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = "Space Facts";
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE =
  "You can say tell me a space fact, or, you can say exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = ["UPDATE TEST"];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
  LaunchRequest: function() {
    getLastAddedRecord().then(data => {
      console.log(data);
      const message = `Title is = ${data.title}`;
      this.response.cardRenderer(SKILL_NAME, message);
      this.response.speak(message);
      this.emit(":responseReady");
    });
    // this.emit("GetNewFactIntent");
  },
  SayHey: function() {
    const message = "Just say hey";
    this.response.speak(message).listen("reprompt");
    this.emit(":responseReady");
  },
  CreateInvoice: function() {
    console.log("test");
    const nameSlot = this.event.request.intent.slots.name.value;
    addInvoice(nameSlot).then(() => {
      const message = "Okay we added the invoice called " + nameSlot;
      this.response.speak(message);
      this.emit(":responseReady");
    });
  },
  GetNewFactIntent: function() {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    this.response.cardRenderer(SKILL_NAME, randomFact);
    // this.response.speak(speechOutput).reprompt("Next question");
    this.response.speak("welkom" + " " + "prompt").listen("reprompt");
    this.emit(":responseReady");
  },
  Unhandled: function() {
    this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
  },
  "AMAZON.YesIntent": function() {
    console.log("HANDLE");
    // raise the `SomethingIntent` event, to pass control to the "SomethingIntent" handler below
    const message = "Yes answer";
    // this.response.cardRenderer(SKILL_NAME, message);
    this.response.speak(message);
    this.emit(":responseReady");
  },
  "AMAZON.NoIntent": function() {
    // handle the case when user says No
    this.emit(":responseReady");
  },
  "AMAZON.HelpIntent": function() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(":responseReady");
  },
  "AMAZON.CancelIntent": function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(":responseReady");
  },
  "AMAZON.StopIntent": function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(":responseReady");
  }
};

exports.handler = function(event, context, callback) {
  console.log("HANDELE");
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = "amzn1.ask.skill.359cc750-0673-4103-bb1f-824844c93667";
  alexa.registerHandlers(handlers);
  alexa.execute();
};
