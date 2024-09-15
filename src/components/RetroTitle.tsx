import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

export default function RetroTitle() {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold mb-2">Retro Math Challenge</h1>
      <FontAwesomeIcon icon={faCalculator} size="3x" className="text-green-400" />
    </div>
  );
}