const amqp = require("amqplib/callback_api");
const sleep = require("../../lib/sleep");

const IDispatcher = require("../IDispatcher");
const Routing = require("../../Routing");
const ExplicitRabbitMQTopic = require("./routings/Explicit/ExplicitRabbitMQTopic");
const PatternMatchingRabbitMQTopic = require("./routings/PatternMatching/PatternMatchingRabbitMQTopic");

class RabbitMQDispatcher extends IDispatcher {
  constructor({ host }) {
    super({ host });

    this.RECONNECTION_INTERVAL = 1000; // ms

    this.connection = null;
    this.channel = null;
  }

  _openConnection() {
    return new Promise((resolve, reject) => {
      amqp.connect(this.host, (err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.on("close", async () => {
          if(this.automaticRecovery) {
            await this.connect();
          }
        });

        resolve(connection);
      });
    });
  }

  _createChannel() {
    return new Promise((resolve, reject) => {
      this.connection.createChannel((err, channel) => {
        if (err) {
          return reject(err);
        }

        channel.prefetch(1);

        resolve(channel);
      });
    });
  }

  // TODO: Return two different errors for connection and channel

  async connect() {
    try {
      this.connection = await this._openConnection();
      this.channel = await this._createChannel();

      return;
    } catch (error) {
      await sleep(this.RECONNECTION_INTERVAL);

      if(this.automaticRecovery) {
        await this.connect();
      }
      else {
        
        // TODO: Create an application error

        throw new Error("Dispatcher connection refused");
      }
    }
  }

  createTopic({ name, routing }) {
    let topic = null;

    // TODO: Add the other two cases

    switch (routing) {
      case Routing.Explicit:
        topic = new ExplicitRabbitMQTopic({ name, channel: this.channel });
        break;
      case Routing.PatternMatching:
        topic = new PatternMatchingRabbitMQTopic({ name, channel: this.channel });
        break;
    }

    this.topics.push(topic);

    return topic;
  }
}

module.exports = RabbitMQDispatcher
