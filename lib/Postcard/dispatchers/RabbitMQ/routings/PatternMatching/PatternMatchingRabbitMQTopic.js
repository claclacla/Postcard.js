const BaseRabbitMQTopic = require("../BaseRabbitMQTopic");
const PatternMatchingRabbitMQRoom = require("./PatternMatchingRabbitMQRoom");

class PatternMatchingRabbitMQTopic extends BaseRabbitMQTopic {
  constructor({ name, channel }) {
    super();

    this.name = name;
    this.channel = channel;

    // TODO: The following code MUST be rewritten using a promise
    
    this.channel.assertExchange(name, 'topic', {durable: false});
  }

  async createRoom({ name, autoDelete }) {
    let room = await PatternMatchingRabbitMQRoom.create({ 
      name, 
      autoDelete,
      topicName: this.name, 
      channel: this.channel 
    });

    this._addRoom(room);

    return room;
  }

  publish({ room, payload, options }) {
    options = this._validatePublishOptions(options);
    this.channel.publish(this.name, room, new Buffer(payload), options);
  }
}

module.exports = PatternMatchingRabbitMQTopic
