# MemoryMan

A PlayStation 1 save vault and memory card editor that runs entirely in your browser, styled after the PS1 BIOS memory card screen.

Scan all your scattered memory card images into one library, track which saves are checked out to which console or person, and export any selection of saves as a brand new card.

Live app: https://iredmegabyte.github.io/MemoryMan/

## Features

**Vault**
- Scan one or many card images at once and collect every save into a single library.
- Duplicates are detected by content. A changed save for the same game is kept as a new version (v1, v2, ...).
- Each save shows its icon, title, product code, block count, status, and the card file it was last seen on.
- Check Out records who or which system currently holds a save. Check In returns it to the vault.
- Export Card builds a new memory card from any selected saves, up to 15 blocks. Optionally mark them as checked out in the same step.
- Search and filter by in vault or checked out. A short activity log shows recent changes.
- Backup and Restore keep your library in a portable .json file.

**Card Editor**
- Two card slots side by side with animated save icons.
- Copy a save between cards, delete, rename, format, load and save.
- To Vault sends the selected save into the library.
- Arrow keys move the selection.

## Using it

1. Open the app and choose Scan Cards. Pick your .mcr, .mcd or other card files.
2. Click tiles to select saves. The counter shows blocks used out of 15.
3. Type a holder (for example "Living Room PS1" or a player name) and choose Check Out, or choose Export Card to write a new card file.
4. Use Backup now and then, especially before renaming the repo or moving the app to another address.

## Supported files

- Raw 128 KB images: .mcr, .mcd, .mc, .srm, .bin
- DexDrive .gme and PSP .vmp images can be read. Saving always writes a raw .mcr.

## Install as an app

MemoryMan is a Progressive Web App. In Chrome, Edge or Safari, use the browser's Install option, or the Install button that appears in the vault toolbar. After one visit it works offline.

On Chrome and Edge, an installed copy can open card files directly. Raw .mcr files opened this way can be saved back in place.

## Hosting your own copy

1. Put these files in the root of a GitHub repository: index.html, sw.js, manifest.webmanifest, icon.svg, icon-192.png, icon-512.png.
2. In the repository Settings, open Pages and set the source to the main branch, root folder.
3. Visit https://USERNAME.github.io/REPOSITORY/ and install it.

All paths are relative, so it works from a repository subfolder. Any static HTTPS host will do.

## Privacy and storage

Everything stays on your device. Nothing is uploaded anywhere.

The library is stored in your browser's IndexedDB for the exact address you opened. A different address, browser or device starts with an empty library. Use Backup and Restore to move it.

## Limitations

- Check-out tracking is a manual ledger. The app cannot see where a physical card is. The "Seen" line only updates when you scan a card.
- Rename supports A to Z, 0 to 9, space and a few punctuation marks, stored as full-width Shift-JIS.
- Deleted saves are marked free the way the console does it. There is no undelete yet.
- It works with card image files only. It does not talk to memory card hardware.

## Card format notes

A raw card is 131072 bytes, split into 16 blocks of 8192 bytes. Block 0 holds the directory: a header frame ("MC") followed by 15 directory frames of 128 bytes. Each frame holds an allocation state (0x51 first block, 0x52 middle, 0x53 last, 0xA0 free, 0xA1 to 0xA3 deleted), the file size, the next block index, a 20 byte file name, and an XOR checksum. Each save block starts with an "SC" header containing the Shift-JIS title, a 16 color palette, and one to three 16x16 4-bit icon frames.

## Files

- index.html: the whole app, with no dependencies or build step
- sw.js: service worker for offline use
- manifest.webmanifest: install metadata and file handlers
- icon.svg, icon-192.png, icon-512.png: app icons

## Status

Early and lightly tested. Please keep a backup of any card image you care about before editing it. Reports and feedback are welcome.
