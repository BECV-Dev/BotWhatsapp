const express = require('express');
const venom = require('venom-bot');

const app = express();
app.use(express.json());
const port = 3000;

const start = (client) => {
    // Manejar la recepción de mensajes
    client.onMessage(async (message) => {
        const receivedMsg = message.body.toLowerCase();
        const messageSplit = receivedMsg.split(" ");
        const number = messageSplit[0];
        const initNumeral = messageSplit[1];
        const regex = /^#/;

        if (message.isGroupMsg && message.body.includes(number)) {
        // if (message.body.includes(number)) {
            if(regex.test(initNumeral)){
                if(receivedMsg.includes('#ayuda')){
                    await client.sendText(message.from, 'Lista de comandos: \n#sysmon \n#mes \n#helpMax');
                }
                else if(receivedMsg.includes('#sysmon')){
                    await client.sendText(message.from, 'Status del SYSMON:\nTODO EN ROJO 😩');
                }
                else if(receivedMsg.includes('#mes')){
                    await client.sendText(message.from, 'Uy no amig@ todos andan tirando barra');
                }
                else if(receivedMsg.includes('#helpmax')){
                    await client.sendText(message.from, 'El patron ya se fue')
                }
                //}
            }
        }
    });

    // Manejar el envío de mensajes a través del endpoint `/send-message`
    app.post("/send-message", async (req, res) => {
        const { to, message } = req.body;
        try {
            // Enviar el mensaje recibido al destinatario
            await client.sendText(to + "@c.us", message);
            res.json("Mensaje enviado");
        } catch (error) {
            res.status(500).json({ error: "Error al enviar mensaje" });
        }
    });
};

// Crear la instancia de `venom` y pasar el cliente a `start`
venom.create({
        session: 'apizap'
    })
    .then((client) => start(client))
    .catch((error) => {
        console.log(error);
    });

app.listen(port, () => {
    console.log('Server running on port ' + port);
});