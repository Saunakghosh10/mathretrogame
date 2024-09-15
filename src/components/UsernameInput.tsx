'use client';

import { useState, FormEvent } from 'react';

interface UsernameInputProps {
  onSubmit: (username: string) => void;
}

export default function UsernameInput({ onSubmit }: UsernameInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter username"
        className="bg-green-900 text-green-400 border-2 border-green-400 p-2 mr-2"
      />
      <button type="submit" className="bg-green-400 text-black p-2 hover:bg-green-300">
        Start Game
      </button>
    </form>
  );
}