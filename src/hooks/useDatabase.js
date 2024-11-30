import { useState, useEffect } from 'react';
import { DatabaseService } from '../db/services';

export const useDatabase = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeDb = async () => {
      try {
        const connected = await DatabaseService.initialize();
        setIsConnected(connected);
        if (connected) {
          const healthStatus = await DatabaseService.healthCheck();
          setHealth(healthStatus);
        }
      } catch (err) {
        setError(err.message);
        setIsConnected(false);
      }
    };

    initializeDb();
  }, []);

  return { isConnected, health, error };
};