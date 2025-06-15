export type ScoreStore = {
    homeGoals: number;
    awayGoals: number;
    addGoal: (team: 'home' | 'away') => void;
    resetScore: () => void;
  };
  