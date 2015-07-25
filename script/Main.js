//
// tmlib.js起動
// 小松
//

tm.main(function() {
    app = tm.app.CanvasApp("#app");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.fitWindow();
    app.fps = FPS;
    app.language = DEFAULT_LANGUAGE;
    app.background = LOADING_RGB;
    var loadingScene = tm.game.LoadingScene({
        assets : ASSETS,
        nextScene : ComposeScene,                          
        width : SCREEN_WIDTH,                           
        height : SCREEN_HEIGHT,
    });
    app.replaceScene(loadingScene);
    app.run();
});