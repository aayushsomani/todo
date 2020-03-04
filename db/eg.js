const fs = require('fs');

let jsonObj = {
	"task": [
		{
			"done": true,
			"taskTitle": "Complete Newton School Assig"
		},
		{
			"done": true,
			"taskTitle": "Check Flight Bookings"
		}
	]
};

let data = JSON.stringify(jsonObj);
fs.writeFileSync('data.json', data);