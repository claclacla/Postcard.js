class Postcard {
  constructor(dispatcher) {
    this.connectionRetries = 10;
    this.connectionInterval = 2000;

    this.dispatcher = dispatcher;
  }

  async connect() {
    try {
      await this.dispatcher.connect({
        connectionInterval: this.connectionInterval,
        connectionRetries: this.connectionRetries
      })
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