const rules = document.getElementById("rules") as HTMLElement | null;
const closeRules = document.getElementById("close") as HTMLElement | null;

const pickAType = document.getElementById("pickAType") as HTMLElement | null;
const paper = document.getElementById("paper") as HTMLElement | null;
const scissors = document.getElementById("scissors") as HTMLElement | null;
const rock = document.getElementById("rock") as HTMLElement | null;

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
enum GamePiece {
  rock = "rock",
  paper = "paper",
  scissors = "scissors",
}
interface ITypeOfGamePiece {
  name: GamePiece;
  canWin: GamePiece[];
}
//chosing a type
paper?.addEventListener("click", () => {
  animatedResult({ name: GamePiece.paper, canWin: [GamePiece.rock] });
  console.log(GamePiece.paper);
});
scissors?.addEventListener("click", () => {
  animatedResult({ name: GamePiece.scissors, canWin: [GamePiece.paper] });
  console.log(GamePiece.scissors);
});
rock?.addEventListener("click", () => {
  animatedResult({ name: GamePiece.rock, canWin: [GamePiece.scissors] });
  console.log(GamePiece.rock);
});
playAgain?.addEventListener("click", () => {
  window.location.reload();
});
const animatedResult = (userSelect: ITypeOfGamePiece) => {
  pickAType?.style.display = "none";
  resultAnimated?.style.display = "flex";
  let title: HTMLElement = document.createElement("h3");
  title.innerText = "You Picked";
  let selectedAvatar: HTMLDivElement = document.createElement("div");
  selectedAvatar.className = `circle ${userSelect.name} avatar`;
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
    computerPick?.className = `circle ${computer} avatar`;
    computerPick?.appendChild(imegeComputer);
    setTimeout(() => {
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
