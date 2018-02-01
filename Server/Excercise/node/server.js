var express = require('express');
var bodyParser = require('body-parser');

var items = [{
    name: 'a',
    price: '2000',
}, {
    name: 'b',
    price: '5000'
}, {
    name: 'c',
    price: '5000'
}];

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/data.html', function (request, response) {
    var output = '';
    output += '<!DOCTYPE html>';
    output += '<html>';
    output += '<head>';
    output += '<title>Data HTML</title>';
    output += '</head>';
    output += '<body>';
    items.forEach(function (item) {
        output += '<div>'
        output += '<h1>' + item.name + '</h1>';
        output += '<h2>' + item.price + '</h2>';
        output += '</div>';
    });
    output += '</body>';
    output += '</html>';
    response.send(output);
});

app.all('/data.json', function (request, response) {
    response.send(items);
});

app.all('/data.xml', function (request, response) {
    var output = '';
    output += '<?xml version="1.0" encoding="UTF-8" ?>';
    output += '<products>';
    items.forEach(function (item) {

        output += '<product>';
        output += '<name>' + item.name + '</name>';
        output += '<price>' + item.price + '</price>';
        output += '</price>';
    });
    output += '</prodeucts>';
    response.type('text/xml');
    response.send(output);
});

app.all('/parameter', function (request, response) {
    var name = request.param('name');
    var region = request.param('region');

    response.send('<h1>' + name + ':' + region + '</h1>');
});

app.all('/parameter/:id', function (request, response) {
    var id = request.params.id;

    response.send('<h1>' + id + '</h1>')
});

app.get('/products', function (request, response) {
    response.send(items);
});

app.get('/products/:id', function (request, response) {
    var id = Number(request.params.id);

    if (isNaN(id)) {
        response.send({
            error: 'Input Number!'
        });
    } else if (items[id]) {
        response.send(items[id]);
    } else {
        response.send({
            error: 'Invalid data!'
        });
    }
});

app.post('/products', function (request, response) {

    var name = request.body.name;
    var price = request.body.price;

    var item = {
        name: name,
        price: price
    };

    items.push(item);

    response.send({
        message: 'Data added',
        data: item
    });
});

app.put('/products/:id', function (request, response) {
    var id = Number(request.params.id);
    var name = request.body.name;
    var price = request.body.price;

    if (items[id]) {
        if (name) { items[id].name = name };
        if (price) { items[id].price = price };

        response.send({
            message: 'Data modified.',
            data: items[id]
        });
    } else {
        response.send({
            error: 'Invalid data!'
        });
    }
});

app.delete('/products/:id', function (request, response) {

    var id = Number(request.params.id);

    if (isNaN(id)) {
        response.send({
            error: 'INPUT NUMBER!'
        });
    } else if (items[id]) {
        items.splice(id, 1);
        response.send({
            message: 'Data deleted'
        });
    } else {
        response.send({
            error: 'Invalid Data!'
        });
    }
})

app.listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});
