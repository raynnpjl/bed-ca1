## Folder Structure

###
	.
	├── src/
	│   ├── config/
	│   │   └── db.js
	│   ├── controllers/
	│   │   ├── challengeController.js
	│   │   ├── characterController.js
	│   │   ├── classController.js
	│   │   ├── dungeonController.js
	│   │   ├── factionController.js
	│   │   ├── inventoryController.js
	│   │   ├── marketController.js
	│   │   ├── petController.js
	│   │   └── userController.js
	│   ├── middleware/
	│   │   └── logger.js
	│   ├── models/
	│   │   ├── challengeModel.js
	│   │   ├── characterModel.js
	│   │   ├── classModel.js
	│   │   ├── dungeonModel.js
	│   │   ├── factionModel.js
	│   │   ├── gearModel.js
	│   │   ├── inventoryModel.js
	│   │   ├── marketModel.js
	│   │   ├── petModel.js
	│   │   └── userModel.js
	│   ├── routes/
	│   │   ├── challengeRoutes.js
	│   │   ├── characterRoutes.js
	│   │   ├── classRoutes.js
	│   │   ├── dungeonRoutes.js
	│   │   ├── factionRoutes.js
	│   │   ├── inventoryRoutes.js
	│   │   ├── mainRoutes.js
	│   │   ├── marketRoutes.js
	│   │   ├── petRoutes.js
	│   │   └── userRoutes.js
	│   ├── views/
	│   │   └── responseView.js
	│   └── app.js
	├── .env
	├── .gitignore
	├── package.json
	├── package-lock.json
	└── README.md

## Prerequitsites

