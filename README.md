# tts-sc-tmg
StarCraft The Miniatures Game mod for Table Top Simulator

## Contributing

### VSCode extension

We use patched [Tabletop Simulator Lua extension](https://github.com/gavrilikhin-d/tabletopsimulator-lua-vscode)

> **IMPORTANT**: 
> Open TTS **save file** for extension to work.
> You can't work with loaded workshop file without saving and reopening save first

Usefull comands:
* `ctrl+alt+l` -- load scripts from TTS save
* `ctrl+alt+s` -- upload scripts to TTS save

### Lint

Install Dependencies:
- [stylua](https://github.com/JohnnyMorganz/StyLua)
- [luacheck](https://github.com/mpeterv/luacheck)

Run 
```bash
./lint
```

> **Note**: If you forget to run linter, GitHub Actions will do it for you