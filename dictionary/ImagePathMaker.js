class ImagePathMaker{
	static getBodyPath(aName){
		return "image/"+aName+".png";
	}
	static getEyePath(aName){
		return "image/eye/"+aName+".png";
	}
	static getMouthPath(aName){
		return "image/mouth/"+aName+".png";
	}
	static getAccessoryPath(aName){
		return "image/accessory/"+aName+".png";
	}
	static getGagePath(aName){
		return "image/status/"+aName+"Bar.png";
	}
}
