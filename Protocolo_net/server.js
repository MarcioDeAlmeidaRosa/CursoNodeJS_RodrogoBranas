//TCP -> Transmission Control Protocol é 
//uma protocolo de camada de transporte, 
//orientada a conxão, bidirecional e 
//responsável por controlar o processo de 
//transmissão de dados.

//Trata problemas como a perda, duplicação e ainda 
//garante a ordenação dos pacotes.


//Pacote fundamental de comunicação.

let net = require('net');

//variável responsável por armazenar 
//todos os clientes conectados
let connections = [];

let broadcast = function(message, origin) {
    connections.forEach(connection => {
        if (connection === origin) return;
        connection.write(message);
    });
};

net.createServer(function(connection) {
    //Adicionando o novo cliente conectado 
    //na coleção de cliente
    connections.push(connection);

    //esta função receberá o listener das conexão no servidor
    //para cada cliente que se conectar,
    //é executado a função --> function(connection) {}
    connection.write('Hello, I am the server.' + process.pid);

    connection.on('data', message => {
        //tratamento simples para pegar o nome do usuário
        let command = message.toString();

        if (command.indexOf('/nickname') === 0) {
            let nickname = command.replace('/nickname ', '');
            connection.nickname = nickname;
            return;
        }

        //metodo será disparada para receber
        //mensagens que os clientes conectados 
        //enviarem
        let msg = connection.nickname + " > " + command;
        console.log('msg ' + msg);
        broadcast(msg, connection);
    });


}).listen(3000);