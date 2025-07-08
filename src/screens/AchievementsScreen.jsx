import React, { useEffect, useState } from 'react';
import BadgeRenderer from '../components/BadgeRenderer.jsx';

const AchievementsScreen = () => {
  const [badges, setBadges] = useState({});

  useEffect(() => {
    fetch('/data/achievements.json')
      .then(res => res.json())
      .then(setBadges);
  }, []);

  return <BadgeRenderer badges={badges} />;
};

export default AchievementsScreen;
