import { useEffect, useState } from 'react';

import type { ILocation } from '../types';

const LOCATION_PERMISSION_DELAY = 5000; // 5 seconds

function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(
    null
  );

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Browser does not support Geolocation ');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (currentLocation) return;
      getLocation();
    }, LOCATION_PERMISSION_DELAY);
  }, [currentLocation]);

  return currentLocation;
}

export default useCurrentLocation;
