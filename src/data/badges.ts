export type BadgeType = 'streak' | 'sponsored' | 'global' | 'muscle-group' | 'tierscore';
export type BadgeGlow = 'green' | 'bronze' | 'silver' | 'gold' | 'diamond' | 'emerald';

export interface TierOneBadge {
  id: string;
  name: string;
  description: string;
  type: BadgeType;
  glow: BadgeGlow;
  imageUrl: string;
  category: string;
  requirement: string;
  isUnlocked: boolean;
  progress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedDate?: string;
}

// Streak Badges
export const streakBadges: TierOneBadge[] = [
  {
    id: 'streak-7',
    name: '7-Day Warrior',
    description: '7 consecutive workout days',
    type: 'streak',
    glow: 'green',
    imageUrl: '/lovable-uploads/47d449ba-b74f-4254-adcc-6ce8d0c865a5.png',
    category: 'Consistency',
    requirement: 'Log workouts for 7 consecutive days',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-15'
  },
  {
    id: 'streak-50',
    name: '50-Day Champion',
    description: '50 consecutive workout days',
    type: 'streak',
    glow: 'green',
    imageUrl: '/lovable-uploads/933e3d9d-e327-4e42-b904-12415fa75bad.png',
    category: 'Consistency',
    requirement: 'Log workouts for 50 consecutive days',
    isUnlocked: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-02-10'
  },
  {
    id: 'streak-100',
    name: '100-Day Legend',
    description: '100 consecutive workout days',
    type: 'streak',
    glow: 'green',
    imageUrl: '/lovable-uploads/fe1282cf-b9a1-44ca-b828-2c7147bcc107.png',
    category: 'Consistency',
    requirement: 'Log workouts for 100 consecutive days',
    isUnlocked: true,
    progress: 100,
    rarity: 'epic',
    earnedDate: '2024-03-01'
  }
];

// Sponsored Challenge Badges
export const sponsoredBadges: TierOneBadge[] = [
  {
    id: 'gymshark-participant',
    name: 'Gymshark Competitor',
    description: 'Participated in Gymshark Challenge',
    type: 'sponsored',
    glow: 'green',
    imageUrl: '/lovable-uploads/8a2dd7de-7eaa-4fcc-bb34-90a24a4a6ddc.png',
    category: 'Brand Challenges',
    requirement: 'Complete Gymshark Pushup Competition',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-02-01'
  },
  {
    id: 'gymshark-winner',
    name: 'Gymshark Champion',
    description: 'Won Gymshark Challenge',
    type: 'sponsored',
    glow: 'diamond',
    imageUrl: '/lovable-uploads/692bf62e-ddac-4e9d-9109-a40cacc38e5d.png',
    category: 'Brand Challenges',
    requirement: 'Place top 3 in Gymshark Pushup Competition',
    isUnlocked: true,
    progress: 100,
    rarity: 'legendary',
    earnedDate: '2024-02-15'
  }
];

// Global Competition Badges
export const globalBadges: TierOneBadge[] = [
  {
    id: 'global-sprint',
    name: 'Global Sprint Warrior',
    description: 'TierOne Global Sprint participant',
    type: 'global',
    glow: 'diamond',
    imageUrl: '/lovable-uploads/419f2907-7325-49a6-b671-55d02f66a06a.png',
    category: 'Global Events',
    requirement: 'Participate in TierOne Global Sprint Challenge',
    isUnlocked: true,
    progress: 100,
    rarity: 'epic',
    earnedDate: '2024-03-15'
  }
];

// Muscle Group Performance Badges

