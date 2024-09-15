'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faCheck, faTimes, faRedo, faBolt, faHome } from '@fortawesome/free-solid-svg-icons';

interface GameBoardProps {
  username: string;
  mode: 'easy' | 'moderate' | 'hard' | 'rapid';
  onReturnHome: () => void;  // Add this new prop
}

export default function GameBoard({ username, mode, onReturnHome }: GameBoardProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mode === 'rapid' ? 30 : 60);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    generateQuestion();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode]);

  const generateQuestion = () => {
    let num1, num2, operation;
    switch (mode) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
        operation = '+';
        break;
      case 'moderate':
        num1 = Math.floor(Math.random() * 50);
        num2 = Math.floor(Math.random() * 50);
        operation = Math.random() < 0.5 ? '+' : '-';
        break;
      case 'hard':
      case 'rapid':
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * 100);
        operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        break;
    }
    setQuestion(`${num1} ${operation} ${num2} = ?`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gameOver) return;

    const correctAnswer = eval(question.split('=')[0]);
    const isCorrect = parseInt(answer) === correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback('Correct!');
      if (mode === 'rapid') {
        setTimeLeft((prev) => Math.min(prev + 2, 30)); // Add 2 seconds for correct answer in Rapid Fire mode
      }
    } else {
      setFeedback(`Wrong! The correct answer was ${correctAnswer}`);
      if (mode === 'rapid') {
        setTimeLeft((prev) => Math.max(prev - 2, 0)); // Subtract 2 seconds for wrong answer in Rapid Fire mode
      }
    }

    setAnswer('');
    generateQuestion();

    setTimeout(() => setFeedback(''), 1000);
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(mode === 'rapid' ? 30 : 60);
    setGameOver(false);
    setFeedback('');
    generateQuestion();
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  return (
    <div className="text-center p-8 bg-green-900 border-4 border-green-400 rounded-lg shadow-lg">
      <h2 className="text-3xl mb-4 text-yellow-300">Welcome, {username}!</h2>
      <div className="mb-4 text-xl">
        <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-300" />
        Score: {score}
        <FontAwesomeIcon icon={faBolt} className="ml-4 mr-2 text-yellow-300" />
        High Score: {highScore}
        <FontAwesomeIcon icon={faClock} className="ml-4 mr-2 text-red-400" />
        Time: {timeLeft}s
      </div>
      {!gameOver ? (
        <>
          <div className="text-4xl mb-4 text-white">{question}</div>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-black text-green-400 border-2 border-green-400 p-2 mr-2 text-xl"
              placeholder="Your answer"
              autoFocus
            />
            <button type="submit" className="bg-green-400 text-black p-2 hover:bg-green-300 text-xl">
              Submit
            </button>
          </form>
          {feedback && (
            <div className={`text-2xl mb-4 ${feedback.includes('Correct') ? 'text-green-300' : 'text-red-400'}`}>
              <FontAwesomeIcon icon={feedback.includes('Correct') ? faCheck : faTimes} className="mr-2" />
              {feedback}
            </div>
          )}
        </>
      ) : (
        <div className="text-2xl mb-4 text-red-400">
          Game Over! Your final score: {score}
        </div>
      )}
      {gameOver && (
        <div>
          <button onClick={restartGame} className="bg-yellow-400 text-black p-2 hover:bg-yellow-300 text-xl mr-2">
            <FontAwesomeIcon icon={faRedo} className="mr-2" />
            Play Again
          </button>
          <button onClick={onReturnHome} className="bg-blue-400 text-black p-2 hover:bg-blue-300 text-xl ml-2">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </button>
        </div>
      )}
    </div>
  );
}