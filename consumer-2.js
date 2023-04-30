async function bootstrapRabbitmq() {
  const amqplib = require("amqplib");
  const connection = await amqplib.connect("amqp://localhost:5671");
  const channelConnection = await connection.createChannel();
  await channelConnection.assertExchange("TASK", "fanout", { durable: true });
  const { queue } = await channelConnection.assertQueue("", {
    exclusive: true,
  });
  await channelConnection.bindQueue(queue, "TASK", "");
  channelConnection.consume(queue, function (msg) {
    console.log("consumer 2: ", msg.content.toString());
  });
}

bootstrapRabbitmq();
