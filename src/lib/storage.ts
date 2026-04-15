import type { Story, CVData, Settings, CoverLetter } from "@/types";

const KEYS = {
  stories: "clg_stories",
  cv: "clg_cv",
  settings: "clg_settings",
  letters: "clg_letters",
} as const;

export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getStories(): Story[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEYS.stories);
  if (!raw) return [];
  return JSON.parse(raw) as Story[];
}

export function saveStory(story: Story): void {
  const stories = getStories();
  const index = stories.findIndex((s) => s.id === story.id);
  if (index >= 0) {
    stories[index] = story;
  } else {
    stories.push(story);
  }
  localStorage.setItem(KEYS.stories, JSON.stringify(stories));
}

export function deleteStory(id: string): void {
  const stories = getStories().filter((s) => s.id !== id);
  localStorage.setItem(KEYS.stories, JSON.stringify(stories));
}

export function getCVData(): CVData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEYS.cv);
  if (!raw) return null;
  return JSON.parse(raw) as CVData;
}

export function saveCVData(cv: CVData): void {
  localStorage.setItem(KEYS.cv, JSON.stringify(cv));
}

export function getSettings(): Settings | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEYS.settings);
  if (!raw) return null;
  return JSON.parse(raw) as Settings;
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(KEYS.settings, JSON.stringify(settings));
}

export function getLetters(): CoverLetter[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEYS.letters);
  if (!raw) return [];
  return JSON.parse(raw) as CoverLetter[];
}

export function saveLetter(letter: CoverLetter): void {
  const letters = getLetters();
  letters.push(letter);
  localStorage.setItem(KEYS.letters, JSON.stringify(letters));
}
