// Chess Game Types
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ChessGameState {
  fen: string;
  isGameOver: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  turn: 'w' | 'b';
  history: string[];
}

export interface Move {
  from: string;
  to: string;
  promotion?: string;
}

// Portfolio Types
export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  piece: 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
  size: 'small' | 'medium' | 'large';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'languages';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// App State Types
export interface AppState {
  hasCompletedChessGate: boolean;
  gameResult: 'won' | 'lost' | 'draw' | null;
  difficulty: Difficulty;
}
