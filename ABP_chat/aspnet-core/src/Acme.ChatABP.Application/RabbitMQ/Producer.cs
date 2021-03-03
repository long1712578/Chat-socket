using Newtonsoft.Json;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Acme.ChatABP.RabbitMQ
{
    public class Producer
    {
        public void PushMessageToRabbitMQ()
        {
            var factory = new ConnectionFactory()
            {
                Uri = new Uri("amqps://jqltktwa:***@gerbil.rmq.cloudamqp.com/jqltktwa")
            };
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "demo-queue",
                                         durable: false,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);

                    var message = new { nameof = "product", message = "Hello!" };
                    var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

                    channel.BasicPublish("", "demo-queue", null, body);
                }
            }
        }
    }
}
