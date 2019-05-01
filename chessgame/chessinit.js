var interval = null;

function vPC() {
    clearInterval(interval);
    $("#status").html("White to move");
    var game = new Chess();
    // do not pick up pieces if the game is over
    // only pick up pieces for the side to move
    var onDragStart = function (source, piece, position, orientation) {
        if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    };

    var onDrop = function (source, target) {
        // see if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: promotion to queen
        });

        // illegal move
        if (move === null) return 'snapback';
        makeComputerMove(1);
        updateStatus();
    };

    // make a random computer move
    var makeComputerMove = function(computers) {
        if(computers === 1) {
            if(game.turn() === 'b') {
                var moves = game.moves();
                var move = moves[Math.floor(Math.random()*moves.length)];
                game.move(move);
                board.position(game.fen());
            }
        }

        if(computers === 2) {
            var moves = game.moves();
            var move = moves[Math.floor(Math.random()*moves.length)];
            game.move(move);
            board.position(game.fen());
        }
    }

    // update the board position after the piece snap 
    // for castling, en passant, pawn promotion
    var onSnapEnd = function () {
        board.position(game.fen());
    };

    var updateStatus = function () {
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Blue';
        }

        // checkmate?
        if (game.in_checkmate() === true) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }

        // draw?
        else if (game.in_draw() === true) {
            status = 'Game over, drawn position';
        }

        // game still on
        else {
            status = moveColor + ' to move';

            // check?
            if (game.in_check() === true) {
                status += ', ' + moveColor + ' is in check';
            }
        }
        $('#status').html(status);
    }

    // remove grey squares on mouse out
    var removeGreySquares = function () {
        $('#board .square-55d63').css('background', '');
    };
    var onMouseoutSquare = function (square, piece) {
        removeGreySquares();
    };

    // highlight legal moves
    var greySquare = function (square) {
        var squareEl = $('#board .square-' + square);

        var background = '#696969';
        if (squareEl.hasClass('black-3c85d') === true) {
            background = '#a9a9a9';
        }

        squareEl.css('background', background);
    };
    var onMouseoverSquare = function (square) {
        var moves = game.moves({
            square: square,
            verbose: true
        });
        for (var i = 0; i < moves.length; i++) {
            greySquare(moves[i].to);
        }
    }

    var cfg = {
        draggable: true,
        showNotation: true,
        boardTheme: ['#EFEFEF', '#FFFFFF'],
        position: 'start',
        pieceTheme: 'https://raw.githubusercontent.com/jbkunst/chessboardjs-themes/master/chesspieces/metro/{piece}.png',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onSnapEnd: onSnapEnd
    };
    var board = ChessBoard('board', cfg);
}

function v2() {
    clearInterval(interval);
    $("#status").html("White to move");
    var game = new Chess();
    // do not pick up pieces if the game is over
    // only pick up pieces for the side to move
    var onDragStart = function (source, piece, position, orientation) {
        if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    };

    var onDrop = function (source, target) {
        // see if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: promotion to queen
        });

        // illegal move
        if (move === null) return 'snapback';
        makeComputerMove(0);
        updateStatus();
    };

    var makeComputerMove = function(computers) {
        if(computers === 1) {
            if(game.turn() === 'b') {
                var moves = game.moves();
                var move = moves[Math.floor(Math.random()*moves.length)];
                game.move(move);
                board.position(game.fen());
            }
        }

        if(computers === 2) {
            var moves = game.moves();
            var move = moves[Math.floor(Math.random()*moves.length)];
            game.move(move);
            board.position(game.fen());
        }
    }

    // update the board position after the piece snap 
    // for castling, en passant, pawn promotion
    var onSnapEnd = function () {
        board.position(game.fen());
    };

    var updateStatus = function () {
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Blue';
        }

        // checkmate?
        if (game.in_checkmate() === true) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }

        // draw?
        else if (game.in_draw() === true) {
            status = 'Game over, drawn position';
        }

        // game still on
        else {
            status = moveColor + ' to move';

            // check?
            if (game.in_check() === true) {
                status += ', ' + moveColor + ' is in check';
            }
        }
        $('#status').html(status);
    }

    // remove grey squares on mouse out
    var removeGreySquares = function () {
        $('#board .square-55d63').css('background', '');
    };
    var onMouseoutSquare = function (square, piece) {
        removeGreySquares();
    };

    // highlight legal moves
    var greySquare = function (square) {
        var squareEl = $('#board .square-' + square);

        var background = '#696969';
        if (squareEl.hasClass('black-3c85d') === true) {
            background = '#a9a9a9';
        }

        squareEl.css('background', background);
    };
    var onMouseoverSquare = function (square) {
        var moves = game.moves({
            square: square,
            verbose: true
        });
        for (var i = 0; i < moves.length; i++) {
            greySquare(moves[i].to);
        }
    }

    var cfg = {
        draggable: true,
        showNotation: true,
        boardTheme: ['#EFEFEF', '#FFFFFF'],
        position: 'start',
        pieceTheme: 'https://raw.githubusercontent.com/jbkunst/chessboardjs-themes/master/chesspieces/metro/{piece}.png',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onSnapEnd: onSnapEnd
    };
    var board = ChessBoard('board', cfg);
}

