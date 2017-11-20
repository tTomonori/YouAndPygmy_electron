class ItemDictionary{
	static getItem(aItemName){
		return this.dictionary[aItemName];
	}
}
ItemDictionary.dictionary={
	kinomi:{
		skill:{
			name:"きのみ",
			attribute:"heal",
			magnification:"fixed",
			power:10,
			accuracy:100,
			range:[{range:"circumference",value:1},{range:"my"}],
			involve:{involve:"none"},
			object:false,
			wall:false,
		}
	}
}
