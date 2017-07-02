let net = require('net');

let cliente = net.connect({ port: 3000, host: 'localhost' });

cliente.on('connect', () => {
    //ao conectar no server com sucesso,
    //o evento 'connect' é disparado
    cliente.write('Hello, Im the cliente ' + process.pid);
});

//Evento data é um dos mais importantes
//ele será acionado para o recebimento de mensagem
cliente.on('data', (message) => {
    console.log(message.toString());
});

//responsável por recuperar informações
//digitadas no console do cliente
//para submeter ao server
process.stdin.on('readable', () => {
    let message = process.stdin.read();
    if (!message) return;
    cliente.write(message.toString().replace(/\n/, ''));
});