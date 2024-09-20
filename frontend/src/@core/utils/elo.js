
const KFACTOR = 50; // K-factor determines the maximum number of points gained or lost

function calculateElo(winnerElo, loserElo) {
  const expectedScore = (eloA, eloB) => {
    return 1 / (1 + Math.pow(10, (eloB - eloA) / 400));
  };

  // Calculate expected scores
  const winnerExpected = expectedScore(winnerElo, loserElo);
  const loserExpected = expectedScore(loserElo, winnerElo);

  // Calculate new ratings based on the K-factor and actual outcome (1 for winner, 0 for loser)
  const winnerPoints = Math.round(KFACTOR * (1 - winnerExpected));
  const loserPoints = Math.round(KFACTOR * (0 - loserExpected));

  return [winnerPoints, loserPoints];
}

export { calculateElo };