// Chest Badges
export const chestBadges: TierOneBadge[] = [
  {
    id: 'chest-bronze',
    name: 'Chest Bronze',
    description: 'Score ≥ 60 in Chest',
    type: 'muscle-group',
    glow: 'bronze',
    imageUrl: '/lovable-uploads/65d9305f-1a94-40d2-b250-2f765da7e4c8.png',
    category: 'Chest Performance',
    requirement: 'Achieve 60+ score in Chest',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-10'
  },
  {
    id: 'chest-silver',
    name: 'Chest Silver',
    description: 'Score ≥ 70 in Chest',
    type: 'muscle-group',
    glow: 'silver',
    imageUrl: '/lovable-uploads/9033ee23-3f60-416a-87f0-de1d51f7c5d8.png',
    category: 'Chest Performance',
    requirement: 'Achieve 70+ score in Chest',
    isUnlocked: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-01-20'
  },
  {
    id: 'chest-gold',
    name: 'Chest Gold',
    description: 'Score ≥ 80 in Chest',
    type: 'muscle-group',
    glow: 'gold',
    imageUrl: '/lovable-uploads/7188c940-69c8-4a96-b333-27323f631ad2.png',
    category: 'Chest Performance',
    requirement: 'Achieve 80+ score in Chest',
    isUnlocked: true,
    progress: 100,
    rarity: 'epic',
    earnedDate: '2024-02-25'
  },
  {
    id: 'chest-diamond',
    name: 'Chest Diamond',
    description: 'Score ≥ 90 in Chest',
    type: 'muscle-group',
    glow: 'diamond',
    imageUrl: '/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png',
    category: 'Chest Performance',
    requirement: 'Achieve 90+ score in Chest',
    isUnlocked: false,
    progress: 85,
    rarity: 'legendary'
  }
];

// Back Badges
export const backBadges: TierOneBadge[] = [
  {
    id: 'back-bronze',
    name: 'Back Bronze',
    description: 'Score ≥ 60 in Back',
    type: 'muscle-group',
    glow: 'bronze',
    imageUrl: '/lovable-uploads/65d9305f-1a94-40d2-b250-2f765da7e4c8.png',
    category: 'Back Performance',
    requirement: 'Achieve 60+ score in Back',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-12'
  },
  {
    id: 'back-silver',
    name: 'Back Silver',
    description: 'Score ≥ 70 in Back',
    type: 'muscle-group',
    glow: 'silver',
    imageUrl: '/lovable-uploads/9033ee23-3f60-416a-87f0-de1d51f7c5d8.png',
    category: 'Back Performance',
    requirement: 'Achieve 70+ score in Back',
    isUnlocked: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-01-25'
  },
  {
    id: 'back-gold',
    name: 'Back Gold',
    description: 'Score ≥ 80 in Back',
    type: 'muscle-group',
    glow: 'gold',
    imageUrl: '/lovable-uploads/7188c940-69c8-4a96-b333-27323f631ad2.png',
    category: 'Back Performance',
    requirement: 'Achieve 80+ score in Back',
    isUnlocked: false,
    progress: 75,
    rarity: 'epic'
  },
  {
    id: 'back-diamond',
    name: 'Back Diamond',
    description: 'Score ≥ 90 in Back',
    type: 'muscle-group',
    glow: 'diamond',
    imageUrl: '/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png',
    category: 'Back Performance',
    requirement: 'Achieve 90+ score in Back',
    isUnlocked: false,
    progress: 60,
    rarity: 'legendary'
  }
];

// Shoulders Badges
export const shouldersBadges: TierOneBadge[] = [
  {
    id: 'shoulders-bronze',
    name: 'Shoulders Bronze',
    description: 'Score ≥ 60 in Shoulders',
    type: 'muscle-group',
    glow: 'bronze',
    imageUrl: '/lovable-uploads/65d9305f-1a94-40d2-b250-2f765da7e4c8.png',
    category: 'Shoulders Performance',
    requirement: 'Achieve 60+ score in Shoulders',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-08'
  },
  {
    id: 'shoulders-silver',
    name: 'Shoulders Silver',
    description: 'Score ≥ 70 in Shoulders',
    type: 'muscle-group',
    glow: 'silver',
    imageUrl: '/lovable-uploads/9033ee23-3f60-416a-87f0-de1d51f7c5d8.png',
    category: 'Shoulders Performance',
    requirement: 'Achieve 70+ score in Shoulders',
    isUnlocked: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-01-18'
  },
  {
    id: 'shoulders-gold',
    name: 'Shoulders Gold',
    description: 'Score ≥ 80 in Shoulders',
    type: 'muscle-group',
    glow: 'gold',
    imageUrl: '/lovable-uploads/7188c940-69c8-4a96-b333-27323f631ad2.png',
    category: 'Shoulders Performance',
    requirement: 'Achieve 80+ score in Shoulders',
    isUnlocked: true,
    progress: 100,
    rarity: 'epic',
    earnedDate: '2024-03-05'
  },
  {
    id: 'shoulders-diamond',
    name: 'Shoulders Diamond',
    description: 'Score ≥ 90 in Shoulders',
    type: 'muscle-group',
    glow: 'diamond',
    imageUrl: '/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png',
    category: 'Shoulders Performance',
    requirement: 'Achieve 90+ score in Shoulders',
    isUnlocked: false,
    progress: 82,
    rarity: 'legendary'
  }
];

