export interface BeerBottle {
  id: number;
  name: string;
  style: string;
  abv: string;
  opened: boolean;
  color: string;
  description: string;
  tagline: string;
  toast: string;
}

export interface Sauce {
  id: string;
  name: string;
  color: string;
  description: string;
  icon: string;
}

export interface CommunityComment {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  text: string;
  likes: number;
  badge?: string;
  isCustom?: boolean;
}

export interface Milestone {
  likesRequired: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface NegotiationResult {
  accepted: boolean;
  wifeReaction: string;
  condition: string;
  satisfactionRate: number;
}
