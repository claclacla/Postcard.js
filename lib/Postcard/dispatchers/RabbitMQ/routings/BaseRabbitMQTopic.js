const ITopic = require("../../ITopic");

class BaseRabbitMQTopic extends ITopic {
  constructor() {
    super();
  }

  _addRoom(room) {
    this.rooms.push(room);
  }

  createRoom() {

  }

  _validatePublishOptions(options) {
    if(options === undefined) {
      options = {};
    }

    if(options.persistent === undefined) {
      options.persistent = false;
    }

    return options;
  }

  publish() {

  }
}

module.exports = BaseRabbitMQTopic