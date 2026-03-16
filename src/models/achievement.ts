export type AchievementCondition =
  | { type: 'streak_days'; days: number }
  | { type: 'checkins_count'; count: number }
  | { type: 'journal_entries'; count: number };

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: AchievementCondition;
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  { id: 'day_1', title: 'First Step', description: '1 day sober', icon: 'sunrise', condition: { type: 'streak_days', days: 1 } },
  { id: 'day_3', title: 'Gaining Momentum', description: '3 days sober', icon: 'trending-up', condition: { type: 'streak_days', days: 3 } },
  { id: 'week_1', title: 'One Week Strong', description: '7 days sober', icon: 'star', condition: { type: 'streak_days', days: 7 } },
  { id: 'week_2', title: 'Two Weeks', description: '14 days sober', icon: 'award', condition: { type: 'streak_days', days: 14 } },
  { id: 'month_1', title: 'One Month', description: '30 days sober', icon: 'calendar', condition: { type: 'streak_days', days: 30 } },
  { id: 'month_3', title: 'Quarter Year', description: '90 days sober', icon: 'shield', condition: { type: 'streak_days', days: 90 } },
  { id: 'month_6', title: 'Half Year', description: '180 days sober', icon: 'heart', condition: { type: 'streak_days', days: 180 } },
  { id: 'year_1', title: 'One Year', description: '365 days sober', icon: 'trophy', condition: { type: 'streak_days', days: 365 } },
  { id: 'checkin_7', title: 'Checking In', description: '7 check-ins completed', icon: 'check-circle', condition: { type: 'checkins_count', count: 7 } },
  { id: 'checkin_30', title: 'Consistent', description: '30 check-ins completed', icon: 'clipboard', condition: { type: 'checkins_count', count: 30 } },
  { id: 'journal_5', title: 'Reflector', description: '5 journal entries written', icon: 'book-open', condition: { type: 'journal_entries', count: 5 } },
  { id: 'journal_25', title: 'Storyteller', description: '25 journal entries written', icon: 'feather', condition: { type: 'journal_entries', count: 25 } },
];