function vCC() {
    $("#status").html("White to move");
    var game = new Chess();
    // do not pick up pieces if the game is over
    // only pick up pieces for the side to move
    var onDragStart = function (source, piece, position, orientation) {
        if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    };

    var onDrop = function (source, target) {
        // see if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: promotion to queen
        });

        // illegal move
        if (move === null) return 'snapback';
        updateStatus();
    };

    // make a random computer move
    var makeComputerMove = function(computers) {
        var moves = game.moves();
        if(computers === 1) {
            if(game.turn() === 'b') {
                var move = moves[Math.floor(Math.random()*moves.length)];
                game.move(move);
                updateStatus();
                board.position(game.fen())
            }
        }

        else if(computers === 0) {

        }

        else {
                if(!game.game_over()) {
                    var move = moves[Math.floor(Math.random()*moves.length)];
                    game.move(move);
                    updateStatus();
                    board.position(game.fen())
                }
        }
        ;
    }
    
    // update the board position after the piece snap 
    // for castling, en passant, pawn promotion
    var onSnapEnd = function () {
        board.position(game.fen());
    };

    var updateStatus = function () {
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Blue';
        }

        // checkmate?
        if (game.in_checkmate() === true) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }

        // draw?
        else if (game.in_draw() === true) {
            status = 'Game over, drawn position';
        }

        // game still on
        else {
            status = moveColor + ' to move';

            // check?
            if (game.in_check() === true) {
                status += ', ' + moveColor + ' is in check';
            }
        }
        $('#status').html(status);
    }

    // remove grey squares on mouse out
    var removeGreySquares = function () {
        $('#board .square-55d63').css('background', '');
    };
    var onMouseoutSquare = function (square, piece) {
        removeGreySquares();
    };

    // highlight legal moves
    var greySquare = function (square) {
        var squareEl = $('#board .square-' + square);

        var background = '#696969';
        if (squareEl.hasClass('black-3c85d') === true) {
            background = '#a9a9a9';
        }

        squareEl.css('background', background);
    };
    var onMouseoverSquare = function (square) {
        var moves = game.moves({
            square: square,
            verbose: true
        });
        for (var i = 0; i < moves.length; i++) {
            greySquare(moves[i].to);
        }
    }

    var cfg = {
        draggable: true,
        showNotation: true,
        boardTheme: ['#EFEFEF', '#FFFFFF'],
        position: 'start',
        pieceTheme: 'https://raw.githubusercontent.com/jbkunst/chessboardjs-themes/master/chesspieces/metro/{piece}.png',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onSnapEnd: onSnapEnd
    };
    var board = ChessBoard('board', cfg);
    interval = window.setInterval(makeComputerMove, 400);
}