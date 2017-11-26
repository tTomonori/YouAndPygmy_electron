MapDictionary.dictionary.debag1={
	map:{
		map:{
			0:{
				0:[{x:3},0,0,0,0,0,0],
				1:[{x:3},0,0,0,0,0,0],
				2:[{x:3},0,0,0,0,0,0],
				3:[{x:3},0,0,0,0,0,0],
				4:[{x:3},0,0,0,0,0,0],
				5:[{x:3},5,5,5,6,6,6],
				6:[{x:3},5,5,5,6,6,6],
				7:[{x:3},0,0,0,0,0,0],
			},
			0.5:{
				7:[{x:2},1,{x:9},2],
			},
			1:{
				0:[3,3,3,{x:9},3,3,3],
				1:[3,3,3,{x:9},3,3,3],
				2:[3,3,3,{x:9},3,3,3],
				3:[3,3,3,{x:9},3,3,3],
				4:[3,3,{x:10},3,3],
				5:[3,3,3,{x:9},3,3,3],
				6:[3,3,3,{x:9},3,3,3],
				7:[3,3,{x:10},3,3],
			},
			1.5:{
				4:[{x:2},2,{x:9},1],
			},
			2:{
				4:[{x:3},0,0,0,0,0,0],
			},
		},
		neighbor:[
			{x:12,y:5,z:1,chip:0,mapName:"debag2",neighborPosition:{x:0,y:3,z:0}},
			{x:12,y:6,z:1,chip:0,mapName:"debag2",neighborPosition:{x:0,y:4,z:0}}
		],
		chip:{
			0:{
				canOn:true,
				image:{above:"grass",side:"soil"},
			},
			1:{
				canOn:true,
				image:{above:"grass",side:"soil"},
				height:{up:0,right:-1,bottom:0,left:1},
				under:["soil"]
			},
			2:{
				canOn:true,
				image:{above:"grass",side:"soil"},
				height:{up:0,right:1,bottom:0,left:-1},
				under:["soil"]
			},
			3:{
				canOn:true,
				image:{above:"grass",side:"soil"},
				under:["soil"]
			},
			4:{
				canOn:false,
				image:{above:"grass",side:"soil"},
				object:"stump"
			},
			5:{
				canOn:true,
				image:{above:"grass",side:"soil"},
				event:[{event:"randomEncount",num:0}]
			},
			6:{
				canOn:true,
				image:{above:"grass",side:"soil"},
				event:[{event:"randomEncount",num:1}]
			},
			soil:{
				image:{above:"soil",side:"soil"}
			}
		}
	},
	creature:{

	},
	encount:{
		0:{
			userPygmyNum:5,
			enemies:[{race:"bakeneko",level:2,status:"default"},{race:"bakeneko",level:2,status:"default"}],
			feild:[
				[1,0,0,0,0,0,1],
				[1,0,0,0,2,0,1],
				[1,1,0,0,0,1,1],
				[1,1,1,0,0,1,1],
				[1,0,0,0,0,0,0],
				[0,0,0,0,0,0,0]
			],
			masData:{
				0:{
					attribute:"grass",
					image:"grass",
					object:[]
				},
				1:{
					attribute:"water",
					image:"water",
					object:[]
				},
				2:{
					attribute:"object",
					image:"grass",
					object:["stump"]
				}
			},
			charaPosition:{
				user:[{x:0,y:5},{x:1,y:5},{x:3,y:5},{x:5,y:5},{x:6,y:5}],
				enemy:[{x:2,y:0},{x:3,y:0}]
			},
			background:"BG24a_80.jpg"
		},
		1:{}
	}
}
MapDictionary.dictionary.debag2={
	map:{
		map:{
			0:{
				0:[0,0,0,0],
				1:[0,0,0,0],
				2:[0,0,0,0],
				3:[0,0,0,0],
				4:[0,0,0,0],
				5:[0,0,0,0],
			},
		},
		neighbor:[
			{x:-1,y:3,z:0,chip:0,mapName:"debag1",neighborPosition:{x:11,y:5,z:1}},
			{x:-1,y:4,z:0,chip:0,mapName:"debag1",neighborPosition:{x:11,y:6,z:1}}
		],
		chip:{
			0:{
				canOn:true,
				image:{above:"grass",side:"soil"},
				height:{up:0,right:0,bottom:0,left:0},
			}
		}
	}
}