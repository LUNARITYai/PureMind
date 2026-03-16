export type AddictionType =
  | 'alcohol'
  | 'drugs'
  | 'smoking'
  | 'gambling'
  | 'pornography'
  | 'social_media'
  | 'gaming'
  | 'shopping'
  | 'other';

export interface Tracker {
  id: string;
  type: AddictionType;
  customLabel?: string;
  startDate: string; // ISO 8601
  resets: ResetRecord[];
  createdAt: string;
  isArchived: boolean;
}

export interface ResetRecord {
  id: string;
  date: string; // ISO 8601
  previousStartDate: string;
  note?: string;
  durationDays: number;
}

export const ADDICTION_LABELS: Record<AddictionType, string> = {
  alcohol: 'Alcohol',
  drugs: 'Drugs',
  smoking: 'Smoking',
  gambling: 'Gambling',
  pornography: 'Pornography',
  social_media: 'Social Media',
  gaming: 'Gaming',
  shopping: 'Shopping',
  other: 'Other',
};

export const ADDICTION_ICONS: Record<AddictionType, string> = {
  alcohol: 'wine',
  drugs: 'pill',
  smoking: 'cigarette',
  gambling: 'dice',
  pornography: 'eye-off',
  social_media: 'smartphone',
  gaming: 'gamepad-2',
  shopping: 'shopping-bag',
  other: 'circle',
};
