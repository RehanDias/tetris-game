import { HighScore } from '../types';

const STORAGE_KEY = 'tetris-high-scores';

export const getHighScores = (): HighScore[] => {
  const scores = localStorage.getItem(STORAGE_KEY);
  return scores ? JSON.parse(scores) : [];
};

export const saveHighScore = (score: HighScore) => {
  const scores = getHighScores();
  scores.push(score);
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 10); // Keep only top 10 scores
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores));
  return topScores;
};

export const isHighScore = (score: number): boolean => {
  const scores = getHighScores();
  return scores.length < 10 || score > scores[scores.length - 1]?.score || false;
};