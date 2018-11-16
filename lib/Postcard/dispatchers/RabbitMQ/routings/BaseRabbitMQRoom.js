const IRoom = require("../../IRoom");

class BaseRabbitMQRoom extends IRoom {
  constructor({ channel, queue }) {
    super();

    this.channel = channel;
    this.queue = queue;
  }

  static validateCreateOptions(options) {
    if(options === undefined) {
      options = {};
    }

    if(options.autoDelete === undefined) {
      options.autoDelete = false;
    }

    if(options.durable === undefined) {
      options.durable = false;
    }

    return options;
  }

  subscribe(callback) {
    this.channel.consume(this.queue, async (msg) => {
      await callback(msg);
      this.channel.ack(msg);
    });
  }
}

module.exports = BaseRabbitMQRoom