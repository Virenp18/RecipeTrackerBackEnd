// This file is the default file which will run by default when NPM is started
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const server_port = 3000;

dotenv.config();

// Import the body parser
const bodyParser = require('body-parser');
// load the middleware for bodyparser
app.use(bodyParser.json());

// adding cors middleware for express
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

// Import the mongoDB database here
const {mongoose} = require('./databse/mongoose');

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

/* LOAD MODELS */

// As we know that if a project is very big then it might have many models so for that we make one file and add all models in it.
const { Recipe , Steps } = require('./databse/models');

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

/* ROUTE HANDLERS */

/**
 * METHOD : N/A
 * PATH : /
 * PURPOSE : This API is used for test purpose
 * REQUEST TYPE : N/A
 * RETURN DATA TYPE : string
 * AUTHOR : Varend Pratap
 */
app.get('/' , (req,res) => {
    res.send(`Hello World!`);
});

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

/* LIST ROUTES */

/**
 * METHOD : POST
 * PATH : /lists
 * PURPOSE : This API will CREATE the new list to the database
 * REQUEST TYPE : JSON
 * RETURN DATA TYPE : JSON
 * AUTHOR : Varend Pratap
*/
app.post('/lists', (req,res) => {
    // first get the title which is entered
    let title = req.body.title;
    let newList = new Recipe({
        title
    });

    newList.save().then((listDoc)=>{Y
        res.send(listDoc);
    });
});

/**
 * METHOD : GET
 * PATH : /lists
 * PURPOSE : This API will READ all the LISTS form the database
 * REQUEST TYPE : N/A
 * RETURN DATA TYPE : array
 * AUTHOR : Varend Pratap
 */
app.get('/lists', (req,res) => {
    Recipe.find({}).then((list)=>{
        res.send(list);
    });
});

/**
 * METHOD : POST
 * PATH : /lists
 * PURPOSE : This API will UPDATE the existing list with help of list id to the database
 * REQUEST TYPE : JSON
 * RETURN DATA TYPE : string
 * AUTHOR : Varend Pratap
 */
app.patch('/lists/:id', (req,res) => {
    Recipe.findOneAndUpdate({ _id : req.params.id},{
        $set : req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

/**
 * METHOD : POST
 * PATH : /lists
 * PURPOSE : This API will DELETE the existing list with help of list id to the database
 * REQUEST TYPE : JSON
 * RETURN DATA TYPE : string
 * AUTHOR : Varend Pratap
 */
app.delete('/lists/:id', (req,res) => {
    Recipe.findByIdAndDelete({
        _id : req.params.id
    }).then((deleteDoc) => {
        if(!deleteDoc){
            res.sendStatus(400);
        }
        res.send(deleteDoc);
    });
});


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */


/* TASKS ROUTES */

/**
 * METHOD : POST
 * PATH : /list/:listId/tasks
 * PURPOSE : This API will CREATE various tasks of a specified list.
 * REQUEST TYPE : JSON
 * RETURN DATA TYPE : JSON
 * AUTHOR : Varend Pratap
 */
app.post('/list/:listId/tasks',(req,res) =>{
    let newTask = new Steps({
        title : req.body.title,
        _listId : req.params.listId
    });
    newTask.save().then((TaskDoc)=>{
        res.send(TaskDoc);
    });
});

/**
 * METHOD : GET
 * PATH : /list/:listId/tasks
 * PURPOSE : This API will READ all the tasks from the specified listId.
 * REQUEST TYPE : N/A
 * RETURN DATA TYPE : JSON
 * AUTHOR : Varend Pratap
 */
app.get('/list/:listId/tasks',(req,res) =>{
    Steps.find({_listId:req.params.listId}).then((listTasks)=>{
        res.send(listTasks);
    });
});

/**
 * METHOD : GET
 * PATH : /list/:listId/tasks/:id
 * PURPOSE : This API will READ specified task from the specified list.
 * REQUEST TYPE : N/A
 * RETURN DATA TYPE : JSON
 * AUTHOR : Varend Pratap
 */
app.get('/list/:listId/tasks/:id',(req,res) => {
    Steps.findOne({
        _listId : req.params.listId,
        _id : req.params.id
    }).then((doc)=>{
        res.send(doc);
    })
});

/**
 * METHOD : PATCH
 * PATH : /list/:listId/tasks/:id
 * PURPOSE : This API will UPDATE the specified task of a specified list.
 * REQUEST TYPE : JSON
 * RETURN DATA TYPE : string
 * AUTHOR : Varend Pratap
 */
app.patch('/list/:listId/tasks/:id', (req,res)=>{
    Steps.findOneAndUpdate({
        _id : req.params.id,
        _listId : req.params.listId
    },{
        $set : req.body
    }).then(()=>{
        res.send({
            message : "Completed"
        })
    });
});

/**
 * METHOD : PATCH
 * PATH : /list/:listId
 * PURPOSE : This API will UPDATE all the task's is_completed value to false
 * REQUEST TYPE : JSON
 * RETURN DATA TYPE : string
 * AUTHOR : Varend Pratap
 */
app.patch('/list/:listId/tasks', (req,res) => {
    Steps.updateMany({ _listId : req.params.listId},{
        $set : req.body
    }).then(() => {
        res.send({
            message : "Marked All to incomplete"
        })
    });
});

/**
 * METHOD : DELETE
 * PATH : /list/:listId/tasks/:id
 * PURPOSE : This API will DELETE the specified task of a specified list.
 * REQUEST TYPE : N/A
 * RETURN DATA TYPE : string
 * AUTHOR : Varend Pratap
 */
app.delete('/list/:listId/tasks/:id', (req,res)=>{
    Steps.findByIdAndDelete({
        _id : req.params.id,
        _listId : req.params.listId
    }).then((deleteDoc)=>{
        res.send(deleteDoc);
    });
});


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

/* SERVER INITIALIZING */

app.listen(server_port , () => {
    console.log(`Server is running on port ${server_port}`);
})