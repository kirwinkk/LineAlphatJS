const LineConnect = require('./connect');
let LINE = require('./main.js');

const auth = {
	authToken: 'EnbI9nRF3Z0vJf4Ba2i3.2XannlnZppIccyjdoNFtaW.EFbhxdhEm2HdwZy5RtIMG032venSPPs0XKmVzG0r5DE=',
	certificate: 'cert here',
}
let client =  new LineConnect(auth);
// let client =  new LineConnect();

client.startx().then(async (res) => {
	
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});
