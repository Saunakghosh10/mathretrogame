import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faUser, faDragon, faBolt } from '@fortawesome/free-solid-svg-icons';

type GameMode = 'easy' | 'moderate' | 'hard' | 'rapid';

interface GameModeSelectorProps {
  onSelect: (mode: GameMode) => void;
}

const modes: { [key: string]: GameMode } = {
  Easy: 'easy',
  Moderate: 'moderate',
  Hard: 'hard',
  Rapid: 'rapid'
};

export default function GameModeSelector({ onSelect }: GameModeSelectorProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-2xl mb-4">Select Mode</h2>
      <div className="flex space-x-4">
        {Object.entries(modes).map(([label, mode]) => (
          <button
            key={label}
            onClick={() => onSelect(mode)}
            className="bg-green-900 text-green-400 p-4 hover:bg-green-800 flex flex-col items-center"
          >
            <FontAwesomeIcon 
              icon={
                label === 'Easy' ? faBaby :
                label === 'Moderate' ? faUser :
                label === 'Hard' ? faDragon :
                faBolt
              }
              size="2x"
              className="mb-2"
            />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
