import { useState, useCallback, useRef, useEffect } from 'react';
import { Chess, type Square, type Move as ChessMove } from 'chess.js';
import type { Difficulty, Move } from '@/types';

// ─── Piece-square tables for positional bonuses ───────────────────────────────
// Values are from White's perspective; flipped for Black.

const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Pawn table (rank 0 = rank 1 for white)
const PAWN_TABLE = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5,  5,  10, 25, 25, 10,  5,  5],
  [0,  0,  0,  20, 20,  0,  0,  0],
  [5, -5, -10,  0,  0,-10, -5,  5],
  [5, 10,  10,-20,-20, 10, 10,  5],
  [0,  0,  0,  0,  0,  0,  0,  0],
];

const KNIGHT_TABLE = [
  [-50,-40,-30,-30,-30,-30,-40,-50],
  [-40,-20,  0,  0,  0,  0,-20,-40],
  [-30,  0, 10, 15, 15, 10,  0,-30],
  [-30,  5, 15, 20, 20, 15,  5,-30],
  [-30,  0, 15, 20, 20, 15,  0,-30],
  [-30,  5, 10, 15, 15, 10,  5,-30],
  [-40,-20,  0,  5,  5,  0,-20,-40],
  [-50,-40,-30,-30,-30,-30,-40,-50],
];

const BISHOP_TABLE = [
  [-20,-10,-10,-10,-10,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5, 10, 10,  5,  0,-10],
  [-10,  5,  5, 10, 10,  5,  5,-10],
  [-10,  0, 10, 10, 10, 10,  0,-10],
  [-10, 10, 10, 10, 10, 10, 10,-10],
  [-10,  5,  0,  0,  0,  0,  5,-10],
  [-20,-10,-10,-10,-10,-10,-10,-20],
];

const ROOK_TABLE = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [5, 10, 10, 10, 10, 10, 10,  5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [0,  0,  0,  5,  5,  0,  0,  0],
];

const QUEEN_TABLE = [
  [-20,-10,-10, -5, -5,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5,  5,  5,  5,  0,-10],
  [-5,   0,  5,  5,  5,  5,  0, -5],
  [0,    0,  5,  5,  5,  5,  0, -5],
  [-10,  5,  5,  5,  5,  5,  0,-10],
  [-10,  0,  5,  0,  0,  0,  0,-10],
  [-20,-10,-10, -5, -5,-10,-10,-20],
];

const KING_MID_TABLE = [
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-20,-30,-30,-40,-40,-30,-30,-20],
  [-10,-20,-20,-20,-20,-20,-20,-10],
  [20,  20,  0,  0,  0,  0, 20, 20],
  [20,  30, 10,  0,  0, 10, 30, 20],
];

const TABLES: Record<string, number[][]> = {
  p: PAWN_TABLE,
  n: KNIGHT_TABLE,
  b: BISHOP_TABLE,
  r: ROOK_TABLE,
  q: QUEEN_TABLE,
  k: KING_MID_TABLE,
};

// ─── Static evaluation (always from White's perspective) ─────────────────────

const evaluateBoard = (game: Chess): number => {
  if (game.isCheckmate()) {
    // The side to move is in checkmate, so they lost
    return game.turn() === 'w' ? -Infinity : Infinity;
  }
  if (game.isDraw()) return 0;

  let score = 0;
  const board = game.board();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (!piece) continue;

      const baseValue = PIECE_VALUES[piece.type] ?? 0;
      const table = TABLES[piece.type];

      // For White, row 0 is rank 8 (their back rank visually), but
      // piece-square tables are written rank-1→rank-8 from white's view,
      // so white reads bottom-up (7 - row) and black reads top-down (row).
      const tableRow = piece.color === 'w' ? 7 - row : row;
      const tableCol = piece.color === 'w' ? col : 7 - col;
      const positional = table ? table[tableRow][tableCol] : 0;

      const total = baseValue + positional;
      score += piece.color === 'w' ? total : -total;
    }
  }

  return score;
};

// ─── Minimax with alpha-beta (score always from White's perspective) ──────────

