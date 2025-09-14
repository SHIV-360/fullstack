
'use client';

import { useAuth } from '@/context/auth-context';
import {
  ProfileHeader,
  QuickStats,
  LearningProgress,
  SkillsAssessment,
  Achievements,
} from './components';
import { ActivityFeed } from '../components/dashboard-cards';

export default function ProfilePage() {
  const { user, userData, loading } = useAuth();

  if (loading || !user || !userData) {
    return null; // Or a loading skeleton
  }

  // Data for a new user profile
  const newProfileData = {
    stats: {
      level: 1,
      xp: 0,
      completed: 0,
      streak: 0,
    },
    learningProgress: {
      overall: 0,
    },
    skills: [],
    achievements: [],
  };

  return (
    <div className="space-y-8">
      <ProfileHeader user={user} userData={userData} />
      <QuickStats stats={newProfileData.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <LearningProgress progress={newProfileData.learningProgress.overall} />
          <SkillsAssessment skills={newProfileData.skills} />
        </div>
        <div className="space-y-8">
          <Achievements achievements={newProfileData.achievements} />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