###

	RUN STATEMENT INTO SQL QUERY BEFORE RUNNING NPM START
	
	MySQL Tables:
	
	DROP TABLE IF EXISTS User;
	CREATE TABLE User (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	username TEXT,
	skillpoints INT
	);
	
	DROP TABLE IF EXISTS FitnessChallenge;
	CREATE TABLE FitnessChallenge (
	challenge_id INT AUTO_INCREMENT PRIMARY KEY,
	creator_id INT NOT NULL,
	challenge TEXT NOT NULL,
	skillpoints INT NOT NULL
	);
	
	DROP TABLE IF EXISTS UserCompletion;
	CREATE TABLE UserCompletion (
	complete_id INT AUTO_INCREMENT PRIMARY KEY,
	challenge_id INT NOT NULL,
	user_id INT NOT NULL,
	completed BOOL NOT NULL,
	creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	notes TEXT
	);
	
	DROP TABLE IF EXISTS class;
	CREATE TABLE class (
		class_id INT AUTO_INCREMENT PRIMARY KEY,
	    class TEXT NOT NULL,
	    hp INT NOT NULL,
	    atk INT NOT NULL,
	    atk_spd FLOAT NOT NULL,
	    movement_spd FLOAT NOT NULL,
	    energy INT NOT NULL,
	    mana INT NOT NULL,
	    passive TEXT NOT NULL,
	    skill1 TEXT NOT NULL,
	    skill2 TEXT NOT NULL
	);
	
	INSERT INTO class (class, hp, atk, atk_spd, movement_spd, energy, mana, passive, skill1, skill2)
	VALUES 
		('Warrior', 350, 40, 1.2, 1, 100, 0, 'Heavy weapons mastery - Increased damage and critical hit chance with heavy weapons like swords and axes', "Last stand - Increases attack damage by 50% for a duration of 15 seconds and defense decreases by 30% (45s cooldown)", "Warrior's Rage - Nullify all debuff, heals 150HP and increases attack speed by 20% (60s cooldown)"),
	    ('Assassin', 180, 30, 2.5, 1.5, 100, 0, 'Shadow Strike - Guarantee a critical strike when attack from behind while increasing critical damage by 100%. Upon a successful sneak attack, temporary increase movement speed by 50% (45s cooldown)', "Poison blade - Coat your weapon with poison influcting poison status on the enemy dealing 10dmg/s over 8s (30s cooldown)", "Intimidation - Instill fear in the enemy in a 2m radius, enemy will be stun for 2s (30s cooldown)"),
	    ('Mage', 200, 50, 1.8, 1.1, 0, 100, 'Time Capsule (Activable passive) -  Instantly gains 50 mana and reset all skills cooldown (90s cooldown)', 'Fireball - Cast a fireball which deals 100 damage and inflict burn dealing 6dmg/s over 10s (15s cooldown)', 'Meteor Strike  - Summon a meteor to strike a wide range of area dealing 95% of their health (45s cooldown)'),
	    ('Summoner', 250, 15, 1.5, 1.1, 0, 100, 'Spirit bond - For every spirit alive, hp and movement speed increases by 2% (stacks)', 'Spirit summons - Summon a spirit (50 HP and deals the same amount of damage as character) (5s cooldown)', 'King of spirit - Summon the king of spirit ( 400 HP and 50 ATK ) (90s cooldown)'),
	    ('Archer', 200, 40, 2, 1.4, 100, 0, "Hunter's Instinct -  Increases the critical hit chance when attacking from a distance", 'Rapid fire - Able to instantly charge the bow for 10s (20s cooldown)', 'Explosive Shot - Grants explosive arrow which deal AOE dmg on impact for 10s (30s cooldown)');
	DROP TABLE IF EXISTS gear;
	CREATE TABLE gear (
		gear_id INT AUTO_INCREMENT PRIMARY KEY,
	    item TEXT NOT NULL,
	    item_desc TEXT NOT NULL,
	    stat TEXT,
	    effect FLOAT,
	    part TEXT NOT NULL,
	    category TEXT NOT NULL
	    );
	
	INSERT INTO gear (item,item_desc,stat,effect,part,category)
	VALUES
		('Forgeguard Helm', 'Increases health by 10%', 'hp', 0.10, 'helmet', 'armor'),
	    ('Battleforged Crown', 'Increases health by 30%', 'hp', 0.30, 'helmet', 'armor'),
	    ('Arcane Circlet', 'Increases mana by 15%', 'mana', 0.15, 'helmet', 'armor'),
	    ('Windrunner Helm', 'Increases movement speed by 20%', 'movement_spd', 0.20, 'helmet', 'armor'),
	    ('Ironheart Chestguard', 'Increases health by 50%', 'hp', 0.50, 'chestplate', 'armor'),
	    ('Robes of Mystic Flow', 'Increases mana by 25%', 'mana', 0.25, 'chestplate', 'armor'),
	    ('Plate of the Colossus', 'Increases energy by 40%', 'energy', 0.40, 'chestplate', 'armor'),
	    ('Phantomweave Garb', 'Increases attack speed by 20%', 'atk_spd', 0.20, 'chestplate', 'armor'),
	    ('Greaves of Titan Might', 'Increases health by 25%', 'hp', 0.25, 'leggings', 'armor'),
	    ('Shadowstep leggings', 'Increases movement speed by 20%', 'movement_spd', 0.20, 'leggings', 'armor'),
	    ('The Titan Prosthetic', 'Increases health by 60%', 'hp', 0.60, 'leggings', 'armor'),
	    ('Enigmatic leggings', 'Increases mana by 25%', 'mana', 0.25, 'leggings', 'armor'),
	    ('Ironfang protector', 'Increases energy by 30%', 'energy', 0.30, 'leggings', 'armor'),
	    ('Warblade of Unyielding Fury', 'Increases attack by 20%', 'atk', 0.20, 'weapon', 'sword'),
	    ('Bloodhowl Axe', 'Increases attack by 30%', 'atk', 0.30, 'weapon', 'axe'),
	    ('Silent Reaper Dagger', 'Increases attack by 60%', 'atk', 0.60, 'weapon', 'dagger'),
	    ('Starlight Scepter', 'Increases mana by 90%', 'mana', 0.90, 'weapon', 'wand'),
	    ('Soulflame Wand', 'Increases attack by 50%', 'atk', 0.50, 'waepon', 'wand'),
	    ('Bow of Whispering Winds', 'Increases attack speed by 60%', 'atk_spd', 0.60, 'weapon', 'bow'),
	    ('Vortex Longbow', 'Increases attack by 60%', 'atk', 0.60, 'weapon', 'bow'),
	    ('Wooden Sword', 'no effect', null, null, 'weapon', 'sword'),
	    ('Wooden Dagger', 'no effect', null, null, 'weapon', 'dagger'),
	    ('Wooden Wand', 'no effect', null, null, 'weapon', 'wand'),
	    ('Wooden Bow', 'no effect', null, null, 'weapon', 'bow');
	    
	DROP TABLE IF EXISTS dungeon;
	CREATE TABLE dungeon (
		dungeon_id INT AUTO_INCREMENT PRIMARY KEY,
	    dungeon_name TEXT NOT NULL,
	    min_lvl INT NOT NULL,
	    drops JSON NOT NULL,
	    gold INT NOT NULL,
	    pet_lvl INT NOT NULL
	    );
	    
	INSERT INTO dungeon (dungeon_name, min_lvl, drops, gold, pet_lvl)
	VALUES
		('Abyssal Spire', 0, '["Forgeguard Helm","Enigmatic leggings","Windrunner Helm"]', 50, 1),
	    ('Crypt of the Forgotten Kings', 0, '["Battleforged Crown","Greaves of Titan Might","Robes of Mystic Flow"]', 50, 1),
	    ('Everdark Caverns', 3, '["Warblade of Unyielding Fury","Bloodhowl Axe","Starlight Scepter"]', 120, 2),
	    ('Labyrinth of Eternal Echoes', 3, '["Silent Reaper Dagger","Soulflame Wand","Bow of Whispering Winds"]', 120, 2),
	    ('Bloodthorn Keep', 6, '["Arcane Circlet","Phantomweave Garb","Ironfang protector"]', 200, 3),
	    ('Chasm of Shattered Dreams', 6, '["Ironheart Chestguard","Plate of the Colossus","Shadowstep leggings"]', 200, 3),
		('Chasm of Shattered Dreams', 11, '["The Titan Prosthetic","Vortex Longbow"]', 400, 4);
	    
	DROP TABLE IF EXISTS characters;
	CREATE TABLE characters (
		character_id INT AUTO_INCREMENT PRIMARY KEY,
	    user_id INT NOT NULL,
	    character_name TEXT NOT NULL,
	    character_class TEXT NOT NULL,
	    faction TEXT NOT NULL,
	    lvl INT NOT NULL,
	    weapon TEXT NOT NULL,
	    helmet TEXT,
	    chestplate TEXT,
	    leggings TEXT,
	    hp INT NOT NULL,
	    atk INT NOT NULL,
	    atk_spd INT NOT NULL,
		movement_spd FLOAT NOT NULL,
	    energy INT NOT NULL,
	    mana INT NOT NULL,
	    passive TEXT NOT NULL,
	    skill1 TEXT NOT NULL,
	    skill2 TEXT NOT NULL,
	    pet_name TEXT NOT NULL,
	    pet_lvl INT NOT NULL
	    );
	    
	DROP TABLE IF EXISTS inventory;
	CREATE TABLE inventory (
		inventory_id INT AUTO_INCREMENT PRIMARY KEY,
	    user_id INT NOT NULL,
	    items JSON NOT NULL,
	    gold INT NOT NULL
	    );
	
	DROP TABLE IF EXISTS pet;
	CREATE TABLE pet (
		pet_id INT AUTO_INCREMENT PRIMARY KEY,
	    pet_1st_evolution TEXT NOT NULL,
	    pet_2nd_evolution TEXT NOT NULL,
	    pet_3rd_evolution TEXT NOT NULL,
	    pet_desc TEXT NOT NULL
	    );
	    
	INSERT INTO pet (pet_1st_evolution, pet_2nd_evolution, pet_3rd_evolution, pet_desc)
	VALUES
		("Shadow Fox", "Twilight Prowler", "Eclipse Fox", "A sleek, black fox with glowing purple eyes."),
	    ("Flame Sprite", "Inferno Wisp", "Pyro Emissary", "A small, fiery creature resembling a floating ember with a mischievous grin."),
	    ("Starbound Wolf", "Celestial Wolf", "Eclipse Howler", "A wolf cub with a shimmering coat that looks like the night sky."),
	    ("Glacier Bear Cub", "Frostpaw Guardian", "Blizzard Titan", "A frosty bear cub with icy blue fur and a chilling aura."),
	    ("Moonlit Panther", "Lunar Panther", "Eclipse Sovereign", "A sleek panther with glowing silver eyes and fur that glows under moonlight.");
	
	DROP TABLE IF EXISTS dungeoncompletion;
	CREATE TABLE dungeoncompletion (
		complete_id INT AUTO_INCREMENT PRIMARY KEY,
	    dungeon_id INT NOT NULL,
	    character_id INT NOT NULL,
	    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	    );
	    
	DROP TABLE IF EXISTS faction;
	CREATE TABLE faction (
		faction_id INT AUTO_INCREMENT PRIMARY KEY,
	    faction_name TEXT NOT NULL,
	    faction_desc TEXT NOT NULL,
	    min_lvl INT NOT NULL,
	    owner_character_id INT NOT NULL,
	    owner_name TEXT NOT NULL,
	    members JSON NOT NULL
	    );
	    
	DROP TABLE IF EXISTS market;
	CREATE TABLE market (
		auction_item_id INT AUTO_INCREMENT PRIMARY KEY,
	    user_id INT NOT NULL,
	    username TEXT NOT NULL,
	    item TEXT NOT NULL,
	    price INT NOT NULL
	    );
	    
	DROP TABLE IF EXISTS transactioncompletion;
	CREATE TABLE transactioncompletion (
		transaction_id INT AUTO_INCREMENT PRIMARY KEY,
	    auction_item_id INT NOT NULL,
	    buyer_user_id INT NOT NULL,
	    seller_user_id INT NOT NULL,
	    transacted_item TEXT NOT NULL,
	    price INT NOT NULL,
	    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	    );

