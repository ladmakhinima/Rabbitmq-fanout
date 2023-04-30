async function bootstrapRabbitmq() {
  const amqplib = require("amqplib");
  const connection = await amqplib.connect("amqp://localhost:5671");
  const channelConnection = await connection.createChannel();
  await channelConnection.assertExchange("TASK", "fanout", { durable: true });
  channelConnection.publish("TASK", "", Buffer.from("Hello World"));
}

bootstrapRabbitmq();