// Arms Badges
export const armsBadges: TierOneBadge[] = [
  {
    id: 'arms-bronze',
    name: 'Arms Bronze',
    description: 'Score ≥ 60 in Arms',
    type: 'muscle-group',
    glow: 'bronze',
    imageUrl: '/lovable-uploads/65d9305f-1a94-40d2-b250-2f765da7e4c8.png',
    category: 'Arms Performance',
    requirement: 'Achieve 60+ score in Arms',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-05'
  },
  {
    id: 'arms-silver',
    name: 'Arms Silver',
    description: 'Score ≥ 70 in Arms',
    type: 'muscle-group',
    glow: 'silver',
    imageUrl: '/lovable-uploads/9033ee23-3f60-416a-87f0-de1d51f7c5d8.png',
    category: 'Arms Performance',
    requirement: 'Achieve 70+ score in Arms',
    isUnlocked: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-01-22'
  },
  {
    id: 'arms-gold',
    name: 'Arms Gold',
    description: 'Score ≥ 80 in Arms',
    type: 'muscle-group',
    glow: 'gold',
    imageUrl: '/lovable-uploads/7188c940-69c8-4a96-b333-27323f631ad2.png',
    category: 'Arms Performance',
    requirement: 'Achieve 80+ score in Arms',
    isUnlocked: false,
    progress: 78,
    rarity: 'epic'
  },
  {
    id: 'arms-diamond',
    name: 'Arms Diamond',
    description: 'Score ≥ 90 in Arms',
    type: 'muscle-group',
    glow: 'diamond',
    imageUrl: '/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png',
    category: 'Arms Performance',
    requirement: 'Achieve 90+ score in Arms',
    isUnlocked: false,
    progress: 65,
    rarity: 'legendary'
  }
];

// Legs Badges
export const legsBadges: TierOneBadge[] = [
  {
    id: 'legs-bronze',
    name: 'Legs Bronze',
    description: 'Score ≥ 60 in Legs',
    type: 'muscle-group',
    glow: 'bronze',
    imageUrl: '/lovable-uploads/65d9305f-1a94-40d2-b250-2f765da7e4c8.png',
    category: 'Legs Performance',
    requirement: 'Achieve 60+ score in Legs',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-14'
  },
  {
    id: 'legs-silver',
    name: 'Legs Silver',
    description: 'Score ≥ 70 in Legs',
    type: 'muscle-group',
    glow: 'silver',
    imageUrl: '/lovable-uploads/9033ee23-3f60-416a-87f0-de1d51f7c5d8.png',
    category: 'Legs Performance',
    requirement: 'Achieve 70+ score in Legs',
    isUnlocked: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-02-05'
  },
  {
    id: 'legs-gold',
    name: 'Legs Gold',
    description: 'Score ≥ 80 in Legs',
    type: 'muscle-group',
    glow: 'gold',
    imageUrl: '/lovable-uploads/7188c940-69c8-4a96-b333-27323f631ad2.png',
    category: 'Legs Performance',
    requirement: 'Achieve 80+ score in Legs',
    isUnlocked: true,
    progress: 100,
    rarity: 'epic',
    earnedDate: '2024-02-28'
  },
  {
    id: 'legs-diamond',
    name: 'Legs Diamond',
    description: 'Score ≥ 90 in Legs',
    type: 'muscle-group',
    glow: 'diamond',
    imageUrl: '/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png',
    category: 'Legs Performance',
    requirement: 'Achieve 90+ score in Legs',
    isUnlocked: false,
    progress: 88,
    rarity: 'legendary'
  }
];

