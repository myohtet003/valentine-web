# Birthday surprise

The birthday experience uses `BIRTHDAY_DATE_KEY` in Asia/Yangon after the existing setup and unlock screens. The birthday is 23 October 2026; the current local configuration is set to 20 October for preview. Set it to `2026-10-23` before publishing.

## Personalize before publishing

- Put your voice recording in `public/audio/birthday-voice.mp3` and set `voiceMessageSrc` to `/audio/birthday-voice.mp3` in `src/lib/dashboard/birthday.ts`. An empty source shows a coming-soon message instead of a broken player. MP3 is recommended for browser compatibility.
- Edit `giftTitle` and `giftMessage` in that same file to describe your actual gift or birthday plan. The initial message is a promise to spend a day together, not a booking.
- Edit the four photos and short Burmese captions in `src/components/birthday/BirthdayExtras.tsx`. No dates are shown because the actual photo dates are not known.

## Check the experience

For local preview, temporarily set `BIRTHDAY_DATE_KEY` in `src/lib/dashboard/constants.ts` to today's Yangon date. Restore `2026-10-23` before deployment.

1. Unlock the existing dashboard and open the birthday box. Music must start only after that tap.
2. Tap the candle/cake button to open the birthday dashboard immediately, as in the original flow. Keyboard activation also works; no microphone permission is needed.
3. Move through all four memories with arrows and dots, including wrapping from last to first.
4. With a recording configured, play, pause, seek, and finish the voice message. Background music should pause during speech and resume only if music is enabled. Muting music during speech must keep it off afterward.
5. Unwrap the final gift, then replay the surprise. Previous audio should stop; leaving the page should also stop birthday audio.
6. Check on a narrow mobile screen and with reduced motion enabled. New story transitions respect reduced motion.
