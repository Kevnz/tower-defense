module.exports = {
  loadingLabel() {
    // Here we add a label to let the user know we are loading everything
    // This is the "Loading" phrase in pixel art
    // You can just as easily change it for your own art :)
    this.loading = this.add.sprite(this.world.centerX, this.world.centerY + 20, 'loading');
    this.loading.anchor.setTo(0.5, 0.5);
    // This is the bright blue bar that is hidden by the dark bar
    this.barBg = game.add.sprite(game.world.centerX, game.world.centerY + 40, 'load_progress_bar');
    this.barBg.anchor.setTo(0.5, 0.5);
    // This bar will get cropped by the setPreloadSprite function as the game loads!
    this.bar = game.add.sprite(game.world.centerX - 192, game.world.centerY + 40, 'load_progress_bar_dark');
    this.bar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.bar);
  },
  preload() {
    this.loadingLabel();
    //Add here all the assets that you need to game.load
    this.load.spritesheet('tiles', 'assets/faux_tiles.png', 16, 16);
    this.load.text('level-1', 'assets/levels/1.txt');
    this.load.atlasJSONHash('tiles', 'assets/tiles.png', 'assets/tiles.json');
    this.load.image('footman', 'assets/td-footman.png');
    this.load.image('turret_base', 'assets/turret_base.png');
    this.load.image('turret_top', 'assets/turret_top.png');
    this.load.image('clear', 'assets/tracker.png');
    this.load.image('shot', 'assets/shot.png');
  },
  create() {
    setTimeout(() => {
      this.state.start('menu');
    }, 2000);
  }
};
