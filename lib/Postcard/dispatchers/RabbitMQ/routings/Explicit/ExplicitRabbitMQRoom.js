const BaseRabbitMQRoom = require("../BaseRabbitMQRoom");

class ExplicitRabbitMQRoom extends BaseRabbitMQRoom {
  constructor({ channel, queue }) {
    super({ channel, queue });
  }

  static async create({ name, autoDelete, topicName, channel }) {
    try {      
      let options = BaseRabbitMQRoom.validateCreateOptions({ autoDelete });

      let q = await channel.assertQueue(null, options);
      //let q = await channel.assertQueue(name, options);
      channel.bindQueue(q.queue, topicName, name);

      return new ExplicitRabbitMQRoom({ channel, queue: q.queue })
    } catch (error) {
      throw new Error("Explicit RabbitMQ room creation error");
    }
  }
}

module.exports = ExplicitRabbitMQRoom