class MapDictionary{
	//マップ情報取得
	static getMap(aMapName){
		return this.dictionary[aMapName];
	}
}
MapDictionary.dictionary={};