## CRUD Operation

###

	POST/characters
	[Request Body]
	{
	    "user_id":1,
	    "character_name":"test,
	    "character_class":"mage",
	    "pet_name":"Shadow Fox"
	}
	
	POST/dungeons/{dungeon_id}
	[Request Body]
	{
	    "character_id":1
	}
	
	PUT/characters/{user_id}/{character_name}/equip
	[Request Body]
	{
	    "item":"Battleforged Crown"
	}
	
	PUT/characters/{user_id}/{character_name}/unequip
	[Request Body]
	{
	    "item_type":"helmet"
	}
	
	POST/factions
	[Request Body]
	{
	    "faction_name":"Test faction",
	    "faction_desc":"Test",
	    "min_lvl":0,
	    "character_id":1
	}
	
	PUT/factions
	[Request Body]
	{
	    "faction_name":"Test faction2",
	    "faction_desc":"Test2",
	    "min_lvl":0,
	    "character_id":1
	}
	
	PUT/factions/{faction_id}/join
	[Request Body]
	{
	    "character_id":2
	}
	
	PUT/factions/{faction_id}/leave
	[Request Body]
	{
	    "character_id":2
	}
	
	DELETE/factions/{faction_id}
	[Request Body]
	{
	    "character_id":2
	}
	
	POST/market
	[Request Body] 
	{
	    "user_id":1,
	    "item":"Battleforged Crown",
	    "price":50
	}
	
	POST/market/{auction_item_id}
	[Request Body]
	{
	    "user_id":1
	}
	
	DELETE/market/{auction_item_id}
	[Request Body]
	{
	    "user_id":1
	}







