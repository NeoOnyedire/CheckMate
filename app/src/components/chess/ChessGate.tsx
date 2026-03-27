import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chessboard } from 'react-chessboard';
import { Trophy, Lightbulb, SkipForward, RotateCcw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChessEngine } from '@/hooks/useChessEngine';
import type { Difficulty } from '@/types';

interface ChessGateProps {
  onComplete: (result: 'won' | 'lost' | 'draw' | 'skipped') => void;
}

export const ChessGate = ({ onComplete }: ChessGateProps) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [showDifficultySelect, setShowDifficultySelect] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const {
    fen,
    isGameOver,
    isCheckmate,
    turn,
    isThinking,
    suggestedMove,
    makePlayerMove,
    showSuggestedMove,
    resetGame,
  } = useChessEngine(difficulty);

  // Check game result
  useEffect(() => {
    if (isGameOver) {
      if (isCheckmate) {
        // If checkmate and it's black's turn, white (player) won
        if (turn === 'b') {
          setPlayerWon(true);
        }
      }
    }
  }, [isGameOver, isCheckmate, turn]);

  const handlePieceDrop = ({ sourceSquare, targetSquare }: { piece: { pieceType: string }, sourceSquare: string, targetSquare: string | null }) => {
    if (!targetSquare) return false;
    const move = { from: sourceSquare, to: targetSquare, promotion: 'q' };
    const success = makePlayerMove(move);
    return success;
  };

  const handleStartGame = () => {
    setShowDifficultySelect(false);
    setGameStarted(true);
    setShowIntro(false);
  };

  const handleSkipGame = () => {
    onComplete('skipped');
  };

  const handleEnterPortfolio = () => {
    onComplete('won');
  };

  const handlePlayAgain = () => {
    setPlayerWon(false);
    resetGame();
  };

  // Custom board styles
  const boardStyle = {
    borderRadius: '8px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
  };

  const darkSquareStyle = { backgroundColor: '#b58863' };
  const lightSquareStyle = { backgroundColor: '#f0d9b5' };

  // Convert suggested move to arrow format
  const arrows = suggestedMove ? [{
    startSquare: suggestedMove.from,
    endSquare: suggestedMove.to,
    color: 'rgb(129, 182, 76)',
  }] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex flex-col items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#81b64c]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#b58863]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#81b64c]/5 rounded-full blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center z-10 mb-8"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 gradient-text"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to My Portfolio
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-400 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Neo Onyedire — Building systems, one move at a time
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-[#81b64c]"
            >
              <ChevronDown className="animate-bounce" />
              <span className="text-sm">Make your move to enter</span>
              <ChevronDown className="animate-bounce" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Game Container */}
        <div className="glass-card p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#81b64c] to-[#6a9a3d] rounded-lg flex items-center justify-center">
                <span className="text-xl">♟</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Chess Gate</h2>
                <p className="text-sm text-gray-400">
                  {isGameOver 
                    ? isCheckmate 
                      ? turn === 'b' ? 'Checkmate! You won!' : 'Checkmate! AI won!'
                      : 'Game Over - Draw!'
                    : gameStarted 
                      ? `Your turn (${difficulty})` 
                      : 'Select difficulty to begin'}
                </p>
              </div>
            </div>

            {gameStarted && !isGameOver && (
              <div className="flex items-center gap-2">
                {isThinking && (
                  <span className="text-sm text-gray-400 animate-pulse">
                    AI thinking...
                  </span>
                )}
                <div className={`w-3 h-3 rounded-full ${turn === 'w' ? 'bg-[#81b64c]' : 'bg-gray-500'} transition-colors`} />
              </div>
            )}
          </div>

          {/* Difficulty Selection */}
          <AnimatePresence>
            {showDifficultySelect && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <p className="text-sm text-gray-400 mb-3 text-center">Choose your difficulty:</p>
                <div className="flex justify-center gap-3">
                  {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                        difficulty === diff
                          ? 'bg-[#81b64c] text-white shadow-[0_0_15px_rgba(129,182,76,0.4)]'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chess Board */}
          <div className="relative flex justify-center">
            <Chessboard
              options={{
                position: fen,
                onPieceDrop: handlePieceDrop,
                boardStyle,
                darkSquareStyle,
                lightSquareStyle,
                allowDrawingArrows: true,
                arrows,
              }}
            />

            {/* Suggested Move Indicator */}
            <AnimatePresence>
              {suggestedMove && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#81b64c] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
                >
                  Suggested: {suggestedMove.from} → {suggestedMove.to}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {!gameStarted ? (
              <>
                <Button
                  onClick={handleStartGame}
                  className="btn-chess flex items-center gap-2"
                >
                  <span className="text-lg">♟</span>
                  Start Game
                </Button>
                <Button
                  onClick={handleSkipGame}
                  variant="outline"
                  className="btn-chess-outline flex items-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip Game
                </Button>
              </>
            ) : playerWon ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-4"
                >
                  <Button
                    onClick={handleEnterPortfolio}
                    className="btn-chess flex items-center gap-2 bg-gradient-to-r from-[#81b64c] to-[#b58863]"
                  >
                    <Trophy className="w-4 h-4" />
                    Enter Portfolio
                  </Button>
                  <Button
                    onClick={handlePlayAgain}
                    variant="outline"
                    className="btn-chess-outline flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                  </Button>
                </motion.div>
              </>
            ) : isGameOver ? (
              <>
                <Button
                  onClick={resetGame}
                  className="btn-chess flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button
                  onClick={handleSkipGame}
                  variant="outline"
                  className="btn-chess-outline flex items-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip to Portfolio
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={showSuggestedMove}
                  variant="outline"
                  className="flex items-center gap-2 bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <Lightbulb className="w-4 h-4" />
                  Show Hint
                </Button>
                <Button
                  onClick={handleSkipGame}
                  variant="outline"
                  className="flex items-center gap-2 bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip
                </Button>
              </>
            )}
          </div>

          {/* Instructions */}
          {!gameStarted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-white/5 rounded-lg"
            >
              <h3 className="text-sm font-semibold text-[#81b64c] mb-2">How to enter:</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Play as White and win the game to unlock the portfolio</li>
                <li>• Use &quot;Show Hint&quot; for suggested moves</li>
                <li>• Or skip the game to enter directly</li>
              </ul>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center text-gray-500 text-sm"
      >
        <p>Built with React, TypeScript & chess.js</p>
      </motion.div>
    </div>
  );
};
