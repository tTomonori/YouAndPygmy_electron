class ItemDictionary{
	static get(aItemName){
		return this.dictionary[aItemName];
	}
}
ItemDictionary.dictionary={
	kinomi:{
		name:"きのみ",
		skill:{
			key:"kinomi",
			name:"きのみ",
			attribute:"heal",
			magnification:"fixed",
			power:10,
			accuracy:100,
			range:[{range:"circumference",value:1},{range:"my"}],
			involve:{involve:"none"},
			object:false,
			wall:false,
			animation:"test",
			consum:true
		}
	}
}
