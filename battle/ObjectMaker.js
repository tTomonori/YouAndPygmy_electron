class ObjectMaker{
	//マス上のオブジェクトを生成する
	static createObject(aObjectName){
		let tObject;
		switch (aObjectName) {
			case "stump"://切り株
				tObject=ThreeWarld.createCylinder(mMasSize[0]/3,mMasSize[2]/3);
				tObject.position.z=mMasSize[2]*2/3;
				tObject.rotation.x=Math.PI/2;
				tObject.material.map=ThreeWarld.createTexture("image/battleTile/stump.jpg");
				return tObject;
				break;
			default:

		}
	}
}
