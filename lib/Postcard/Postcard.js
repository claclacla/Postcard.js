class Postcard {
  constructor({ dispatcher, automaticRecovery }) {
    if(dispatcher === undefined) {
      throw new Error("dispatcher is a required parameter");
    }

    this.dispatcher = dispatcher;

    if(automaticRecovery !== undefined) {
      this.dispatcher.automaticRecovery = automaticRecovery;
    }
  }

  async connect() {
    try {
      await this.dispatcher.connect()
    } catch (error) {

      // TODO: Create an application error

      throw new Error("Postcard connection refused");
    }
  }

  createTopic({ name, routing }) {
    let topic = this.dispatcher.createTopic({ name, routing });

    return topic;
  }
}

module.exports = Postcard