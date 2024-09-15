import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

interface LeaderboardEntry {
  username: string;
  score: number;
  mode: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="mt-8 bg-green-900 border-4 border-green-400 rounded-lg p-4 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-yellow-300">
        <FontAwesomeIcon icon={faTrophy} className="mr-2" />
        Leaderboard
      </h2>
      <ul className="space-y-2">
        {entries.map((entry, index) => (
          <li key={index} className="flex justify-between items-center text-green-400">
            <span>{index + 1}. {entry.username}</span>
            <span>{entry.score} ({entry.mode})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}