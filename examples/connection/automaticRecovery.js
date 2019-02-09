const config = require("../config");

const printExecutionTime = require("../../lib/printExecutionTime");

const RabbitMQDispatcher = require("../../lib/Postcard/dispatchers/RabbitMQ/RabbitMQDispatcher");
const Postcard = require("../../lib/Postcard/Postcard");
const Routing = require("../../lib/Postcard/Routing");

(async () => {

  // RabbitMQ

  const rabbitMQDispatcher = new RabbitMQDispatcher({
    host: "amqp://" + config.rabbitmq.address
  });
  const postcard = new Postcard({
    dispatcher: rabbitMQDispatcher,
    automaticRecovery: true
  });

  try {
    await postcard.connect();
  } catch (error) {
    return;
  }

  printExecutionTime();
})();