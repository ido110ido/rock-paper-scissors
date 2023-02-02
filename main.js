var rules = document.getElementById("rules");
var closeRules = document.getElementById("close");
var pickAType = document.getElementById("pickAType");
var paper = document.getElementById("paper");
var scissors = document.getElementById("scissors");
var rock = document.getElementById("rock");
var youWin = document.getElementById("youWin");
var playAgain = document.getElementById("playAgain");
var scoreCounter = document.getElementById("scoreCounter");
var scorePoint = JSON.parse(localStorage.getItem("score")) || 0;
scoreCounter === null || scoreCounter === void 0 ? void 0 : scoreCounter.innerText = scorePoint;
var presentResult = document.getElementById("presentResult");
//result components
var resultAnimated = document.getElementById("resultAnimated");
var youWinTitleAndButton = document.getElementById("youWin");
var uPicked = document.getElementById("uPicked");
var computerPick = document.getElementById("computerPick");
//present rulse
var popUpRules = document.getElementById("popUpRulesShadow");
rules === null || rules === void 0 ? void 0 : rules.addEventListener("click", function () {
    popUpRules.style.display = "flex";
});
closeRules === null || closeRules === void 0 ? void 0 : closeRules.addEventListener("click", function () {
    popUpRules.style.display = "none";
});
var GamePiece;
(function (GamePiece) {
    GamePiece["rock"] = "rock";
    GamePiece["paper"] = "paper";
    GamePiece["scissors"] = "scissors";
})(GamePiece || (GamePiece = {}));
//chosing a type
paper === null || paper === void 0 ? void 0 : paper.addEventListener("click", function () {
    animatedResult({ name: GamePiece.paper, canWin: [GamePiece.rock] });
    console.log(GamePiece.paper);
});
scissors === null || scissors === void 0 ? void 0 : scissors.addEventListener("click", function () {
    animatedResult({ name: GamePiece.scissors, canWin: [GamePiece.paper] });
    console.log(GamePiece.scissors);
});
rock === null || rock === void 0 ? void 0 : rock.addEventListener("click", function () {
    animatedResult({ name: GamePiece.rock, canWin: [GamePiece.scissors] });
    console.log(GamePiece.rock);
});
playAgain === null || playAgain === void 0 ? void 0 : playAgain.addEventListener("click", function () {
    window.location.reload();
});
var animatedResult = function (userSelect) {
    pickAType === null || pickAType === void 0 ? void 0 : pickAType.style.display = "none";
    resultAnimated === null || resultAnimated === void 0 ? void 0 : resultAnimated.style.display = "flex";
    var title = document.createElement("h3");
    title.innerText = "You Picked";
    var selectedAvatar = document.createElement("div");
    selectedAvatar.className = "circle ".concat(userSelect.name, " avatar");
    var imegeAvatar = document.createElement("img");
    imegeAvatar.src = "./images/icon-".concat(userSelect.name, ".svg");
    selectedAvatar.appendChild(imegeAvatar);
    uPicked === null || uPicked === void 0 ? void 0 : uPicked.appendChild(title);
    uPicked === null || uPicked === void 0 ? void 0 : uPicked.appendChild(selectedAvatar);
    console.log(cheackWinner(userSelect, computerPicker()));
    computerPick === null || computerPick === void 0 ? void 0 : computerPick.className = "emptyAvatar";
    var computer = computerPicker();
    setTimeout(function () {
        var imegeComputer = document.createElement("img");
        imegeComputer.src = "./images/icon-".concat(computer, ".svg");
        computerPick === null || computerPick === void 0 ? void 0 : computerPick.className = "circle ".concat(computer, " avatar");
        computerPick === null || computerPick === void 0 ? void 0 : computerPick.appendChild(imegeComputer);
        setTimeout(function () {
            youWin === null || youWin === void 0 ? void 0 : youWin.style.display = "flex";
            presentResult === null || presentResult === void 0 ? void 0 : presentResult.innerText = textResult(userSelect, computer);
        }, 1000);
    }, 1000);
};
//computer select random
var computerPicker = function () {
    var randomNum = Math.floor(Math.random() * Object.keys(GamePiece).length);
    var e = Object.values(GamePiece)[randomNum];
    return GamePiece[e];
};
//cheack if user wins
var cheackWinner = function (userSelect, computerSelect) {
    var result = userSelect.canWin.reduce(function (result, crr) { return (crr === computerSelect ? true : result); }, false);
    return result;
};
var textResult = function (userSelect, computer) {
    if (computer === userSelect.name) {
        return " IT'S A TIE";
    }
    if (cheackWinner(userSelect, computer)) {
        scorePoint++;
        scoreCounter === null || scoreCounter === void 0 ? void 0 : scoreCounter.innerText = scorePoint;
        localStorage.setItem("score", JSON.stringify(scorePoint));
        return "YOU WIN";
    }
    if (scorePoint > 0) {
        scorePoint--;
        scoreCounter === null || scoreCounter === void 0 ? void 0 : scoreCounter.innerText = scorePoint;
        localStorage.setItem("score", JSON.stringify(scorePoint));
    }
    return "HOUSE WIN";
};
