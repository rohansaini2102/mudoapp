# How to Run MoodVibe App

## Start the App
```bash
npm start
```

## View the App

### Option 1: Web Browser (Recommended for Development)
1. After running `npm start`, press `w` in terminal
2. Browser opens automatically
3. You'll see the app at http://localhost:19006

### Option 2: On Your Phone
1. Install "Expo Go" from App Store/Play Store
2. Make sure phone is on same WiFi as computer
3. Scan the QR code shown in terminal

## Keep Development Going

### Terminal Setup:
- **Terminal 1**: Keep `npm start` running (don't close!)
- **Terminal 2**: Open new terminal for other commands

### Making Changes:
1. Edit code in your editor
2. Save the file
3. App automatically refreshes (hot reload)
4. See changes instantly

### If App Crashes:
- Press `r` in terminal to reload
- Or shake phone and tap "Reload"

## Common Commands

While app is running, in the terminal you can press:
- `w` - Open in web browser
- `r` - Reload app
- `m` - Toggle menu
- `j` - Open JavaScript debugger
- `c` - Clear console
- `Ctrl+C` - Stop the server

## Development Workflow

1. Start app: `npm start`
2. Press `w` to open in browser
3. Open new terminal for git/other commands
4. Make code changes
5. Save files - app auto-reloads
6. Test changes in browser
7. Repeat!

## Troubleshooting

**Can't see app?**
- Check terminal for errors
- Make sure you pressed `w` for web
- Try http://localhost:19006 directly

**Changes not showing?**
- Save the file
- Press `r` to force reload
- Check for syntax errors

**Port already in use?**
```bash
npx kill-port 19006
npm start
```