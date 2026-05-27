import { useState } from 'react';
import { getFortune } from "../../services/gemini.js";

export function useFortune() {
  const [category, setCategory] = useState('');
  const [fortune, setFortune] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!category.trim()) return;
    setIsLoading(true);
    setError(null);
    setFortune('');
    try {
      const result = await getFortune(category);
      setFortune(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setCategory('');
    setFortune('');
    setError(null);
  };

  return {
    category,
    setCategory,
    fortune,
    isLoading,
    error,
    handleSubmit,
    reset,
  };
}