# MemoryMan

**A personal save vault and memory card editor for PlayStation 1.** Create your own copy of MemoryMan, run it on your computer, and manage your card images in your own browser.

## Set up your own copy

MemoryMan is a static app with no package manager or build step. You need Git and Python 3 to clone and serve it locally.

1. On the MemoryMan repository page, choose **Use this template → Create a new repository**. Pick a name and set the new repository to **Private**. This creates your own independent copy. A public fork cannot be made private, so use the template option for a private repository. [GitHub: create a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) · [Fork visibility rules](https://docs.github.com/en/pull-requests/reference/forks)
2. Clone your new repository. Replace the placeholders with your GitHub username and repository name:

   ```sh
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   cd YOUR-REPOSITORY
   ```

3. Start a local web server from the repository directory:

   ```sh
   python -m http.server 8000 --directory web
   ```

   On Windows, use `py` if `python` is not recognized. On macOS or Linux, use `python3` if needed.

4. Open <http://localhost:8000> and choose **Add Cards** to import your card images.

Keep the server running while you use the app. To stop it, return to the terminal and press **Ctrl+C**. You can install MemoryMan from a compatible browser; after the first visit, it can work offline.

## Move your library from the demo

If you have saves in the live demo, choose **Backup** there first. Open your local copy and choose **Restore** to load that JSON backup. Restored saves and shelf details come across, but browser file permissions and watched folders do not; add or link those card files again.

The [live demo](https://iredmegabyte.github.io/MemoryMan/) is a preview. Its library belongs to that browser and site address, so it does not automatically appear in your own copy.

## What the app does

### Vault and shelf

- Scan multiple card images into one searchable library. Identical save content is recognized; changed content is kept as another version.
- Track checkouts by person or console, and create a new card from selected saves. Cards hold up to 15 blocks.
- Keep a shelf of card files with labels, colors, used-block maps, and status. Recheck linked files or choose folders to watch for card images; folder scans look up to two levels deep.
- Back up and restore your library with a JSON file.

### Card Editor

Open two cards side by side to inspect their 15 save slots. Copy saves between cards, send a save to the Vault, or rename, delete, and format saves. Use the arrow keys to move between slots. **Save** writes to a linked raw card file when supported; otherwise, it downloads a raw `.mcr` image.

## Where your data lives

**The template repository is currently for the app code. MemoryMan does not yet sync saves to GitHub.** Your library is stored in IndexedDB in the browser profile and site origin where you run the app. The app does not upload card contents. Use **Backup** to create a portable copy and store that backup somewhere safe.

Creating a private template repository keeps your app copy private on GitHub, but it does not itself back up your browser library. A different browser profile or site address has a separate library. The template copy also does not receive app updates automatically.

## Card images and browser support

MemoryMan reads raw 128 KB card images with `.mcr`, `.mcd`, `.mc`, `.srm`, or `.bin` extensions, plus supported DexDrive `.gme` and PSP `.vmp` images. Edited and exported cards are written as raw `.mcr` files.

Basic scanning, editing, and downloads work in modern browsers. Linked card files, watched folders, and saving changes directly to a file use browser file-system features best supported in desktop Chrome and Edge. The browser may ask you to grant file or folder access again later. MemoryMan works with card image files; it does not connect to physical memory card hardware.

## Hosting instead of running locally

You can publish the **contents of `web/`** as the site root on a static HTTPS host. Keep the files together; paths are relative, so the app can also run under a URL subpath. A private source repository does not automatically make the hosted site private; check your host's access settings.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Complete app interface and logic; no external dependencies |
| `sw.js` | Offline app cache |
| `manifest.webmanifest` | Install metadata and card-file associations |
| `icon.svg`, `icon-192.png`, `icon-512.png` | App icons |

