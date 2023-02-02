const rules = document.getElementById("rules") as HTMLElement | null;
const closeRules = document.getElementById("close") as HTMLElement | null;
//gamepieces**********************************************************************
const pickAType = document.getElementById("pickAType") as HTMLElement | null;
const paper = document.getElementById("paper") as HTMLElement | null;
const scissors = document.getElementById("scissors") as HTMLElement | null;
const rock = document.getElementById("rock") as HTMLElement | null;
const lizar = document.getElementById("lizard") as HTMLElement | null;
const spock = document.getElementById("spock") as HTMLElement | null;
//*************************************************************************** *
const youWin = document.getElementById("youWin") as HTMLElement | null;
const playAgain = document.getElementById("playAgain") as HTMLElement | null;
const scoreCounter = document.getElementById(
  "scoreCounter"
) as HTMLElement | null;
let scorePoint: number = JSON.parse(localStorage.getItem("score")) || 0;
scoreCounter?.innerText = scorePoint;
const presentResult = document.getElementById(
  "presentResult"
) as HTMLElement | null;
//result components
const resultAnimated = document.getElementById(
  "resultAnimated"
) as HTMLElement | null;
const youWinTitleAndButton = document.getElementById(
  "youWin"
) as HTMLElement | null;
const uPicked = document.getElementById("uPicked") as HTMLElement | null;
const computerPick = document.getElementById(
  "computerPick"
) as HTMLElement | null;
//present rulse
const popUpRules = document.getElementById("popUpRulesShadow") as HTMLElement;
rules?.addEventListener("click", () => {
  popUpRules.style.display = "flex";
});
closeRules?.addEventListener("click", () => {
  popUpRules.style.display = "none";
});

//definig the types and lisene to press
enum GamePiece {
  rock = "rock",
  paper = "paper",
  scissors = "scissors",
  lizard = "lizard",
  spock = "spock",
}
interface ITypeOfGamePiece {
  name: GamePiece;
  canWin: GamePiece[];
}
//chosing a type
paper?.addEventListener("click", () => {
  animatedResult({
    name: GamePiece.paper,
    canWin: [GamePiece.rock, GamePiece.spock],
  });
  console.log(GamePiece.paper);
});
scissors?.addEventListener("click", () => {
  animatedResult({
    name: GamePiece.scissors,
    canWin: [GamePiece.paper, GamePiece.lizard],
  });
  console.log(GamePiece.scissors);
});
rock?.addEventListener("click", () => {
  animatedResult({
    name: GamePiece.rock,
    canWin: [GamePiece.scissors, GamePiece.lizard],
  });
  console.log(GamePiece.rock);
});
lizar?.addEventListener("click", () => {
  animatedResult({
    name: GamePiece.lizard,
    canWin: [GamePiece.spock, GamePiece.paper],
  });
  console.log(GamePiece.lizard);
});
spock?.addEventListener("click", () => {
  animatedResult({
    name: GamePiece.spock,
    canWin: [GamePiece.scissors, GamePiece.rock],
  });
  console.log(GamePiece.spock);
});
//press to play again
playAgain?.addEventListener("click", () => {
  window.location.reload();
});
//present result in an animated way
const animatedResult = (userSelect: ITypeOfGamePiece) => {
  pickAType?.style.display = "none";
  resultAnimated?.style.display = "flex";
  let title: HTMLElement = document.createElement("h3");
  title.innerText = "You Picked";
  let selectedAvatar: HTMLDivElement = document.createElement("div");
  selectedAvatar.className = `circleResult ${userSelect.name} avatar`;
  let imegeAvatar: HTMLImageElement = document.createElement("img");
  imegeAvatar.src = `./images/icon-${userSelect.name}.svg`;
  selectedAvatar.appendChild(imegeAvatar);
  uPicked?.appendChild(title);
  uPicked?.appendChild(selectedAvatar);
  console.log(cheackWinner(userSelect, computerPicker()));
  computerPick?.className = "emptyAvatar";
  const computer: GamePiece = computerPicker();
  setTimeout(() => {
    let imegeComputer: HTMLImageElement = document.createElement("img");
    imegeComputer.src = `./images/icon-${computer}.svg`;
    computerPick?.className = `circleResult ${computer} avatar`;
    computerPick?.appendChild(imegeComputer);
    setTimeout(() => {
      if (window.outerWidth > 600) {
        resultAnimated?.style.gap = "20vw";
      }
      youWin?.style.display = "flex";
      presentResult?.innerText = textResult(userSelect, computer);
    }, 1000);
  }, 1000);
};
//computer select random
const computerPicker = (): GamePiece => {
  let randomNum: number = Math.floor(
    Math.random() * Object.keys(GamePiece).length
  );
  let e: string = Object.values(GamePiece)[randomNum];
  console.log(`computer selected: ${e}`);

  return GamePiece[e];
};
//cheack if user wins
const cheackWinner = (
  userSelect: ITypeOfGamePiece,
  computerSelect: GamePiece
): boolean => {
  let result: boolean = userSelect.canWin.reduce(
    (result, crr) => (crr === computerSelect ? true : result),
    false
  );
  return result;
};
//write how win to the screen and updat result counter
const textResult = (
  userSelect: ITypeOfGamePiece,
  computer: GamePiece
): string => {
  if (computer === userSelect.name) {
    return " IT'S A TIE";
  }
  if (cheackWinner(userSelect, computer)) {
    scorePoint++;
    scoreCounter?.innerText = scorePoint;
    localStorage.setItem("score", JSON.stringify(scorePoint));
    return "YOU WIN";
  }
  if (scorePoint > 0) {
    scorePoint--;
    scoreCounter?.innerText = scorePoint;
    localStorage.setItem("score", JSON.stringify(scorePoint));
  }
  return "HOUSE WIN";
};
