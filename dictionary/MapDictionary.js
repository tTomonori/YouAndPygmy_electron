class MapDictionary{
	//マップ情報取得
	static get(aMapName){
		return this.dictionary[aMapName];
	}
}
MapDictionary.dictionary={};
