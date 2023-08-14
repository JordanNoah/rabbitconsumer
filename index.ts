import rabbitmq from 'amqplib';

try {
    const queueName = Bun.env.RABBIT_QUEUE ?? '';
    const connection = await rabbitmq.connect({
        protocol: Bun.env.RABBIT_PROTOCOL,
        hostname: Bun.env.RABBIT_HOST,
        port: 5555,
        username: Bun.env.RABBIT_USERNAME,
        password: Bun.env.RABBIT_PASSWORD,
        vhost: Bun.env.RABBIT_VHOST
    })

    connection.on('error', (err) => {
        console.log("Error: ",err);
    });

    const channel = await connection.createConfirmChannel();

    channel.on('error', (err) => {
        console.log("Channel error: ",err);
    })

    await channel.assertQueue(queueName, { exclusive:false });
    await channel.assertExchange(Bun.env.RABBIT_EXCHANGE ?? '',Bun.env.RABBIT_TYPE_EXCHANGE ?? '',{ durable:true });
    await channel.bindQueue(queueName,Bun.env.RABBIT_EXCHANGE ?? '',Bun.env.RABBIT_ROUTING_KEY ?? '');

    channel.consume(queueName, async(message) => {
        console.error("message", message?.content.toString());
        
    })

    console.log(`Esperando mensajes en la cola ${queueName}. Para salir, presiona Ctrl+C`);
    
} catch (error) {
    console.error(error)
}