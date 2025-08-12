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
    imageUrl: '/lovable-uploads/fe1282cf-b9a1-44ca-b828-2c7147bcc107.png',
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
    imageUrl: '/lovable-uploads/419f2907-7325-49a6-b671-55d02f66a06a.png',
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
    imageUrl: '/lovable-uploads/65d9305f-1a94-40d2-b250-2f765da7e4c8.png',
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
    imageUrl: '/lovable-uploads/9033ee23-3f60-416a-87f0-de1d51f7c5d8.png',
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
    imageUrl: '/lovable-uploads/7188c940-69c8-4a96-b333-27323f631ad2.png',
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
    imageUrl: '/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png',
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