const Phaser = require('phaser-ce');

module.exports = {
  init() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.stage.backgroundColor = '#cccccc';
  },
  preload() {
    this.load.image('loading', 'assets/loading.png');
    this.load.image('load_progress_bar', 'assets/progress_bar_bg.png');
    this.load.image('load_progress_bar_dark', 'assets/progress_bar_fg.png');
  },
  create() {
    this.state.start('load');
  }
};
