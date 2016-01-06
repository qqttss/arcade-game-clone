var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 707;
    canvas.height = 650;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
//        playerLife.update();
    }

    function render() {
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/stone-block.png',   // Row 1 of 2 of stone
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 7,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
        gem.render();
        gem.reset();
        playerLife.render();
        playerScore.render();
    }

    function reset() {
        // noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Heart.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Star.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);