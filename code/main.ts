import kaboom from "kaboom"
import "kaboom/global"
kaboom()
// var fishMove = LEFT
// a list of specific sprites that are either the same in each area or specific to certain areas
let specialList = ["toSurface", "toRed", "toPink", "toBlue", "toGreen"]

for (let i = 0; i < specialList.length; i++) {
	loadSprite(specialList[i], `/sprites/Special/${specialList[i]}.png`)
}


loadSprite("player", "/sprites/players/player.png", {
		sliceX: 2,
})
loadSprite("bobber", "/sprites/players/bobber.png", {
		sliceX: 2,
})

// a list of objects that are present in each of the biomes while not having the same sprites, such as the borders, the water etc.
let generalspriteList = ["bush", "left", "right", "rock", "pickup", "top", "treeBottom", "corners", "treeTop", "water"]

// goes through all of the sprites in each list and loads each of them from each folder to correspond with each area
for (let i = 0; i < generalspriteList.length; i++) {
	loadSprite(generalspriteList[i], `/sprites/Green/${generalspriteList[i]}.png`)
	loadSprite(`Wet${generalspriteList[i]}`, `/sprites/Water/${generalspriteList[i]}.png`)
	loadSprite(`Red${generalspriteList[i]}`, `/sprites/Red/${generalspriteList[i]}.png`)
	loadSprite(`Blue${generalspriteList[i]}`, `/sprites/Blue/${generalspriteList[i]}.png`)
	loadSprite(`Pink${generalspriteList[i]}`, `/sprites/Pink/${generalspriteList[i]}.png`)

}






