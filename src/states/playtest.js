const Turret = require('../entities/turret');

let startingPoint;
let endingPoint;
let blocks;
let enemies;
let pathfinder;
let path;
let map;

const turrets = [];
let enemy;
let bullets;

const addTile = function (x, y) {
  const b = blocks.create(x * game.globals.TILE_SIZE, game.globals.TILE_SIZE * (y), 'tiles', 'greenbrick.png');
  b.body.immovable = true;
};


const buildMap = () => {
  const l1 = game.cache.getText(game.globals.LEVEL);
  let rows = l1.split('\r\n');
  if (rows.length === 1) {
    rows = l1.split('\n');
  }
  map = rows.map((row, index) => {
    const newRow = [];
    row.split('').forEach((cell, rowIndex) => {
      if (cell === '#') {
        addTile(rowIndex, index);
        newRow.push(1);
      } else if (cell === 'E') {
        newRow.push(0);
        endingPoint = { x: rowIndex, y: index };
      } else if (cell === 'S') {
        newRow.push(0);
        startingPoint = { x: rowIndex, y: index };
      } else {
        newRow.push(0);
      }
    });
    return newRow;
  });
};

const distanceBetween = (source, target) => {
  const dx = source.x - target.x;
  const dy = source.y - target.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const buildEnemyMove = function (actor) {
  const move = game.add.tween(actor);
  const pathKeys = Object.keys(path);
  pathKeys.forEach((pathNode) => {
    const x = path[pathNode][0] * 16 || path[pathNode].x * 16;
    const y = path[pathNode][1] * 16 || path[pathNode].y * 16;
    move.to({ x, y }, 1800, Phaser.Easing.Linear.None);
  });

  if (actor.activeTween != null) {
      //console.log('activeTween');
      actor.activeTween.stop();
    // create a new tween
  }
  actor.activeTween = move;
  actor.activeTween.start();
}
const releaseTheHounds = function () {
  enemy = enemies.getFirstExists(false);
  enemy.reset(startingPoint.x * game.globals.TILE_SIZE, startingPoint.y * game.globals.TILE_SIZE);
  enemy.hp = 24;
  buildEnemyMove(enemy);
}
const preparePath = () => {
  pathfinder.setCallbackFunction((fpath)  => {
    path = fpath || [];
    //releaseTheHounds();
    game.time.events.repeat(Phaser.Timer.SECOND * 7, 4, releaseTheHounds, this);
  });
  pathfinder.preparePathCalculation([startingPoint.x, startingPoint.y], [endingPoint.x, endingPoint.y]);
  try {
    pathfinder.calculatePath();
  } catch (e) {
    console.error('error calculating path', e);
  }
};



module.exports = {
  create() {
    blocks = game.add.group();
    blocks.enableBody = true;
    blocks.physicsBodyType = Phaser.Physics.ARCADE;
    buildMap();
    var walkables = [0];
    pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
    pathfinder.setGrid(map, walkables);
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(6, 'shot');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    enemies.createMultiple(4, 'footman');
    enemies.setAll('outOfBoundsKill', true);
    enemies.setAll('checkWorldBounds', true);

    preparePath();
    turrets.push(new Turret(4, 4, bullets));
    turrets.push(new Turret(1, 5, bullets));
    turrets.push(new Turret(5, 7, bullets));
    turrets.push(new Turret(8, 5, bullets));
  },
  update() {
    game.physics.arcade.overlap(bullets, enemies, (b, e) => {
      b.kill();
      e.hp -= 1;
      if (e.hp <= 0) {
        e.kill();
      }
    }, null, this);
    enemies.forEach((each) => {
      turrets.forEach((turret) => {
        if (distanceBetween(turret.base, each) < 30) {
          turret.track(each);
        }
      });
    });
    turrets.forEach(turret => turret.update());
  }
};
