import { BadgeType, BadgeGlow } from '@/components/BadgeHex';

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
    imageUrl: '/src/assets/badges/streak/7-day-streak.png',
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
    imageUrl: '/src/assets/badges/streak/50-day-streak.png',
    category: 'Consistency',
    requirement: 'Log workouts for 50 consecutive days',
    isUnlocked: false,
    progress: 74,
    rarity: 'rare'
  },
  {
    id: 'streak-100',
    name: '100-Day Legend',
    description: '100 consecutive workout days',
    type: 'streak',
    glow: 'green',
    imageUrl: '/src/assets/badges/streak/100-day-streak.png',
    category: 'Consistency',
    requirement: 'Log workouts for 100 consecutive days',
    isUnlocked: false,
    progress: 37,
    rarity: 'epic'
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
    imageUrl: '/src/assets/badges/sponsored/gymshark-participation.png',
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
    imageUrl: '/src/assets/badges/sponsored/gymshark-winner.png',
    category: 'Brand Challenges',
    requirement: 'Place top 3 in Gymshark Pushup Competition',
    isUnlocked: false,
    progress: 0,
    rarity: 'legendary'
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
    imageUrl: '/src/assets/badges/global/tierone-global-sprint.png',
    category: 'Global Events',
    requirement: 'Participate in TierOne Global Sprint Challenge',
    isUnlocked: false,
    progress: 0,
    rarity: 'epic'
  }
];

// Muscle Group Performance Badges
export const muscleGroupBadges: TierOneBadge[] = [
  {
    id: 'muscle-bronze',
    name: 'Bronze Tier',
    description: 'Score ≥ 60 in any muscle group',
    type: 'muscle-group',
    glow: 'bronze',
    imageUrl: '/src/assets/badges/muscle-groups/bronze-t1.png',
    category: 'Performance',
    requirement: 'Achieve 60+ score in a muscle group',
    isUnlocked: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-10'
  },
  {
    id: 'muscle-silver',
    name: 'Silver Tier',
    description: 'Score ≥ 70 in any muscle group',
    type: 'muscle-group',
    glow: 'silver',
    imageUrl: '/src/assets/badges/muscle-groups/silver-t1.png',
    category: 'Performance',
    requirement: 'Achieve 70+ score in a muscle group',
    isUnlocked: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-01-20'
  },
  {
    id: 'muscle-gold',
    name: 'Gold Tier',
    description: 'Score ≥ 80 in any muscle group',
    type: 'muscle-group',
    glow: 'gold',
    imageUrl: '/src/assets/badges/muscle-groups/gold-t1.png',
    category: 'Performance',
    requirement: 'Achieve 80+ score in a muscle group',
    isUnlocked: false,
    progress: 87,
    rarity: 'epic'
  },
  {
    id: 'muscle-diamond',
    name: 'Diamond Elite',
    description: 'Top 5% globally in any muscle group',
    type: 'muscle-group',
    glow: 'diamond',
    imageUrl: '/src/assets/badges/muscle-groups/diamond-t1.png',
    category: 'Performance',
    requirement: 'Achieve top 5% global ranking',
    isUnlocked: false,
    progress: 12,
    rarity: 'legendary'
  }
];

// Combined badge collection
export const tierOneBadges: TierOneBadge[] = [
  ...streakBadges,
  ...sponsoredBadges,
  ...globalBadges,
  ...muscleGroupBadges
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