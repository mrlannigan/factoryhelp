'use strict';

var Hapi = require('hapi'),
    natural = require('natural');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: {
            path: './public',
            listing: false,
            index: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/selection',
    handler: function (request, reply) {
        var distance = natural.LevenshteinDistance('Norfolk', request.query.input)

        reply({
            text: request.query.input + ' - distance: ' + distance,
            id: request.id
        });
    }
})

server.start(function () {
    console.log('Server running at:', server.info.uri);
});


