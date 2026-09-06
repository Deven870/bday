# Birthday Scrapbook Website

An interactive romantic birthday microsite built with React, TypeScript, Vite, Framer Motion, and Lucide icons. The experience is designed as a handmade scrapbook: cream paper cards, navy outlines, periwinkle and pink accents, handwritten labels, gift interactions, memories, music, and animated heart popups.

## Current Experience

The app currently includes:

1. Welcome screen with a personal birthday introduction.
2. PIN-protected entry screen.
3. Acceptance feature with `Yes, always` and playful `No` interaction.
4. Birthday cake with clickable candles and wish confirmation.
5. Memory photo gallery.
6. Relationship timeline.
7. Click-to-open birthday letter.
8. Optional voice-message player.
9. “Our song” music player with a vinyl-style artwork animation.
10. Final birthday celebration screen with animated hearts/confetti.
11. Swipe navigation on touch devices.
12. Responsive scrapbook styling with paper shadows, doodles, buttons, stickers, and heart popups.

The screen indexes are continuous from `0` through `10`, so button and swipe navigation follow the same start-to-finish order without blank pages.

The current order is:

```text
0 Welcome
1 PIN unlock
2 Acceptance
3 Birthday cake
4 Memory gallery
5 Relationship timeline
6 Love letter
7 Voice message
8 Our song
10 Final celebration
```

## Requirements

- Node.js 20 or newer
- npm 10 or newer

Check installed versions:

```bash
node --version
npm --version
```

## Installation

```bash
npm install
```

## Run The Website

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed in the terminal. Vite may use `http://localhost:5173` or another available port.

## Available Commands

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run lint     # Check the source code with Oxlint
npm run preview  # Preview the production build
```

## Personalization

Most personal content lives in the `birthdayConfig` object near the top of [src/App.tsx](src/App.tsx).

```ts
const birthdayConfig = {
	personName: 'SANJU',
	birthdayDate: '07/09',
	pin: '0709',
	greeting: 'I made something special for you...',
	letter: 'Your personal birthday letter...',
	music: '/audio/our-song.mp3',
	backgroundMusic: '/your-background-file.mp3',
	voiceMessage: '/audio/voice-message.mp3',
}
```

Change these values:

- `personName`: name shown throughout the experience.
- `birthdayDate`: birthday label and reference date.
- `pin`: secret PIN used on the unlock screen.
- `greeting`: opening message. The current welcome screen has its own visible copy, so update that JSX too if you want this field displayed there.
- `letter`: full birthday letter shown after opening the envelope.
- `backgroundMusic`: looping music that starts after the PIN card opens and stops at the final celebration screen.
- `photos`: gallery image URL, caption, and date entries.
- `memories`: memory data available for future/extended memory sections.
- `timeline`: relationship timeline entries.

## Adding Songs And Audio

Create this folder:

```text
public/audio/
```

Place your files there, for example:

```text
public/audio/our-song.mp3
public/audio/voice-message.mp3
```

Reference files from `src/App.tsx` with a root-relative public path:

```ts
music: '/audio/our-song.mp3',
voiceMessage: '/audio/voice-message.mp3',
```

Do not use `./audio/...` in the config. Files inside `public` are served from the website root, so `public/audio/our-song.mp3` becomes `/audio/our-song.mp3` in the browser.

Supported browser-friendly formats include `.mp3`, `.ogg`, and `.wav`. MP3 is the safest choice for sharing across phones and browsers.

### Current Audio Behavior

- `music` controls the “Our song” player on the music screen.
- `voiceMessage` controls the optional voice-message player.
- The top-right sound button currently controls the `music` audio element.
- If `music` is empty, the player remains visible but there is no audio file to play.
- Browsers may block autoplay until the visitor interacts with the page. This is normal browser behavior.

## Adding Background Music

Background music is configured separately from “Our song”. The current project file is stored directly in `public/`:

```text
public/Jaane Kyun Dostana Original Motion Picturetrack 320 Kbps.mp3
```

It is configured in `src/App.tsx` like this:

```ts
backgroundMusic: '/Jaane Kyun Dostana Original Motion Picturetrack 320 Kbps.mp3',
```

The track starts after the correct PIN is entered, continues through the scrapbook cards, loops while needed, and stops before the final celebration screen. It uses a separate audio element, so it does not replace the “Our song” player. Playback begins from the PIN button interaction because mobile browsers commonly block autoplay without a user gesture.

## Adding Photos

You can use remote image URLs as the current config does. For local images, place them in `public/photos/`:

```text
public/photos/first-date.jpg
public/photos/getaway.jpg
public/photos/us-now.jpg
```

Then reference them like this:

```ts
photos: [
	{
		image: '/photos/first-date.jpg',
		caption: 'Our first little adventure.',
		date: 'June 2023',
	},
]
```

## Main Files

- [src/App.tsx](src/App.tsx): screen flow, configuration, interactions, audio elements, PIN logic, and content.
- [src/App.css](src/App.css): scrapbook layout, colors, cards, buttons, animations, cake, gift, vinyl, and heart popups.
- [src/index.css](src/index.css): global document defaults and base typography.
- [public/](public/): static files such as local audio and photos.
- [package.json](package.json): scripts and dependencies.

## Useful Next Additions

- Add a real background-music field and separate ambient audio control.
- Replace remote Unsplash images with personal photos in `public/photos/`.
- Add generated sticker assets in `public/assets/` for the blob characters, flowers, letters, and gifts.
- Add a pause/stop control for background audio.
- Add a shareable final memory gallery or downloadable birthday card.
- Move screen numbers to named route constants so future screens are easier to add without skipped indexes.

## Validation

Run both checks before sharing the link:

```bash
npm run build
npm run lint
```


