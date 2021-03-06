const Entity = require('../../Entity');

module.exports = class Missile extends Entity{
	constructor(boss){
		super(boss.x, boss.y, 11, 55);
		this.boss = boss;
		this.boss.scene.addObject('boss_missile', this);

		this.active = false;
		this.fired = false;

		this.setSpeed();

		this.sprite = this.boss.scene.add.sprite(this.x, this.y, 'boss_missile');

		this.spriteFire = this.boss.scene.add.sprite(this.x, this.y, 'boss_missile_fire');
		this.spriteFire.play('boss_missile_fire_animation');

		this.sprite.depth =  -1;
		this.spriteFire.depth =  -1;
	
		this.container = [];
	}

	addContainer(container){
		this.container.push(container);
	}

	static loadAssets(scene){
		scene.load.image('boss_missile', 'assets/game/boss/missile.png');
		scene.load.spritesheet('boss_missile_fire', 'assets/game/boss/missile_fire.png', {frameWidth: 38, frameHeight: 140});
	}

	static createAnimations(scene){
		scene.anims.create({
			key: 'boss_missile_fire_animation',
			frames: scene.anims.generateFrameNumbers('boss_missile_fire', {start: 0, end: 3}),
			frameRate: 8,
			repeat: -1
		});
	}

	static removeAnimations(scene){
		scene.anims.remove('boss_missile_fire_animation');
	}

	destroy(){
		this.reload();
		this.active = false;
		this.fired = false;
		this.y = 0;
	}

	reload(){
		for (let i = 0; i < this.container.length; i++){
			this.container[i].reload(this);
		}
	}

	setSpeed(){
		this.speed = this.boss.random()*10+10;
	}

	update(){
		if (this.fired){
			this.y += this.speed;
			
			if (this.y >= (this.boss.scene.game.canvas.height + this.height)){
				this.destroy();
			}
		}
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.spriteFire.x = this.x;
		this.spriteFire.y = this.y-38;
		this.sprite.visible = this.active;
		this.spriteFire.visible = this.active;
	}
}