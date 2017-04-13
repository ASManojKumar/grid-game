'use strict';

function Grid(title) {
    this.title = title;
    this.flipped = false;
}

Grid.prototype.flip = function() {
    this.flipped = !this.flipped;
}

var totalScore = 20;

function Game(tileName) {
    var tileDeck = createDeck(tileName);

    this.grid = createGrid(tileDeck);
    this.unmatchedPairs = tileName.length;

    this.flipTile = function(tile) {
        if (tile.flipped) {
            return;
        }

        tile.flip();

        if (!this.firstPick || this.secondPick) {

            if (this.secondPick) {
                this.firstPick.flip();
                this.secondPick.flip();
                this.firstPick = this.secondPick = undefined;
            }

            this.firstPick = tile;

        } else {

            if (this.firstPick.title === tile.title) {
                this.unmatchedPairs--;
                this.message = (this.unmatchedPairs > 0) ? Game.MESSAGE_MATCH : Game.winning_msg;
                this.firstPick = this.secondPick = undefined;
                this.newValue = totalScore += 10;
            } else {
                this.secondPick = tile;
            }
        }
    }
}

Game.winning_msg = 'You won';

function createDeck(tileName) {
    var tileDeck = [];
    tileName.forEach(function(name) {
        tileDeck.push(new Grid(name));
        tileDeck.push(new Grid(name));
    });

    return tileDeck;
}

function createGrid(tileDeck) {
    var gridSize = Math.sqrt(tileDeck.length),
        grid = [];
    for (var row = 0; row < gridSize; row++) {
        grid[row] = [];
        for (var col = 0; col < gridSize; col++) {
            grid[row][col] = removeTile(tileDeck);
        }
    }
    return grid;
}

function removeTile(tileDeck) {
    var i = Math.floor(Math.random() * tileDeck.length);
    return tileDeck.splice(i, 1)[0];
}
