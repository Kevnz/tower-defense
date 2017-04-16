const Phaser = require('phaser-ce');

module.exports = {
  init() {
    console.log(game);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.backgroundColor = '#cccccc';
  },
  preload() {
    game.load.image('loading', 'assets/loading.png');
    game.load.image('load_progress_bar', 'assets/progress_bar_bg.png');
    game.load.image('load_progress_bar_dark', 'assets/progress_bar_fg.png');
  },
  create() {
    game.state.start('load');
  }
};
