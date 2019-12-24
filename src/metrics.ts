import {LevelDB} from "./leveldb"
import WriteStream from  "level-ws"
import { isBuffer, callbackify } from "util"

export class Metric {
	public user :string
	public tag: string
	public value: number

	constructor(us: string, ts: string, v: number) {
		this.user = us 
		this.tag = ts
		this.value = v
	}
}

export class MetricsHandler {
	public db: any 
	constructor(dbPath: string) {
		this.db = LevelDB.open(dbPath)
	}
	
	////GET ONE
	public getOne(usr, tag,callback: (error: Error | null, result?: Metric[]) => void) {
		var result = new Array();
		const rs = this.db.createReadStream()
			.on('data', function (data) {
			result.push(data)
			})
			.on('error', function (err) {
			console.log('Oh my!', err)
			})
			.on('close', function () {
			console.log('Stream closed')
			})
			.on('end', function () {
				var resultBis;
				for(var i=0; i<result.length; i++){
					var temp= new Array()
					temp=result[i].key.split(":")
					if (temp[0]==usr){
						if (temp[1]==tag){
							resultBis=result[i]
						}
					}	
				}
				callback(null, resultBis);
				console.log('Stream ended')
			})
	}

	////GET ALL
	public getTodos(callback: (error: Error | null, result?: Metric[]) => void) {
		var result = new Array();
		console.log("lelele")
		const rs = this.db.createReadStream()
			.on('data', function (data) {
				result.push(data)
			})
			.on('error', function (err) {
				console.log('Oh my!', err)
			})
			.on('close', function () {
				console.log('Stream closed')
			})
			.on('end', function () {
				console.log('Stream ended')
				callback(null, result);

			})
	}
	
	////GET ALL BY user 
	public getAll(usr : string,callback: (error: Error | null, result?: Metric[]) => void) {
		var result = new Array();
		const rs = this.db.createReadStream()
			.on('data', function (data) {
				result.push(data)
			})
			.on('error', function (err) {
				console.log('Oh my!', err)
			})
			.on('close', function () {
				console.log('Stream closed')
			})
			.on('end', function () {
				var tac= new Array()
				for(var i=0; i<result.length; i++){
					var temp= new Array()
					temp=result[i].key.split(":")
					if (temp[0]==usr){
						console.log(result[i])
						tac.unshift(result[i])
					}	
				}
				console.log('Stream ended')
				callback(null, tac);
			})
	}

	///save (POST)
	public save(metrics: Metric[], callback: (error: Error | null) => void) {
		const stream = WriteStream(this.db)
		stream.on('error', callback)
		stream.on('close', callback)
		metrics.forEach((m: Metric) => {
			stream.write({ key: `${m.user}:${m.tag}`, value: m.value })
		})
		stream.end()
	}

	////Delete
	public delOne(usr: string, tag: string, callback : (error : Error |null) => void) {
		var dmn: string
		dmn=usr+":"+tag
		this.db
		.del(dmn, (err: Error) => {
			if(err){
				console.log('Error finding')
				callback(err)
				return
			}
			console.log('Element deleted')
			callback(err)
		})
	}



}
