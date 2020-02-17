const onload = () => {
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    let turnCount = 0;
    let moves = {
        X: [],
        O: []
    }

    const startGame = () => {
        $('.square').on("click", function() {
            if(!$(this).text()) {
                const turn = turnCount % 2 === 0 ? "X" : "O";
                $(this).text(turn);
                moves[turn].push($(this).index());
                if (checkWin(moves[turn], winConditions)) {
                    winMessage(turn);
                } else if (turnCount === 8) {
                    winMessage(null);
                }
                turnCount++;
            } 
        })
    }

    const checkWinCondition = (movesArray, condition) => {
        return condition.every(function (value) {
            return (movesArray.indexOf(value) >= 0);
        });
    }
    
    const checkWin = (movesArray, winConditions) => {
        for (let condition of winConditions) {
            if (checkWinCondition(movesArray, condition)) return true;
        }
        return false;
    }

    const winMessage = (turn) => {
        if (turn) {
            $("#message").text(`Player ${turn} wins!`);
        } else {
            $("#message").text(`Draw`);
        }
        $(".square").off();
    }

    const reset = () =>{
        turnCount = 0;
        moves = {
            X: [],
            O: []
        }
        $(".square").empty();
        $('#message').empty();
        $('.square').off();
        startGame();
    }

    startGame();
    $('button').click(reset);
}

$(onload); 