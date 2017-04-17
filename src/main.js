require('./plugins/pathfinder');

const width = 20 * 64;
const height = 10 * 64;
window.game = new Phaser.Game(width, height, Phaser.AUTO);

game.globals = {
  TILE_SIZE: 64,
  WIDTH: 20,
  HEIGHT: 10,
  LEVEL: 'level-1',
  SCORE: 0
};

game.state.add('playtestz', require('./states/playtest.js'));
game.state.add('playtest', require('./states/placement.js'));
game.state.add('load', require('./states/load.js'));
game.state.add('menu', require('./states/menu.js'));
game.state.add('boot', require('./states/boot.js'));
game.state.start('boot');
