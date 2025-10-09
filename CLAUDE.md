# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Webduino Remote (萬用遙控器) is a web-based universal remote control application designed for Webduino IoT devices. It provides two control modes:
1. **Virtual robot joystick** - drag a Kebbi robot/AI car avatar to send directional commands
2. **Ten button controller** - ten customizable buttons for sending broadcast messages

The app uses MQTT for real-time IoT communication and Firebase for saving/sharing configurations.

## Architecture

### Core Technologies
- **MQTT Client**: Real-time messaging via `js/mqttClient.min.js` and `js/paho-mqtt-min.js`
- **Firebase Realtime Database**: Configuration storage/sharing at `webbit-remote.firebaseio.com`
- **Vanilla JavaScript**: No framework dependencies, uses async/await patterns
- **ClipboardJS**: For copy-to-clipboard functionality

### File Structure
- `index.html` / `index-en.html`: Main HTML files (Chinese/English versions)
- `js/main.js` / `js/main-en.js`: Main application logic (Chinese/English)
- `js/common.js`: Shared utilities (image type switching based on `?type=kebbi` or `?type=aicar`)
- `js/firebase.js`: Firebase SDK (820KB+, minified)
- `css/main.css`: All styles

### Data Flow

1. **Configuration Management**:
   - Default values defined in `list` object in main.js:35-67
   - Priority: URL hash (Firebase) > Query string params > localStorage > defaults
   - Auto-saves to localStorage on any input change

2. **URL Parameters**:
   - Query string params (e.g., `?topic1=myTopic&kebbiTop=forward`) override defaults
   - Hash fragment stores Firebase key for shared configurations
   - `?type=kebbi` or `?type=aicar` switches between Kebbi robot and AI car images

3. **MQTT Communication**:
   - Outbound: `mqttPush(topic, message)` sends to `list.topic1` channel
   - Inbound: `mqttGet(topic)` listens on `list.topic2` channel
   - Connection initialized in main.js:200-209

4. **Joystick Drag Logic** (main.js:285-402):
   - Detects position within 1/3 car width/height boundary zones
   - Sends directional messages (up/down/left/right/reset)
   - Prevents duplicate sends using `send` state object
   - Auto-resets to center on release

### Key Components

**Virtual Joystick** (`#svgKebbi`):
- Draggable robot/car avatar positioned via JavaScript (main.js:21-30)
- Touch and mouse event handlers (main.js:395-401)
- Boundary detection determines direction (main.js:304-349)

**Monster Buttons** (main.js:237-248):
- Four colored monster SVG buttons at bottom
- Each sends predefined MQTT message (green/red/yellow/blue)

**Ten Button Panel** (`#main02`):
- Customizable button names and messages
- Configured via settings panel

**Settings Panel** (`#setting`):
- Broadcast channel configuration (send/receive topics)
- Message customization for all controls
- Firebase save/share functionality (main.js:94-102)

## Development Workflow

### Testing Locally
1. Open `index.html` or `index-en.html` directly in browser (no build required)
2. Use browser DevTools to monitor MQTT messages in console
3. Test with Webduino cloud platform or Web:Bit editor

### Modifying Messages
- Edit input fields in settings panel (saves to localStorage automatically)
- Or add query string params to URL: `?kebbiTop=newValue&topic1=myChannel`

### Integration with Webduino
The remote integrates with:
- **Webduino Cloud Platform** (cloud.webduino.io): Use MQTT blocks
- **Web:Bit Education Edition** (webbit.webduino.io): Use network broadcast blocks
- **Web:Bit x Kebbi** (kebbiiot.webduino.io): Use network broadcast blocks

### Image Type Switching
- Append `?type=kebbi` for Kebbi robot images
- Append `?type=aicar` for AI car images
- Handled by `common.js` via CSS classes on `<body>`

## Important Notes

- All files must use **UTF-8 encoding** (per user's global instructions)
- No build system - direct HTML/JS/CSS
- MQTT auto-reconnects on disconnect (per CHANGELOG.md 2022.2.25)
- Mobile-optimized with touch event support
- Uses Google Tag Manager for analytics (GTM-WCKX983)

## Common Gotchas

- The firebase.js file is 820KB+ and should not be read entirely - it's a minified SDK
- Joystick positioning calculation accounts for non-centered initial Y position
- Drag boundaries are 1/3 of car size, not full size
- The `send` state object prevents duplicate MQTT messages during continuous drag
- Hash changes clear on manual input to prevent confusion with saved configs
