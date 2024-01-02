# Hist Linux Utilities (NodeJS Version)
## Requirements:

- [nodejs](https://nodejs.org/en)
- [zx](https://github.com/google/zx)
- [wine](https://www.winehq.org)
- [winetricks](https://github.com/Winetricks/winetricks)
- [wget](https://www.gnu.org/software/wget)
- [retroarch](https://www.retroarch.com) (optional)
- [legendary](https://github.com/derrod/legendary) (optional)

## Installation methods:

NPM:

Install package:

`npm i -g hlu`

Run:

`hlu`

---

Direct run:

`zx "https://raw.githubusercontent.com/sergeyhist/hlu-js/main/dev/hlu.mjs"`

---

Download "[hlu.mjs](https://raw.githubusercontent.com/sergeyhist/hlu-js/main/dev/hlu.mjs)" file from the repo.  
Give exec permission:

`cd <path_to_downloaded_file>; chmod +x hlu.mjs`

Run script:

`zx hlu.mjs` or `./hlu.mjs`

Also you may create symlink to /usr/local/bin (/usr/bin or ~/.local/bin):

`$ ln -s <path_to_downloaded_file>/hlu.mjs /usr/local/bin/`

and run from terminal

`hlu.mjs`

## Features:
### Launcher Controller:

- Create, edit, run or delete launcher for wine game/app, linux native game/app, legendary(epic games) game or retroarch game.  
  Launcher settings:
  - Main settings
    + Name
    + Category
    + Prefix (wine/proton/legendary)
    + Core (retroarch)
    + Select wine/proton version (wine/proton/legendary)
    + Add additional arguments/commands
    + Enable gamemode, mangohud, vkbasalt
    + Enable pulse audio latency
    + Enable debug (~/.local/share/Hist/.logs)
  - Libstrangle settings
    + Enable libstrangle
    + Set max framerate
    + Set max framerate for battery power
    + Enable Vsync
    + Run glFinish after every frame
    + Set mip-map LoD bias
    + Set anisotropic filtering level (Vulkan only)
    + Enable force trilinear filtering (Vulkan only)
    + Disable linear texture filtering (Vulkan only)
    + Disable dlsym hooking
    + Stop strangle OpenGL libs from loading
    + Enable the implicit Vulkan layer
    + Disable the implicit Vulkan layer
  - FSR settings
    + Enable wine FSR
    + Select FSR Strength
  - DXVK settings
    + Enable DxvkHUD
    + Enable Dxvk async
    + Disable State Cache
  - Wine settings
    + Enable FSYNC
    + Enable ESYNC
    + Enable WineD3D
    + Enable virtual desktop
  - Proton settings
    + Enable wined3d
    + Enable large address aware
    + Enable old GL string
    + Enable Seccomp
    + Disable D3D12
    + Disable D3D11
    + Disable D3D10
    + Disable D3D9
    + Disable ESYNC
    + Disable FSYNC
    + Disable FUTEX2
  - Nvidia settings
    + Enable threaded optimizations
    + Enable graphics API visual indicator
  - AMD settings
    + Enable threaded optimizations
    + Enable radeon ACO vulkan compiler
- Generate bash scripts from launchers list. Scripts are located in **~/.local/share/Hist/Scripts** directory and sorted by categories.
- Display information about launcher in terminal.

### Wine/Proton Helper:

- Prefix commands (winecfg, control, regedit, etc.)
- Winetricks (only for wine prefixes)
- Prefix manager
  + Add prefix
  + Create prefix (only for wine prefixes)
  + Delete prefix
  + Install DXVK (only for wine prefixes)
  + Install VKD3D (only for wine prefixes)
  + Install MF (only for wine prefixes)
  + Install MF-Cab (only for wine prefixes)
- Runners manager
  + Add wine runner
  + Delete wine runner
  + Install GE-Proton
  + Install GE-Wine

### Legendary(Epic Games) Helper:

- Sign in
- Sign out
- Import game
- Install game
- Verify game
- Repair game
- Update game
- Move game
- Uninstall game
- Check updates
- Upload cloud saves
- Fix cloud saves
- Game info
- Install EOS-Overlay
- Update EOS-Overlay
- Remove EOS-Overlay

### Systemd Controller

- Services list
  + Start
  + Stop
  + Restart
  + Enable
  + Disable
  + Status
  + Unlist
- Add service to the list

### Launch options for steam game

- Select needed options and paste them into steam game launch options.

### Install [Luxtorpeda](https://github.com/luxtorpeda-dev/luxtorpeda)

- Install selected luxtorpeda release package.

### Update settings and packages

- Download latest **packages.json** and **settings.json** from this repo.
