class SkillDictionary{
	static getSkill(aSkillName){
		return this.dictionary[aSkillName];
	}
}
SkillDictionary.dictionary={
	hikkaki:{
		name:"ひっかき",
		attribute:"physics",
		magnification:"addition",
		power:0,
		accuracy:100,
		range:[{range:"circumference",value:1}],
		involve:{involve:"none"},
		object:false,
		wall:false,
	},
	enjutu:{
		name:"炎術",
		attribute:"magic",
		magnification:"multiplication",
		power:1.2,
		accuracy:90,
		range:[{range:"circumference",value:3}],
		involve:{involve:"circumference",value:1},
		object:true,
		wall:false,
	},
	denkousekka:{
		name:"電光石火",
		attribute:"physics",
		magnification:"addition",
		power:5,
		accuracy:100,
		range:[{range:"straight",value:2}],
		involve:{involve:"through"},
		object:false,
		wall:false,
	}
}
/*
name:{
name:"",
attribute:"attack"or"heal",
magnification:"addition"or"multiplication",
power:,
accuracy:,
range:[{range:"",value:}],
involve:{involve:"none"},
object:true or false,
wall:true or false,
}
*/
