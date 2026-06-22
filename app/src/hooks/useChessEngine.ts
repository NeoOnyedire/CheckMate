import { useState, useCallback, useRef, useEffect } from 'react';
import { Chess, type Square, type Move as ChessMove } from 'chess.js';
import type { Difficulty, Move } from '@/types';

// Simple evaluation function for the AI
const evaluateBoard = (game: Chess): number => {
  const pieceValues: { [key: string]: number } = {
    p: 10,
    n: 30,
    b: 30,
    r: 50,
    q: 90,
    k: 900,
  };

  let score = 0;
  const board = game.board();

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const value = pieceValues[piece.type] || 0;
        score += piece.color === 'w' ? value : -value;
      }
    }
  }

  return game.turn() === 'w' ? score : -score;
};

// Minimax algorithm with alpha-beta pruning
const minimax = (
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
): number => {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }

  const moves = game.moves({ verbose: true });

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evalScore = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evalScore = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

// Get best move for AI
const getBestMove = (game: Chess, difficulty: Difficulty): Move | null => {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  // Difficulty determines search depth and randomness
  const depthMap: { [key in Difficulty]: number } = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  const depth = depthMap[difficulty];
  let bestMove: ChessMove = moves[0];
  let bestValue = -Infinity;

  // For easy difficulty, add some randomness
  if (difficulty === 'easy' && Math.random() < 0.4) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return {
      from: randomMove.from,
      to: randomMove.to,
      promotion: randomMove.promotion,
    };
  }

  for (const move of moves) {
    game.move(move);
    const moveValue = minimax(game, depth - 1, -Infinity, Infinity, false);
    game.undo();

    if (moveValue > bestValue) {
      bestValue = moveValue;
      bestMove = move;
    }
  }

  return {
    from: bestMove.from,
    to: bestMove.to,
    promotion: bestMove.promotion,
  };
};

const getStockfishWorkerUrl = () => {
  const baseUrl = new URL(import.meta.env.BASE_URL, window.location.href);
  const scriptUrl = new URL('stockfish/stockfish.js', baseUrl);
  const wasmUrl = new URL('stockfish/stockfish.wasm', baseUrl);
  scriptUrl.hash = wasmUrl.toString();
  return scriptUrl;
};

const uciToMove = (uciMove: string): Move | null => {
  if (!/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(uciMove)) return null;

  return {
    from: uciMove.slice(0, 2),
    to: uciMove.slice(2, 4),
    promotion: uciMove[4],
  };
};

const getStockfishMove = (game: Chess): Promise<Move | null> => {
  return new Promise((resolve) => {
    if (typeof Worker === 'undefined') {
      resolve(null);
      return;
    }

    const worker = new Worker(getStockfishWorkerUrl());
    let isResolved = false;

    const cleanup = (move: Move | null) => {
      if (isResolved) return;
      isResolved = true;
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

    worker.onerror = () => {
      window.clearTimeout(timeoutId);
      cleanup(null);
    };

    worker.postMessage('uci');
  });
};

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
      if (result) {
        updateGameState();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [updateGameState]);

  const makePlayerMove = useCallback((move: Move): boolean => {
    if (gameRef.current.turn() !== 'w' || isGameOver) return false;
    return makeMove(move);
  }, [makeMove, isGameOver]);

  const makeAIMove = useCallback(async (): Promise<boolean> => {
    if (gameRef.current.turn() !== 'b' || isGameOver) return false;
    
    setIsThinking(true);
    
    // Add a small delay to make it feel more natural
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
    
    const bestMove = difficulty === 'hard'
      ? await getStockfishMove(gameRef.current) ?? getBestMove(gameRef.current, difficulty)
      : getBestMove(gameRef.current, difficulty);
    
    setIsThinking(false);
    
    if (bestMove) {
      return makeMove(bestMove);
    }
    return false;
  }, [makeMove, difficulty, isGameOver]);

  const getLegalMoves = useCallback((square: string): string[] => {
    const moves = gameRef.current.moves({ square: square as Square, verbose: true });
    return moves.map(move => move.to);
  }, []);

  const showSuggestedMove = useCallback(() => {
    const bestMove = getBestMove(gameRef.current, 'easy');
    setSuggestedMove(bestMove);
    
    // Clear suggestion after 3 seconds
    setTimeout(() => setSuggestedMove(null), 3000);
  }, []);

  const resetGame = useCallback(() => {
    gameRef.current.reset();
    updateGameState();
    setSuggestedMove(null);
  }, [updateGameState]);

  const undoMove = useCallback(() => {
    gameRef.current.undo();
    gameRef.current.undo(); // Undo both player and AI move
    updateGameState();
  }, [updateGameState]);

  // Auto-play AI move when it's black's turn
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
