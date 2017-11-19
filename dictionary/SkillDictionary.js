class SkillDictionary{
	static getSkill(aSkillName){
		return this.dictionary[aSkillName];
	}
}
SkillDictionary.dictionary={
	hikkaki:{
		name:"ひっかき",
		attack:"attack",
		magnification:"addition",
		power:0,
		range:[{range:"circumference",value:1}],
		involve:{involve:"none"},
		object:false,
		wall:false,
	},
	enjutu:{
		name:"炎術",
		attack:"attack",
		magnification:"multiplication",
		power:1.2,
		range:[{range:"circumference",value:3}],
		involve:{involve:"circumference",value:1},
		object:true,
		wall:false,
	},
	denkousekka:{
		name:"電光石火",
		attack:"attack",
		magnification:"addition",
		power:5,
		range:[{range:"straight",value:2}],
		involve:{involve:"through"},
		object:false,
		wall:false,
	}
}
/*
name:{
name:"",
attack:"attack"or"heal",
magnification:"addition"or"multiplication",
power:,
range:[{range:"",value:}],
involve:{involve:"none"},
object:true or false,
wall:true or false,
}
*/