const minimax = (
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean, // true = White to move
): number => {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }

  const moves = game.moves({ verbose: true });

  if (isMaximizing) {
    let best = -Infinity;
    for (const move of moves) {
      game.move(move);
      best = Math.max(best, minimax(game, depth - 1, alpha, beta, false));
      game.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of moves) {
      game.move(move);
      best = Math.min(best, minimax(game, depth - 1, alpha, beta, true));
      game.undo();
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
};

// ─── Pick best move ───────────────────────────────────────────────────────────

const getBestMove = (game: Chess, difficulty: Difficulty): Move | null => {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  const depthMap: Record<Difficulty, number> = {
    easy: 1,
    medium: 3,
    hard: 4,
  };

  const depth = depthMap[difficulty];
  const isWhite = game.turn() === 'w';

  // Easy: 50% random, 50% shallow
  if (difficulty === 'easy' && Math.random() < 0.5) {
    const m = moves[Math.floor(Math.random() * moves.length)];
    return { from: m.from, to: m.to, promotion: m.promotion };
  }

  let bestMove: ChessMove = moves[0];
  let bestValue = isWhite ? -Infinity : Infinity;

  for (const move of moves) {
    game.move(move);
    // After the move, the other side is to move, so isMaximizing flips
    const value = minimax(game, depth - 1, -Infinity, Infinity, !isWhite);
    game.undo();

    if (isWhite ? value > bestValue : value < bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }

  return { from: bestMove.from, to: bestMove.to, promotion: bestMove.promotion };
};

// ─── Stockfish (hard mode only) ───────────────────────────────────────────────

const getStockfishWorkerUrl = () => {
  const baseUrl = new URL(import.meta.env.BASE_URL, window.location.href);
  const scriptUrl = new URL('stockfish/stockfish.js', baseUrl);
  const wasmUrl = new URL('stockfish/stockfish.wasm', baseUrl);
  scriptUrl.hash = wasmUrl.toString();
  return scriptUrl;
};

const uciToMove = (uciMove: string): Move | null => {
  if (!/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(uciMove)) return null;
  return { from: uciMove.slice(0, 2), to: uciMove.slice(2, 4), promotion: uciMove[4] };
};

const getStockfishMove = (game: Chess): Promise<Move | null> => {
  return new Promise((resolve) => {
    if (typeof Worker === 'undefined') { resolve(null); return; }

    const worker = new Worker(getStockfishWorkerUrl());
    let resolved = false;

    const cleanup = (move: Move | null) => {
      if (resolved) return;
      resolved = true;
      worker.terminate();
      resolve(move);
    };

    const timeoutId = window.setTimeout(() => cleanup(null), 6000);

    worker.onmessage = (event: MessageEvent<string>) => {
      const line = event.data;
      if (line === 'uciok') {
        worker.postMessage('setoption name Skill Level value 20');
        worker.postMessage('setoption name UCI_LimitStrength value false');
        worker.postMessage('isready');
        return;
      }
      if (line === 'readyok') {
        worker.postMessage(`position fen ${game.fen()}`);
        worker.postMessage('go movetime 1200');
        return;
      }
      if (line.startsWith('bestmove')) {
        window.clearTimeout(timeoutId);
        cleanup(uciToMove(line.split(' ')[1]));
      }
    };

    worker.onerror = () => { window.clearTimeout(timeoutId); cleanup(null); };
    worker.postMessage('uci');
  });
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useChessEngine = (difficulty: Difficulty = 'medium') => {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCheckmate, setIsCheckmate] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [history, setHistory] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [suggestedMove, setSuggestedMove] = useState<Move | null>(null);

  const updateGameState = useCallback(() => {
    const game = gameRef.current;
    setFen(game.fen());
    setIsGameOver(game.isGameOver());
    setIsCheckmate(game.isCheckmate());
    setIsDraw(game.isDraw());
    setTurn(game.turn() as 'w' | 'b');
    setHistory(game.history());
  }, []);

  const makeMove = useCallback((move: Move): boolean => {
    try {
      const result = gameRef.current.move(move);
      if (result) { updateGameState(); return true; }
      return false;
    } catch { return false; }
  }, [updateGameState]);

  const makePlayerMove = useCallback((move: Move): boolean => {
    if (gameRef.current.turn() !== 'w' || isGameOver) return false;
    return makeMove(move);
  }, [makeMove, isGameOver]);

  const makeAIMove = useCallback(async (): Promise<boolean> => {
    if (gameRef.current.turn() !== 'b' || isGameOver) return false;

    setIsThinking(true);
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));

    const bestMove = difficulty === 'hard'
      ? await getStockfishMove(gameRef.current) ?? getBestMove(gameRef.current, difficulty)
      : getBestMove(gameRef.current, difficulty);

    setIsThinking(false);
    if (bestMove) return makeMove(bestMove);
    return false;
  }, [makeMove, difficulty, isGameOver]);

  const getLegalMoves = useCallback((square: string): string[] => {
    const moves = gameRef.current.moves({ square: square as Square, verbose: true });
    return moves.map(m => m.to);
  }, []);

  // Hint uses the same difficulty the player is playing against
  const showSuggestedMove = useCallback(() => {
    const hint = getBestMove(gameRef.current, difficulty);
    setSuggestedMove(hint);
    setTimeout(() => setSuggestedMove(null), 3000);
  }, [difficulty]);

  const resetGame = useCallback(() => {
    gameRef.current.reset();
    updateGameState();
    setSuggestedMove(null);
  }, [updateGameState]);

  const undoMove = useCallback(() => {
    gameRef.current.undo();
    gameRef.current.undo();
    updateGameState();
  }, [updateGameState]);

  useEffect(() => {
    if (turn === 'b' && !isGameOver) {
      makeAIMove();
    }
  }, [turn, isGameOver, makeAIMove]);

  return {
    fen,
    isGameOver,
    isCheckmate,
    isDraw,
    turn,
    history,
    isThinking,
    suggestedMove,
    makePlayerMove,
    makeAIMove,
    getLegalMoves,
    showSuggestedMove,
    resetGame,
    undoMove,
  };
};