// The main levels of the game
scene("green", (levelIdx) => {
	setBackground(80, 178, 100)
	let speed = 320
	const levels = [

		// forest level
		["s============================s",
			"sffffffffffffffffffffffffffffs",
			"l                            r",
			"l   O    BO           O      r",
			"l            B      $        r",
			"l O          B               r",
			"l R     B    @B          W   r",
			"l             B    -----O    r",
			"l   O        B  ----------   r",
			"l              ------------  r",
			"l       O       ----------O  r",
			"l              O        O    r",
			"l      S @          O        r",
			"=tttttttttttttttttttttttttttt=",
			"ffffffffffffffffffffffffffffff",

		],
]

	const level = addLevel(levels[levelIdx], {
		tileWidth: 64,
		tileHeight: 64,
		pos: vec2(16, 32),
		tiles: {
			"-": () => [
				sprite("water"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"water"
			],
			"$": () => [
				sprite("pickup"),
				area(),
				anchor("center"),
				"pickup",
			],
			"@": () => [
				sprite("player"),
				area(),
				body(),
				anchor("center"),
				"player",
			],
			"W": () => [
				sprite("toBlue"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toBlue",
			],
			"R": () => [
				sprite("toRed"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toRed",
			],
			"S": () => [
				sprite("toPink"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toPink",
			],
			"f": () => [
				sprite("treeBottom"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"=": () => [
				sprite("treeTop"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"s": () => [
				sprite("corners"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"l": () => [
				sprite("left"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"r": () => [
				sprite("right"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"t": () => [
				sprite("top"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"O": () => [
				sprite("rock"),
				area(),
				body(),
				anchor("center"),
			],
			"B": () => [
				sprite("bush"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],

		},


	})


	
	const player = level.get("player")[0]

	let haspickup = false

	player.onCollide("pickup", (pickup) => {
		destroy(pickup)
		player.frame = 1
		haspickup = true
	})


	player.onCollide("water", () => {
		if (haspickup) {
			go("fishing", 0)
		} else {
		}
	})

	player.onCollide("toRed", () => {
		go("red", 0)

	})
	player.onCollide("toPink", () => {
		go("pink", 0)

	})
	player.onCollide("toBlue", () => {
		go("blue", 0)

	})

	const dirs = {

		"a": LEFT,
		"d": RIGHT,
		"w": UP,
		"s": DOWN,
	}
	onKeyDown("shift", () => { speed = 640 })
	onKeyRelease("shift", () => { speed = 320 })
	for (const dir in dirs) {
		onKeyDown(dir, () => {
			player.move(dirs[dir].scale(speed))
		})
	}



	
	const player2 = level.get("player")[1]

	let haspickup2 = false

	player2.onCollide("pickup", (pickup) => {
		destroy(pickup)
		player2.frame = 1
		haspickup2WW = true
	})


	player2.onCollide("water", () => {
		if (haspickup2) {
			go("fishing", 0)
		} else {
		}
	})

	player2.onCollide("toRed", () => {
		go("red", 0)

	})
	player2.onCollide("toPink", () => {
		go("pink", 0)

	})
	player2.onCollide("toBlue", () => {
		go("blue", 0)

	})

	const dirs2 = {

		"left": LEFT,
		"right": RIGHT,
		"up": UP,
		"down": DOWN,
	}
	onKeyDown("shift", () => { speed = 640 })
	onKeyRelease("shift", () => { speed = 320 })
	for (const dir in dirs2) {
		onKeyDown(dir, () => {
			player2.move(dirs2[dir].scale(speed))
		})
	}

})

scene("red", (levelIdx) => {
	setBackground(180, 50, 50)
	let speed = 320
	const levels = [

		// Red level
		[
			"------------------------",
			"-                      -",
			"-     OO               -",
			"-   S        B         -",
			"-                   W  -",
			"    $   -      OO      -",
			"F     ----             -",
			"-    -----             -",
			"-  @  ---              -",
			"------------------------",
		],
]

	const level = addLevel(levels[levelIdx], {
		tileWidth: 64,
		tileHeight: 64,
		pos: vec2(16, 32),
		tiles: {
			"-": () => [
				sprite("Redwater"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"water"
			],
			"$": () => [
				sprite("Redpickup"),
				area(),
				anchor("center"),
				"pickup",
			],
			"@": () => [
				sprite("player"),
				area(),
				body(),
				anchor("center"),
				"player",
			],
			"W": () => [
				sprite("toBlue"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toBlue",
			],
			"F": () => [
				sprite("toGreen"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toGreen",
			],
			"S": () => [
				sprite("toPink"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toPink",
			],
			"f": () => [
				sprite("RedtreeBottom"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"=": () => [
				sprite("RedtreeTop"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"s": () => [
				sprite("Redcorners"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"l": () => [
				sprite("Redleft"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"r": () => [
				sprite("Redright"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"t": () => [
				sprite("top"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"O": () => [
				sprite("Redrock"),
				area(),
				body(),
				anchor("center"),
			],
			"B": () => [
				sprite("Redbush"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],

		},


	})

	const player = level.get("player")[0]

	let haspickup = false

	player.onCollide("pickup", (pickup) => {
		destroy(pickup)
		player.frame = 1
		haspickup = true
	})


	player.onCollide("water", () => {
		if (haspickup) {
			go("fishing", 1)
		} else {
		}
	})


	player.onCollide("toGreen", () => {
		go("green", 0)

	})
	player.onCollide("toPink", () => {
		go("pink", 0)

	})
	player.onCollide("toBlue", () => {
		go("blue", 0)

	})



	const dirs = {

		"a": LEFT,
		"d": RIGHT,
		"w": UP,
		"s": DOWN,
	}
	onKeyDown("shift", () => { speed = 640 })
	onKeyRelease("shift", () => { speed = 320 })
	for (const dir in dirs) {
		onKeyDown(dir, () => {
			player.move(dirs[dir].scale(speed))
		})
	}

})

scene("pink", (levelIdx) => {
	setBackground(200, 100, 100)
	let speed = 320
	const levels = [

		// pink level
		["sl                   ----------",
			"sl                  -----------",
			"sl                 ------------",
			"sl                   ----------",
			"sl       $          -----------",
			"sl               --------------",
			"sl       @     ----------------",
			"sl           ------------------",
			"sl            -----------------",
			"sl F     W    -----------------",
			"sl            -----------------",
			"sl             ----------------",
			"sl     R        ---------------",
			"sl             ----------------",
			"sl            -----------------",
		],
]

	const level = addLevel(levels[levelIdx], {
		tileWidth: 64,
		tileHeight: 64,
		pos: vec2(16, 32),
		tiles: {
			"-": () => [
				sprite("Pinkwater"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"water"
			],
			"$": () => [
				sprite("Pinkpickup"),
				area(),
				anchor("center"),
				"pickup",
			],
			"@": () => [
				sprite("player"),
				area(),
				body(),
				anchor("center"),
				"player",
			],
			"W": () => [
				sprite("toBlue"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toBlue",
			],
			"F": () => [
				sprite("toGreen"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toGreen",
			],
			"R": () => [
				sprite("toRed"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toRed",
			],
			
			"f": () => [
				sprite("PinktreeBottom"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"=": () => [
				sprite("PinktreeTop"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"s": () => [
				sprite("Pinkcorners"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"l": () => [
				sprite("Pinkleft"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"r": () => [
				sprite("Pinkright"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"t": () => [
				sprite("top"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"O": () => [
				sprite("Pinkrock"),
				area(),
				body(),
				anchor("center"),
			],
			"B": () => [
				sprite("Pinkbush"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],

		},


	})

	const player = level.get("player")[0]

	let haspickup = false

	player.onCollide("pickup", (pickup) => {
		destroy(pickup)
		player.frame = 1
		haspickup = true
	})


	player.onCollide("water", () => {
		if (haspickup) {
			go("fishing", 3)
		} else {
		}
	})


	player.onCollide("toGreen", () => {
		go("green", 0)

	})
	player.onCollide("toRed", () => {
		go("red", 0)

	})
	player.onCollide("toBlue", () => {
		go("blue", 0)

	})



	const dirs = {

		"a": LEFT,
		"d": RIGHT,
		"w": UP,
		"s": DOWN,
	}
	onKeyDown("shift", () => { speed = 640 })
	onKeyRelease("shift", () => { speed = 320 })
	for (const dir in dirs) {
		onKeyDown(dir, () => {
			player.move(dirs[dir].scale(speed))
		})
	}

})


scene("blue", (levelIdx) => {
	setBackground(200,200,120)
	let speed = 320
	const levels = [

		// blue level
		[
			"------------------------------",
			"------------------------------",
			"---------     ----------------",
			"-----     ^     O ---------- -",
			"-                     -----  -",
			"-     BO    $   @        -   -",
			"-                            -",
			"-                            -",
			"-      R     F     S         -",
			"--                           -",
			"-----                    -   -",
			"---------            -----   -",
			"---------------------------  -",
			"---------------------------- -",
			"------------------------------",
		],
]

	const level = addLevel(levels[levelIdx], {
		tileWidth: 64,
		tileHeight: 64,
		pos: vec2(16, 32),
		tiles: {
			"-": () => [
				sprite("Bluewater"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"water"
			],
			"$": () => [
				sprite("Bluepickup"),
				area(),
				anchor("center"),
				"pickup",
			],
			"@": () => [
				sprite("player"),
				area(),
				body(),
				anchor("center"),
				"player",
			],
			"S": () => [
				sprite("toPink"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toPink",
			],
			"F": () => [
				sprite("toGreen"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toGreen",
			],
			"R": () => [
				sprite("toRed"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toRed",
			],
			"f": () => [
				sprite("BluetreeBottom"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"=": () => [
				sprite("BluetreeTop"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"s": () => [
				sprite("Bluecorners"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"l": () => [
				sprite("Blueleft"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"r": () => [
				sprite("Blueright"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"t": () => [
				sprite("top"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],
			"O": () => [
				sprite("Bluerock"),
				area(),
				body(),
				anchor("center"),
			],
			"B": () => [
				sprite("Bluebush"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
			],

		},


	})

	const player = level.get("player")[0]

	let haspickup = false

	player.onCollide("pickup", (pickup) => {
		destroy(pickup)
		player.frame = 1
		haspickup = true
	})


	player.onCollide("water", () => {
		if (haspickup) {
			go("fishing", 2)
		} else {
		}
	})


	player.onCollide("toGreen", () => {
		go("green", 0)

	})
	player.onCollide("toRed", () => {
		go("red", 0)

	})
	player.onCollide("toPink", () => {
		go("pink", 0)

	})



	const dirs = {

		"a": LEFT,
		"d": RIGHT,
		"w": UP,
		"s": DOWN,
	}
	onKeyDown("shift", () => { speed = 640 })
	onKeyRelease("shift", () => { speed = 320 })
	for (const dir in dirs) {
		onKeyDown(dir, () => {
			player.move(dirs[dir].scale(speed))
		})
	}

})



// The corresponding fishing levels for each area
scene("fishing", (fishingIdx) => {

	let leaving = ["green", "red", "blue", "pink"]

	setBackground(50, 100, 200)
	let speed = 160
	const levels = [


		// green level
		["rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
			"r                            r",
			"l         $                  r",
			"l   O    BO           O      r",
			"l            B               r",
			"l O          B               r",
			"l       B    @B              r",
			"l             B    -----O    r",
			"l   O        B  ----------   r",
			"l              ------------  r",
			"l       ^O      ----------O  r",
			"l              O        O    r",
			"l                   O        r",
			"r                            r",
			"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",

		],

		// red level
		[
			"------------------------",
			"-                      -",
			"-     OO               -",
			"-            B         -",
			"-        ^             -",
			"-   $   -      OO      -",
			"-     ----             -",
			"-    -----             -",
			"-  @  ---              -",
			"------------------------",
		],

		// blue level
		[
			"------------------------------",
			"------------------------------",
			"---------     ----------------",
			"-----     ^     O ---------- -",
			"-                     -----  -",
			"-     BO    $   @        -   -",
			"-                            -",
			"-                            -",
			"-      R     F     W         -",
			"--                           -",
			"-----                    -   -",
			"---------            -----   -",
			"---------------------------  -",
			"---------------------------- -",
			"------------------------------",
		],

		// pink level
		["sl                   ----------",
			"sl                  -----------",
			"sl                 ------------",
			"sl                   ----------",
			"sl       $          -----------",
			"sl               --------------",
			"sl       @     ----------------",
			"sl   ^       ------------------",
			"sl            -----------------",
			"sl F     S    -----------------",
			"sl            -----------------",
			"sl             ----------------",
			"sl     R        ---------------",
			"sl             ----------------",
			"sl            -----------------",
		],
]


	const level = addLevel(levels[fishingIdx], {
		tileWidth: 64,
		tileHeight: 64,
		pos: vec2(16, 32),
		tiles: {
			"-": () => [
				sprite("Wetwater"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"obj"
			],
			"$": () => [
				sprite("Wetpickup"),
				area(),
				body(),
				anchor("center"),
				"fish",
			],
			"@": () => [
				sprite("bobber"),
				area(),
				body(),
				anchor("center"),
				"player",
			],
			"^": () => [
				sprite("toSurface"),
				area(),
				body({ isStatic: true }),
				pos(-25, -82),
				"toSurface",
			],
			"f": () => [
				sprite("WettreeBottom"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"obj"
			],
			"=": () => [
				sprite("WettreeTop"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"obj"
			],
			"s": () => [
				sprite("Wetcorners"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"obj"
			],
			"l": () => [
				sprite("Wetleft"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"obj"
			],
			"r": () => [
				sprite("Wetright"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"obj"
			],
			"t": () => [
				sprite("Wettop"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"obj"
			],
			"O": () => [
				sprite("Wetrock"),
				area(),
				body(),
				anchor("center"),
				"obj"
			],
			"B": () => [
				sprite("Wetbush"),
				area(),
				body({ isStatic: true }),
				anchor("center"),
				"obj"
			],
		},
	})


	let player = level.get("player")[0]
	var fish = level.get("fish")[0]
	
 
	let hasfish = false
	player.onCollide("fish", (fish) => {
		destroy(fish)
		hasfish = true
		player.frame = 1

	})
	player.onCollide("toSurface", () => {
		if (hasfish) {
			go(leaving[fishingIdx], 0)
		}
	})

	var movement = -360
	fish.onCollide("obj", () => {
		movement = movement * -2
		fish.flipX = !fish.flipX

	}),
	onUpdate("fish", (fish) => {
		fish.move(movement, 0)
	})

	
	const dirs = {
		"a": LEFT,
		"d": RIGHT,
		"w": UP,
		"s": DOWN,
	}

	for (const dir in dirs) {
		onKeyDown(dir, () => {
			player.move(dirs[dir].scale(speed))
		})
	}
})


go("green", 0)