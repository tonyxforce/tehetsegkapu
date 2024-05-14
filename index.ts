/*
var { readFileSync } = require("fs")
var a = readFileSync("a.txt").toString().split("\r\n")
console.log(a)

const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
var path = require("path")

a.forEach(b => {

		const file = fs.createWriteStream(path.join(__dirname, (new URL(b)).pathname));
		const request = http.get(b, function (response) {
				response.pipe(file);

				// after download completed close filestream
				file.on("finish", () => {
						file.close();
						console.log("Download Completed");
				});
		});
})
*/
import fs, { writeFileSync } from "fs";
import express from "express"
var app = express();

import { HarEntry, HarFile, HarRequest, HarResponse } from "./types"
import path from "path";
/* 
var file = require("./www.tehetsegkapu.hu2.json") as HarFile;
var out:Array<{request: HarRequest, response: HarResponse}> = []

file.log.entries.forEach((e:HarEntry, i:number)=>{
		var res: HarResponse = e.response
		if(["image/png", "image/x-icon", "image/jpeg", "font/woff2"].includes(res.content.mimeType)) return;
		if(!res.content.text) return;
		out.push({request: e.request, response: e.response})
})

console.log(out);
writeFileSync("out.json", JSON.stringify(out, null, 4)) */

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/info/options", (req, res) => {
	res.send({
		"kirLoginEnabled": true,
		"kirPassRedirectUrl": "https://kirpass.kir.hu/token?redirect=TEHETSKAPU",
		"felhasznaloiUtmutatoUrl": "https://www.oktatas.hu/pub_bin/dload/kozoktatas/tehetsegkapu/tehetsegkapu_utmutato_minden_felhasznalo.pdf",
		"analyticsKey": "G-DN5CJHPH1J",
		"secondarySite": false,
		"meresInditasRedirectUrl": null,
		"kulsoMeresInditasRedirectUrl": "https://kerdoiv.tehetsegkapu.hu/hatterkerdoiv/inditas"
	});
})

app.post("/api/v3/kitoltesek/inditas", (req, res) => {
	res.sendFile(path.join(__dirname, "api", "v3", "kitoltesek", "inditas.json"))
})

app.get("/api/hirek/:id/kep", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "api", "hirek", req.params.id, "kep.jpg"))
})

app.get(/^\/api\/(mentorok\/|hirek\/|programok\/|versenyek\/landingversenyek)$/, (req, res) => {
	console.log (path.join(__dirname, "." + req.path.replace(/\/$/, "") + ".json"))
	res.sendFile(path.join(__dirname, "." + req.path.replace(/\/$/, "") + ".json"))
})

app.use((req, res) => {
	res.status(404).send("404" + req.url)
})


app.listen(3000, () => {
	console.log("listening on port 3000");
});