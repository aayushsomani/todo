var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const fs = require('fs');
const seq = require('./sequence-generator/seq-gen');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + '/public')));

app.get("/",function(req,res)
{
	res.sendFile(path.join(__dirname + "/public/todos.html"));
});

app.post("/api/addtodo",function(req,res)
{
	console.log(req.body);
	if(typeof(req.body.done)!=undefined && req.body.taskTitle.length !=0)
	{
		let jsonData = require('./db/data.json');
		seq.getNextSequence('task',function(id)
			{
			jsonData.task[id] = {
			'done': req.body.done === "true",
			'taskTitle': req.body.taskTitle
		};
		fs.writeFileSync('./db/data.json',JSON.stringify(jsonData));
		res.send(id.toString());
			});
	}
	else
	{
		res.send("failed");
	}
});

app.get("/api/init",function(req,res)
{
	let jsonData = require('./db/data.json');
	res.send(JSON.stringify(jsonData));
});

app.post("/api/changestatus",function(req,res)
{
	let id = req.body.id;
	console.log(id);
	let jsonData = require('./db/data.json');
	jsonData.task[id].done = !jsonData.task[id].done;
	fs.writeFileSync('./db/data.json',JSON.stringify(jsonData));
	res.send("success");
});

app.post("/api/deletetodo",function(req,res)
{
	let id = req.body.id;
	console.log(id);
	let jsonData = require('./db/data.json');
	delete jsonData.task[id];
	fs.writeFileSync('./db/data.json',JSON.stringify(jsonData));
	res.send("success");
});

app.post("/api/edittodo",function(req,res)
{
	let id = req.body.id;
	let taskTitle = req.body.taskTitle;
	console.log(taskTitle);
	let jsonData = require('./db/data.json');
	jsonData.task[id].taskTitle = taskTitle;
	jsonData.task[id].done = false;
	fs.writeFileSync('./db/data.json',JSON.stringify(jsonData));
	res.send(id.toString());
});

app.listen(3000,function()
{
	console.log("server started listening on port 3000");
});