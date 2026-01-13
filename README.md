# How to remove an app from Mac (macOS)

## Option 1: Drag the app to Trash (most common)

- Open **Finder** → **Applications**
- Find the app
- Drag it to **Trash**, or right-click → **Move to Trash**
- **Empty Trash** to complete removal

Tip: Some apps also live in `~/Applications` (your home folder). Check there if you don’t see it in the main Applications folder.

## Option 2: Delete apps installed from the App Store (Launchpad)

- Open **Launchpad**
- Click and hold the app until icons jiggle
- Click the **X** button

If there’s no **X**, the app wasn’t installed from the App Store (use Option 1 or the app’s uninstaller).

## Option 3: Use the app’s uninstaller (common for Adobe, VPNs, antivirus)

- Open **Applications**
- Look for:
  - An **Uninstall <App>** app, or
  - An “**<App> Uninstaller**” folder
- Run the uninstaller and follow prompts

If the vendor provided a dedicated uninstaller, prefer it over dragging to Trash.

## Option 4: If the app was installed via a package installer (.pkg)

Apps installed via `.pkg` may not be removable by dragging to Trash.

- Check if the vendor provides an uninstaller first
- Otherwise remove the main app (if present) from **Applications**, then remove related components carefully (see “Remove leftover files” below)

## Option 5: If you installed it with Homebrew

- For GUI apps (casks):

```bash
brew uninstall --cask <app-name>
```

- For command-line tools (formulae):

```bash
brew uninstall <tool-name>
```

To find the exact name:

```bash
brew list --cask
brew list
```

## Remove leftover files (optional, for thorough cleanup)

Many apps leave settings and caches behind. If you want to remove them:

1. In Finder, press **Cmd+Shift+G** (“Go to Folder…”)
2. Check and remove folders/files related to the app (only if you’re sure):

- `~/Library/Application Support/`
- `~/Library/Preferences/`
- `~/Library/Caches/`
- `~/Library/Containers/` (common for App Store apps)
- `~/Library/Group Containers/`
- `~/Library/LaunchAgents/`
- `/Library/Application Support/` (system-wide)
- `/Library/Preferences/`
- `/Library/LaunchDaemons/` and `/Library/LaunchAgents/` (be careful)

When in doubt, move suspected leftovers to a temporary folder first; if everything works fine for a few days, delete them.

## Can’t delete the app?

- **App is open**: Quit it (Cmd+Q), or use **Activity Monitor** to force quit.
- **Permission errors**: Make sure you’re deleting from **Applications** (not a disk image), and try again. As a last resort, restart and retry.
- **It keeps coming back**: You may have a login item or background service reinstalling it—check **System Settings → General → Login Items** and remove related entries.

## Tell me what you’re uninstalling (and how you installed it)

If you share the app name and whether it came from the App Store, a `.dmg`, a `.pkg`, or Homebrew, I can give exact removal steps and what leftovers (if any) are safe to delete.