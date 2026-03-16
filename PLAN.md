# PureMind — Aplikacja do śledzenia trzeźwości i edukacji o uzależnieniach

## Kontekst

Aplikacja mobilna React Native do śledzenia dni bez używek, z wbudowaną bazą wiedzy o uzależnieniach i katalogiem pomocy. Właściciel ma 3 lata doświadczenia terapeutycznego i wie, że ludzie boją się prosić o pomoc — aplikacja ma tę barierę obniżyć. Wzór: "Sober Days Ahead", ale z treściami edukacyjnymi. Projekt startuje od zera.

---

## Stack technologiczny

- **Expo** (~52+) z Expo Router (file-based routing)
- **TypeScript** (strict)
- **Zustand** + AsyncStorage (state + persistence)
- **i18next** + expo-localization (i18n, start: EN, PL later)
- **date-fns** (daty, polskie locale)
- **react-native-reanimated** + **react-native-svg** (animacje, counter ring)
- **victory-native** (wykresy nastroju/głodu)
- **@shopify/flash-list** (wydajne listy)
- **lottie-react-native** (animacje celebracyjne)
- **expo-notifications** (lokalne przypomnienia)

---

## Struktura katalogów

```
PureMind/
├── app/                          # Expo Router routes
│   ├── _layout.tsx               # Root layout (Theme, i18n, stores)
│   ├── (tabs)/
│   │   ├── _layout.tsx           # 5 tabów
│   │   ├── index.tsx             # Home — licznik trzeźwości
│   │   ├── knowledge.tsx         # Baza wiedzy
│   │   ├── journal.tsx           # Dziennik / check-in
│   │   ├── progress.tsx          # Postępy i osiągnięcia
│   │   └── help.tsx              # Pomoc i zasoby
│   ├── counter/
│   │   ├── setup.tsx             # Dodaj/edytuj tracker
│   │   └── [id].tsx              # Szczegóły trackera
│   ├── knowledge/
│   │   ├── [categoryId].tsx      # Lista artykułów w kategorii
│   │   └── article/[id].tsx      # Widok artykułu
│   ├── journal/
│   │   ├── checkin.tsx           # Quick check-in flow
│   │   └── entry/[id].tsx        # Widok/edycja wpisu
│   └── settings.tsx
│
├── src/
│   ├── components/
│   │   ├── ui/                   # Button, Card, Text, Screen
│   │   ├── counter/              # SobrietyRing, MilestoneCard, ResetModal
│   │   ├── journal/              # MoodSelector, CravingSlider
│   │   ├── knowledge/            # CategoryCard, ArticlePreview
│   │   ├── progress/             # StreakChart, BadgeGrid
│   │   └── help/                 # HelplineCard, ResourceLink
│   ├── stores/                   # Zustand stores
│   │   ├── useTrackerStore.ts
│   │   ├── useJournalStore.ts
│   │   ├── useSettingsStore.ts
│   │   └── useAchievementStore.ts
│   ├── models/                   # TypeScript types
│   ├── content/                  # Static content (articles MD, quotes JSON, resources)
│   │   ├── en/                   # English (launch language)
│   │   └── pl/                   # Polish (added later)
│   ├── i18n/                     # UI translations (EN first, PL later)
│   ├── theme/                    # Kolory, typografia, spacing
│   ├── hooks/                    # useElapsedTime, useTheme, useDailyQuote
│   └── utils/                    # storage, dates, notifications, achievements
├── assets/                       # Fonty, obrazki, animacje Lottie
```

---

## 5 głównych ekranów (taby)

| Tab | Funkcja |
|-----|---------|
| **Home** | Główny licznik trzeźwości (ring + dni/godz/min), lista dodatkowych trackerów |
| **Wiedza** | Grid kategorii → lista artykułów → pełny artykuł (MD) |
| **Dziennik** | Quick check-in (nastrój 1-5, głód 0-10, triggery, notatka) + historia wpisów |
| **Postępy** | Streak, wykresy nastroju/głodu, odznaki/kamienie milowe |
| **Pomoc** | Telefony zaufania, grupy wsparcia, ośrodki — przycisk "Zadzwoń teraz" |

---

## Kluczowe modele danych

```typescript
type AddictionType = 'alcohol' | 'drugs' | 'smoking' | 'gambling'
  | 'pornography' | 'social_media' | 'gaming' | 'shopping' | 'other';

interface Tracker {
  id: string;
  type: AddictionType;
  customLabel?: string;
  startDate: string;          // ISO 8601
  resets: ResetRecord[];      // historia nawrotów
  createdAt: string;
  isArchived: boolean;
}

interface ResetRecord {
  id: string;
  date: string;
  previousStartDate: string;
  note?: string;
  durationDays: number;
}

interface JournalEntry {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  cravingIntensity: number;   // 0-10
  triggers: string[];
  notes?: string;
  createdAt: string;
}
```

