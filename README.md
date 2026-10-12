# Eduvoice

A voice-first learning assistant: talk to Eduvoice, get answers you can remember.
Built with Expo (SDK 57), Expo Router, NativeWind and TypeScript.

## Getting started

```bash
npm install
npx expo start        # or: npm run ios / npm run android / npm run web
```

## Project structure

Feature-based: routing lives in `src/app`, everything a feature needs lives
together in `src/features/<feature>`.

```
src/
├── app/                    # Expo Router routes only (thin re-exports)
│   ├── _layout.tsx         # fonts, providers, modal + stack config
│   ├── index.tsx           # boot gate → onboarding or tabs
│   ├── (onboarding)/       # welcome → personalize → preparing
│   ├── (tabs)/             # home, chat, library, profile (custom tab bar)
│   ├── voice.tsx           # full-screen voice mode
│   ├── conversation/[id].tsx
│   └── +not-found.tsx
├── components/             # cross-feature building blocks
│   ├── animation/          # FadeInUp, FloatingView, PulseRing
│   ├── icons/              # Lucide registry + <Icon />
│   ├── navigation/         # floating tab bar
│   └── ui/                 # AppText, Button, Surface, Chip, Screen, ...
├── features/
│   ├── onboarding/         # interests, robot mascot, first-run flow
│   │   ├── components/  constants.ts  hooks/  screens/  storage.ts  types.ts
│   ├── voice/              # session state machine + voice mode UI
│   │   └── components/  constants.ts  hooks/  screens/  services/  types.ts
│   ├── chat/               # conversations, composer, learning modes
│   │   └── components/  constants.ts  data/  hooks/  screens/  services/  store/  types.ts
│   ├── home/               # greeting, voice card, plan, streak, composer
│   ├── library/            # saved notes, audio, summaries, quizzes
│   └── profile/            # identity, focus areas, persisted preferences
├── lib/                    # framework-agnostic helpers
│   ├── api/                # fetch client (ready for the backend)
│   ├── storage.ts          # typed AsyncStorage wrapper
│   ├── config.ts           # env-driven app config
│   └── utils/              # cn, format, array, id
├── providers/              # AppProviders (safe area, gestures, stores)
└── theme/                  # colors, gradients, typography, layout tokens
```

### Conventions

- **Routes are thin.** Files in `src/app` only re-export a screen from
  `src/features`, so navigation stays declarative and features stay portable.
- **Features own their state.** `ChatProvider` (conversations) and
  `OnboardingProvider` (first-run profile) are mounted once in
  `src/providers/AppProviders.tsx`.
- **Design tokens, not magic numbers.** Colours, radii, shadows and gradients
  come from `src/theme` and `tailwind.config.js` (NativeWind utilities such as
  `bg-white/55`, `rounded-card`, `text-ink`).
- **Typography via `AppText`.** `variant` picks a Manrope weight/size,
  `tone` picks a colour, `className` handles layout.

## What is stubbed

Everything is wired end to end, but three integration points are intentionally
local stand-ins:

| Area | File | Swap for |
| --- | --- | --- |
| Speech recognition | `src/features/voice/services/voice-engine.ts` | `expo-audio` recording + on-device/served speech-to-text |
| Assistant replies | `src/features/chat/services/chat-service.ts` | `api.post("/assistant", ...)` |
| File upload / sign out | composer menu, profile rows | document picker + auth |

The voice UI runs on a scripted engine (`createStubVoiceEngine`) so the full
loop — listening → transcript → conversation — can be reviewed without
microphone permissions. Replacing `voiceEngine` is a one-line change; the UI
only depends on the `VoiceEngine` interface.
