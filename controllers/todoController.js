var data = [{ item: 'Get Milk' }, { item: 'Walk Dog' }, { item: 'Code!' }]
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser ,function(req, res) {
        // collecting the newly added item using middleware and adding it to data array
        // console.log(req.body);
        data.push(req.body);

        // sending the data to the front-end(ajax)
        res.json(data);
    });


    app.delete('/todo/:item', function (req, res) {
        data = data.filter(function(todo){
            // this function will run on every element of the data array - element = todo
            return todo.item.replace(/ /g, '-') !== req.params.item;
            // if the item value is equal to the item sent in the url, it will return false and it will be deleted form the data array

        });
        res.json(data);
    });
};