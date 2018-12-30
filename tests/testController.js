const { expect } = require('chai');
const Controller = require('../src/Controller');

describe('Controller.changeKey(button, key)\n' +
'    button - one of [up, down, left, right, shoot, shield]\n' +
'    key - Phaser 3 keyboard event key string', function() {
	it('[button, key] identical to initial state; no change', function() {
		let initialCon = new Controller();
		let controller = new Controller();
		controller.changeKey('up', 'ArrowUp');
		controller.changeKey('down', 'ArrowDown');
		controller.changeKey('left', 'ArrowLeft');
		controller.changeKey('right', 'ArrowRight');
		controller.changeKey('shoot', 'x');
		controller.changeKey('shield', 'z');

		for (let k in initialCon.keys){
			expect(initialCon.keys[k].button).to.be.a('string', controller.keys[k].button);
		}
	})

	it('[different button, existing key]; swap button of keys', function(){
		let controller = new Controller();
		let keyZ = controller.keys['z'];
		let keyX = controller.keys['x'];
		controller.changeKey('shoot', 'z');

		expect(keyZ.button).to.be.a('string', controller.keys['x'].button);
		expect(keyX.button).to.be.a('string', controller.keys['z'].button);
	})

	it('invalid button given', function(){
		let controller = new Controller();
		expect(controller.changeKey('what', 'x')).to.be.false;
	})

	it('change key to unique button', function(){
		let controller = new Controller();
		expect(Object.keys(controller.keys).length).to.equal(6);
		controller.changeKey('up', 'w');
		expect(Object.keys(controller.keys).length).to.equal(6);
	})
})

describe('Controller.press(key)\n' +
'    key - Phaser 3 keyboard event key string', function() {
	it('press valid key', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.false;
		expect(keys.ArrowLeft.down).to.be.false;
		expect(keys.ArrowRight.down).to.be.false;
		expect(keys.x.down).to.be.false;
		expect(keys.z.down).to.be.false;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
	it('press invalid key', function(){
		let controller = new Controller();
		controller.press('q');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.false;
		expect(keys.ArrowDown.down).to.be.false;
		expect(keys.ArrowLeft.down).to.be.false;
		expect(keys.ArrowRight.down).to.be.false;
		expect(keys.x.down).to.be.false;
		expect(keys.z.down).to.be.false;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
	it('press key that is already pressed', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		controller.press('ArrowUp');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.false;
		expect(keys.ArrowLeft.down).to.be.false;
		expect(keys.ArrowRight.down).to.be.false;
		expect(keys.x.down).to.be.false;
		expect(keys.z.down).to.be.false;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
})

describe('Controller.release(key)\n' +
'    key - Phaser 3 keyboard event key string', function() {
	it('release valid key', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		controller.press('ArrowDown');
		controller.press('ArrowLeft');
		controller.press('ArrowRight');
		controller.press('x');
		controller.press('z');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.x.down).to.be.true;
		expect(keys.z.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
		controller.release('ArrowUp');
		expect(keys.ArrowUp.down).to.be.false;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.x.down).to.be.true;
		expect(keys.z.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
	it('release invalid key', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		controller.press('ArrowDown');
		controller.press('ArrowLeft');
		controller.press('ArrowRight');
		controller.press('x');
		controller.press('z');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.x.down).to.be.true;
		expect(keys.z.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
		controller.release('q');
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.x.down).to.be.true;
		expect(keys.z.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
	it('release key that is already released', function(){
		let controller = new Controller();
		controller.press('ArrowUp');
		controller.press('ArrowDown');
		controller.press('ArrowLeft');
		controller.press('ArrowRight');
		controller.press('x');
		controller.press('z');
		let keys = controller.keys;
		expect(keys.ArrowUp.down).to.be.true;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.x.down).to.be.true;
		expect(keys.z.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
		controller.release('ArrowUp');
		expect(keys.ArrowUp.down).to.be.false;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.x.down).to.be.true;
		expect(keys.z.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
		controller.release('ArrowUp');
		expect(keys.ArrowUp.down).to.be.false;
		expect(keys.ArrowDown.down).to.be.true;
		expect(keys.ArrowLeft.down).to.be.true;
		expect(keys.ArrowRight.down).to.be.true;
		expect(keys.x.down).to.be.true;
		expect(keys.z.down).to.be.true;
		expect(Object.keys(keys).length).to.be.equal(6);
	})
})