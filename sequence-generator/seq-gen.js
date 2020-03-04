function getNextSequence(entity,successCallBack)
{
const fs = require('fs');
var jsonData = {};
fs.readFile('./seq.json','utf8',function(err,data)
	{
		if(data)
		jsonData = JSON.parse(data);
		console.log(data);
	if(entity in jsonData)
	{
		jsonData[entity] += 1;
	}
	else
	{
		jsonData[entity]=0;
	}
	fs.writeFile('./seq.json',JSON.stringify(jsonData),function(err)
		{
			if(err)
				console.log(err);
			else
			successCallBack(jsonData[entity]);
		});
	});
}
exports.getNextSequence =  getNextSequence;