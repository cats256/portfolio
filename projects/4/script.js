function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomNumber = Math.floor(Math.random() * 3);

  return choices[randomNumber];
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();

  if (playerSelection === computerSelection) {
    return "It's a tie";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore++;
    return `You win! ${playerSelection} beats ${computerSelection}`;
  } else {
    computerScore++;
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  }
}

function game() {
  window.playerScore = 0;
  window.computerScore = 0;

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const computerChoice = getComputerChoice();
      const result = playRound(button.id, computerChoice);

      document.querySelector("#player-score").textContent = playerScore;
      document.querySelector("#computer-score").textContent = computerScore;

      console.log(computerChoice);

      if (playerScore === 5) {
        document.querySelector(
          "#output"
        ).textContent = `The computer chose ${computerChoice}. You won the game!`;
        playerScore = 0;
        computerScore = 0;
      } else if (computerScore === 5) {
        document.querySelector(
          "#output"
        ).textContent = `The computer chose ${computerChoice}. You lost the game!`;
        playerScore = 0;
        computerScore = 0;
      } else if (result.includes("win")) {
        document.querySelector(
          "#output"
        ).textContent = `The computer chose ${computerChoice}. You won the round`;
      } else if (result.includes("lose")) {
        document.querySelector(
          "#output"
        ).textContent = `The computer chose ${computerChoice}. You lost the round`;
      } else {
        document.querySelector(
          "#output"
        ).textContent = `The computer chose ${computerChoice}. It's a tie`;
      }
    });
  });
}

game();
