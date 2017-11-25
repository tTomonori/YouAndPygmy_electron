class Database{
	//セーブデータを読み込む
	static loadSaveData(aCallBack){
		this.NeDB=require(__dirname+"/node_modules/nedb");
		let fileName=__dirname+"/savedata/savedata.db";
		this.db=new this.NeDB({
			filename:fileName,
			autoload:true
		})
		this.data=["Acconpanying","PygmyInn","Item","Money","Book","Position","Flag"];
		let tLoadData=((i)=>{
			if(i<this.data.length){
				let tProperty=this.data[i];
				this["get"+tProperty]=()=>{return this[tProperty]}//データ取得メソッド
				this["set"+tProperty]=(aData)=>{this[tProperty]=aData}//データ反映
				this.loadData(tProperty,()=>{
					tLoadData(i+1);
				})
			}
			else{
				aCallBack();
			}
		})
		tLoadData(0);
	}
	static loadData(aProperty,aCallBack){
		this.db.find({data:aProperty},(err,doc)=>{
			if(doc.length==0) this[aProperty]={};
			else this[aProperty]=doc[0].value;
			aCallBack();
		})
	}
	//セーブデータを保存する
	static save(){
		for(let tData of this.data){
			this.db.insert({data:tData,value:this[tData]});
		}
	}
}
