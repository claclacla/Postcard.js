# Postcard (Js version) 

## An abstraction layer over message brokers 

This library, created for both languages `Javascript`(https://www.npmjs.com/package/postcard-js) and `Ruby`(https://rubygems.org/gems/postcard_rb), is an abstraction layer over `RabbitMQ`. 
It allows the communication among the microservices, providing functionality for publishing and subscribing events.

The microservices interact through topics created with one of three routing types: `Wide`, `Explicit` and `PatternMatching`. 

Each topic may have multiple rooms and, according to the routing type, microservices exchange messages on a different way.

#### Wide topic

##### (Under construction!)

#### Explicit topic

For this kind of topic a message is published on an specific room using its exact name.
 
```javascript
// Send a message

let topic = postcard.createTopic({ name: "topic1", routing: Routing.Explicit });

topic.publish({
  room: "room1", 
  payload: "Message for topic1/room1"
});

// Receive a message

let topic = postcard.createTopic({ name: "topic1", routing: Routing.Explicit });

try {
  let room = await topic.createRoom({ name: "room1", autoDelete: true });

  room.subscribe(async (msg) => {
    console.log("[x] Received " + msg.content);
  });
} catch (error) {
  return;
}

```

#### Pattern matching topic

Using a pattern matching routing, a microservice subscribe to a room based on matching between a message routing key and the pattern that was used to create that room.

```javascript
// Send a message

let topic = postcard.createTopic({ name: "topic1", routing: Routing.Explicit });

topic.publish({
  room: "room1", 
  payload: "Message for topic1/room1"
});

// Receive a message

let topic = postcard.createTopic({ name: "topic1", routing: Routing.Explicit });

try {
  let room = await topic.createRoom({ name: "room1", autoDelete: true });

room.subscribe(async (msg) => {
    console.log("[x] Received " + msg.content);
  });
} catch (error) {
  return;
}

```

--------------------------------------------------------------------------------

### Prerequisites

What things you need to install the software

```
docker 17+
docker-compose 1.19.0+

```

--------------------------------------------------------------------------------

### Development

```bash
# Change the directory to the docker development 
cd docker/dev

# Create a .env file with your local application folder
echo "APP_FOLDER=/path-to-your-local/app" > .env 

# Run the services using docker compose
sudo docker-compose up -d

# Try the examples opening new bash(es) with the following command:
# sudo docker exec -it Postcard bash

# The examples folder path into the running container is:
# /usr/src/app/examples

```

--------------------------------------------------------------------------------

### Publish to NPM

```
# Go to the docker dev folder
cd docker/dev

# Compose the docker containers
sudo docker-compose up -d

# Modify the npm package version on build/src/package.json

# Connect to the Postcard container
sudo docker exec -it Postcard bash

# Move to the application folder
cd /usr/src/app

# Build the new npm
npm run build

# Login to the npm repository
npm login

# Move to the dist folder
cd /usr/src/app/build/dist

# Publish the new version to the npm repository
npm publish

```

--------------------------------------------------------------------------------

## Authors

- **Simone Adelchino** - [_claclacla_](https://twitter.com/_claclacla_)

--------------------------------------------------------------------------------

## License

This project is licensed under the MIT License

--------------------------------------------------------------------------------

## Acknowledgments

- [RabbitMQ](https://www.rabbitmq.com)