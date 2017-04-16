class Turret {
  constructor(x, y, bullets) {
    const halfTile = game.globals.TILE_SIZE / 2;
    this.base = game.add.sprite(x* game.globals.TILE_SIZE, y* game.globals.TILE_SIZE,  'turret_base');
    this.gun = game.add.sprite((x + 0.5) * game.globals.TILE_SIZE, (y + 0.5) * game.globals.TILE_SIZE, 'turret_top');
    this.radar = game.add.sprite((x * game.globals.TILE_SIZE) + halfTile, y * game.globals.TILE_SIZE + halfTile, 'clear');
    this.radar.anchor.set(0.5, 0.5);
    this.gun.anchor.set(0.5, 0.5);
    this.bullets = bullets;
    this.bulletTime = 0;
  }
  get base() {
    return this._base;
  }
  set base(value) {
    this._base = value;
  }
  get gun() {
    return this._gun;
  }
  set gun(value) {
    this._gun = value;
  }
  get bulletTime() {
    return this._bulletTime;
  }
  set bulletTime(value) {
    this._bulletTime = value;
  }
  fire() {
    if (game.time.now > this.bulletTime && this.target.alive) {
      //  Grab the first bullet we can from the pool
      const bullet = this.bullets.getFirstExists(false);
      if (bullet) {
        //  And fire it
        bullet.reset(this.gun.x+2 , this.gun.y-2 );
        bullet.body.velocity.x = -5;
        bullet.rotation = game.physics.arcade.moveToObject(bullet, this.target );
        this.bulletTime = game.time.now + 800;
      }
    }
  }
  track(target) {
    this.target = target;
  }
  update() {
    // body...
    if (!this.target) {
      return;
    }
    this.gun.rotation = game.physics.arcade.angleBetween(this.gun, this.target);

    if (game.physics.arcade.distanceBetween(this.base, this.target) < 24) {
      this.fire();
    }
  }
}
module.exports = Turret;