// Core Badges
export const coreBadges: TierOneBadge[] = [
  {
    id: 'core-bronze',
    name: 'Core Bronze',
    description: 'Score ≥ 60 in Core',
    type: 'muscle-group',
    glow: 'bronze',
    imageUrl: '/lovable-uploads/65d9305f-1a94-40d2-b250-2f765da7e4c8.png',
    category: 'Core Performance',
    requirement: 'Achieve 60+ score in Core',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-16'
  },
  {
    id: 'core-silver',
    name: 'Core Silver',
    description: 'Score ≥ 70 in Core',
    type: 'muscle-group',
    glow: 'silver',
    imageUrl: '/lovable-uploads/9033ee23-3f60-416a-87f0-de1d51f7c5d8.png',
    category: 'Core Performance',
    requirement: 'Achieve 70+ score in Core',
    isUnlocked: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-02-12'
  },
  {
    id: 'core-gold',
    name: 'Core Gold',
    description: 'Score ≥ 80 in Core',
    type: 'muscle-group',
    glow: 'gold',
    imageUrl: '/lovable-uploads/7188c940-69c8-4a96-b333-27323f631ad2.png',
    category: 'Core Performance',
    requirement: 'Achieve 80+ score in Core',
    isUnlocked: false,
    progress: 72,
    rarity: 'epic'
  },
  {
    id: 'core-diamond',
    name: 'Core Diamond',
    description: 'Score ≥ 90 in Core',
    type: 'muscle-group',
    glow: 'diamond',
    imageUrl: '/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png',
    category: 'Core Performance',
    requirement: 'Achieve 90+ score in Core',
    isUnlocked: false,
    progress: 55,
    rarity: 'legendary'
  }
];

// TierScore Badges
export const tierscoreBadges: TierOneBadge[] = [
  {
    id: 'tierscore-bronze',
    name: 'TierScore Bronze',
    description: 'TierScore ≥ 60',
    type: 'tierscore',
    glow: 'bronze',
    imageUrl: '/lovable-uploads/65d9305f-1a94-40d2-b250-2f765da7e4c8.png',
    category: 'TierScore Achievement',
    requirement: 'Achieve 60+ TierScore',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-20'
  },
  {
    id: 'tierscore-silver',
    name: 'TierScore Silver', 
    description: 'TierScore ≥ 70',
    type: 'tierscore',
    glow: 'silver',
    imageUrl: '/lovable-uploads/9033ee23-3f60-416a-87f0-de1d51f7c5d8.png',
    category: 'TierScore Achievement',
    requirement: 'Achieve 70+ TierScore',
    isUnlocked: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-02-10'
  },
  {
    id: 'tierscore-gold',
    name: 'TierScore Gold',
    description: 'TierScore ≥ 80', 
    type: 'tierscore',
    glow: 'gold',
    imageUrl: '/lovable-uploads/7188c940-69c8-4a96-b333-27323f631ad2.png',
    category: 'TierScore Achievement',
    requirement: 'Achieve 80+ TierScore',
    isUnlocked: false,
    progress: 72,
    rarity: 'epic'
  },
  {
    id: 'tierscore-diamond',
    name: 'TierScore Diamond',
    description: 'TierScore ≥ 90',
    type: 'tierscore',
    glow: 'diamond',
    imageUrl: '/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png',
    category: 'TierScore Achievement',
    requirement: 'Achieve 90+ TierScore',
    isUnlocked: false,
    progress: 0,
    rarity: 'legendary'
  },
  {
    id: 'tierscore-emerald',
    name: 'TierScore Emerald',
    description: 'Top 1% Global TierScore',
    type: 'tierscore',
    glow: 'emerald',
    imageUrl: '/lovable-uploads/0a7c5346-a421-499f-90e7-385107439d7c.png',
    category: 'TierScore Achievement',
    requirement: 'Achieve top 1% global TierScore ranking',
    isUnlocked: false,
    progress: 0,
    rarity: 'legendary'
  }
];

// Combined muscle group badges
export const muscleGroupBadges: TierOneBadge[] = [
  ...chestBadges,
  ...backBadges,
  ...shouldersBadges,
  ...armsBadges,
  ...legsBadges,
  ...coreBadges
];

// Combined badge collection
export const tierOneBadges: TierOneBadge[] = [
  ...streakBadges,
  ...sponsoredBadges,
  ...globalBadges,
  ...muscleGroupBadges,
  ...tierscoreBadges
];

// Helper functions
export const getBadgesByType = (type: BadgeType) => 
  tierOneBadges.filter(badge => badge.type === type);

export const getUnlockedBadges = () => 
  tierOneBadges.filter(badge => badge.isUnlocked);

export const getBadgesByCategory = (category: string) => 
  tierOneBadges.filter(badge => badge.category === category);

export const getBadgeById = (id: string) => 
  tierOneBadges.find(badge => badge.id === id);