---

## Paleta kolorów

| Rola | Light | Dark |
|------|-------|------|
| Background | `#F7F5F0` (ciepły off-white) | `#1A1D21` |
| Surface | `#FFFFFF` | `#252830` |
| Primary | `#5B8A72` (sage green — wzrost, spokój) | `#7BAF96` |
| Secondary | `#C4956A` (ciepły amber) | — |
| Accent | `#7B9EC4` (soft blue — zaufanie) | — |
| Text | `#2D3436` | `#E8E6E1` |

Fonty: **Nunito** (nagłówki), **Inter** (body), **Space Mono** (licznik)

---

## Plan implementacji (fazy)

### Faza 0 — Scaffold projektu
- `npx create-expo-app PureMind --template tabs`
- Struktura katalogów, path aliases, theme, base UI components
- Zustand stores z AsyncStorage persistence
- i18n setup z angielskimi stringami (PL dodamy później)
- **Pliki**: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `src/theme/*`, `src/stores/*`, `src/i18n/*`

### Faza 1 — Licznik trzeźwości (MVP)
- TrackerStore: add/reset/delete/setPrimary
- Home screen: ring counter z live elapsed time
- Counter Setup: wybór typu uzależnienia, data startu
- Reset flow z empatycznym komunikatem
- Obsługa wielu trackerów
- Kamienie milowe (1d, 3d, 1w, 2w, 1m, 3m, 6m, 1y)
- **Pliki**: `app/(tabs)/index.tsx`, `app/counter/setup.tsx`, `src/components/counter/*`, `src/hooks/useElapsedTime.ts`

### Faza 2 — Dziennik i check-in
- JournalStore
- Quick check-in flow (nastrój → głód → triggery → notatka)
- Lista wpisów z grupowaniem po datach
- Przypomnienia lokalne (expo-notifications)
- **Pliki**: `app/(tabs)/journal.tsx`, `app/journal/checkin.tsx`, `src/components/journal/*`

### Faza 3 — Baza wiedzy
- Treści po angielsku (Markdown): rodzaje uzależnień, mechanizmy, strategie radzenia, etapy zdrowienia, dla bliskich
- Kategorie → artykuły → reader (markdown rendering)
- **Pliki**: `app/(tabs)/knowledge.tsx`, `app/knowledge/*`, `src/content/en/articles/*`

### Faza 4 — Postępy i osiągnięcia
- AchievementStore
- Odznaki (streak-based, engagement-based)
- Wykresy nastroju/głodu (victory-native)
- Animacje celebracyjne (Lottie)
- **Pliki**: `app/(tabs)/progress.tsx`, `src/components/progress/*`

### Faza 5 — Pomoc i zasoby
- International helplines and resources (SAMHSA, AA, NA, Crisis Text Line, etc.)
- Polish resources included but not primary focus for v1
- Przyciski "Call Now" (Linking.openURL tel:)
- Przycisk "I need help now"
- **Pliki**: `app/(tabs)/help.tsx`, `src/content/en/resources.json`

### Faza 6 — Cytaty motywacyjne + onboarding
- ~200 cytatów (JSON, EN), deterministyczny cytat dnia
- 3-ekranowy onboarding
- Dark mode, settings, eksport danych

### Faza 7 — Polish i launch
- Testy na iOS/Android, accessibility audit
- Ikona i splash screen
- EAS Build → TestFlight / Google Play

---

## Zasady UX — empatia ponad wszystko

- **Never** use the word "failure" in context of relapses
- Reset: "Starting fresh takes courage. Your progress is never truly lost."
- Empty journal: "When you're ready, this is your safe space to reflect."
- High craving: "You're feeling strong cravings right now. That takes strength to acknowledge. Here's what might help..." → link to coping strategies
- Unearned badge: "You're on your way" instead of "Locked"

## Prywatność

- Zero requestów sieciowych (poza OTA updates)
- Wszystkie dane na urządzeniu (AsyncStorage)
- Brak analityki, trackingu, crash reporting z PII
- Eksport danych jako JSON/tekst
- "Twoje dane nigdy nie opuszczają tego urządzenia"

---

## Weryfikacja

1. `npx expo start` — aplikacja uruchamia się na symulatorze iOS/Android
2. Dodaj tracker → counter tyka w czasie rzeczywistym
3. Reset tracker → empatyczny modal, historia zachowana
4. Check-in → dane zapisane, widoczne w historii
5. Artykuły → rendering markdown, nawigacja między kategoriami
6. Pomoc → "Zadzwoń teraz" otwiera dialer
7. Dark mode toggle → kolory się zmieniają
8. Zabij i uruchom ponownie → dane persystują (AsyncStorage)
