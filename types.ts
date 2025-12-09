export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  aiResponse?: string;
  timestamp: number;
}

export enum SectionType {
  WELCOME = 'welcome',
  HERO = 'hero',
  COUPLE = 'couple',
  DATE = 'date',
  GALLERY = 'gallery',
  GIFT = 'gift',
  GUESTBOOK = 'guestbook'
}