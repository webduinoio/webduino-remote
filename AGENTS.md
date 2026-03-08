# AGENTS.md

## Project

Webduino Remote is a static, browser-run universal remote for Webduino IoT devices. There is no build step. Open `index.html` or `index-en.html` directly in a browser and use DevTools to inspect runtime behavior and MQTT traffic.

## File map

- `index.html` + `js/main.js`: Traditional Chinese UI and behavior.
- `index-en.html` + `js/main-en.js`: English UI and behavior.
- `css/main.css`: Shared layout and styling for both entry pages.
- `js/common.js`: Shared `?type=kebbi` / `?type=aicar` image-mode switch.
- `media/`: Shared static assets used by both pages.
- `js/mqttClient.min.js`, `js/paho-mqtt-min.js`, `js/clipboard.min.js`, `js/firebase.js`: Minified/vendor-style files. Avoid editing them unless the task explicitly requires it. Do not read all of `js/firebase.js` unless necessary.

## Working rules

- Keep the Chinese and English experiences functionally aligned. If you change shared behavior, update both `js/main.js` and `js/main-en.js` unless the difference is intentionally language-specific.
- Preserve language-specific text and storage keys: Chinese uses `kebbiMobileData`, English uses `kebbiMobileEnData`.
- Preserve configuration precedence unless the task explicitly changes it: defaults in `list`, then `localStorage`, then query params, then Firebase data from the URL hash.
- Preserve MQTT behavior unless asked otherwise: send on `topic1`, listen on `topic2`, and keep reconnect-related behavior intact.
- Reuse existing vanilla JS patterns. Do not introduce frameworks, bundlers, or a build pipeline for routine changes.

## Formatting and validation

- Format with `npx prettier --write "**/*.{js,html,css,json}"`.
- Validate changes in a browser by checking:
  - joystick mode and ten-button mode switching
  - settings save/load behavior
  - query-string overrides
  - `?type=kebbi` / `?type=aicar` rendering
