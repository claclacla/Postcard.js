const config = require("../../config");

const printExecutionTime = require("../../../lib/printExecutionTime");

const RabbitMQDispatcher = require("../../../lib/Postcard/dispatchers/RabbitMQ/RabbitMQDispatcher");
const Postcard = require("../../../lib/Postcard/Postcard");
const Routing = require("../../../lib/Postcard/Routing");

const sleep = require("../../../lib/Postcard/lib/sleep");

(async () => {

  // RabbitMQ

  const rabbitMQDispatcher = new RabbitMQDispatcher({
    host: "amqp://" + config.rabbitmq.address
  });
  const postcard = new Postcard(rabbitMQDispatcher);

  try {
    await postcard.connect();
  } catch (error) {
    return;
  }

  printExecutionTime();

  let topic = postcard.createTopic({ name: "topic1", routing: Routing.Explicit });

  try {
    let room = await topic.createRoom({ name: "room1", autoDelete: true });

    room.subscribe(async (msg) => {
      //let payload = JSON.parse(msg.content);
      console.log("[x] Received " + msg.content);
      console.log("I'll sleep for 5 s");

      await sleep(5000);

      console.log("Awaken!");
    });
  } catch (error) {
    return;
  }
})();