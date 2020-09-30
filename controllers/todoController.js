var data = [{ item: 'Get Milk' }, { item: 'Walk Dog' }, { item: 'Code!' }]
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// Database Section
var mongoose = require('mongoose');

// connecting to the database
mongoose.connect('mongodb+srv://root:rootuser@cluster0.5idkd.gcp.mongodb.net/TodoApp?retryWrites=true&w=majority');

// Create a schema for the data
var todoSchema = new mongoose.Schema({
    item: String
});

// creating a model
var Todo = mongoose.model('Todo', todoSchema);

// creating an item from the model example
// var item1 = Todo({ item: 'Buy Eggs' }).save(function (err) {
//     if (err) throw err;
//     console.log('item saved');
// });




module.exports = function (app) {

    app.get('/todo', function (req, res) {
        // get data from mongodb and pass it to view

        // using {} as the first param , it runs on all the items in the array received
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', { todos: data });
        })
        // without db
        // res.render('todo', { todos: data });
    });

    app.post('/todo', urlencodedParser, function (req, res) {

        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
        


        // without  db
        // // collecting the newly added item using middleware and adding it to data array
        // // console.log(req.body);
        // data.push(req.body);

        // // sending the data to the front-end(ajax)
        // res.json(data);
    });


    app.delete('/todo/:item', function (req, res) {
        // with db
        Todo.find({item:req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });


        // without db
        // data = data.filter(function (todo) {
        //     // this function will run on every element of the data array - element = todo
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        //     // if the item value is equal to the item sent in the url, it will return false and it will be deleted form the data array

        // });
        // res.json(data);
    });
};