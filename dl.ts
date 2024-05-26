var fs = require("fs");
var axios = require("axios")
var inp = fs.readFileSync("b.txt").toString() as string;

inp.split("\r\n").forEach(async(e,i)=>{
	console.log(`https://tehetsegkapu.hu${e}`)
	var res = await axios.get(`https://tehetsegkapu.hu${e}`);
	fs.writeFileSync("./public" + (e.split("?")[0] || e) + ".jpg", res.data);
	console.log(`written ${e.split("?")[0] || e}!`)
});