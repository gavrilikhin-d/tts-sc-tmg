std = "lua52"

-- TTS runtime globals
read_globals = {
  "self",
  "Global",
  "Player",
  "UI",
  "Wait",
  "JSON",
  "WebRequest",
  "Physics",
  "Turns",
  "Time",
  "Notes",
  "Vector",
  "Color",
  "RPGFigurine",
  "MusicPlayer",
  "Counter",
  "Clock",
  "TextTool",
  "LayoutZone",
  "ScriptingZone",
  "broadcastToAll",
  "broadcastToColor",
  "printToAll",
  "printToColor",
  "log",
  "getObjectFromGUID",
  "getAllObjects",
  "spawnObject",
  "spawnObjectData",
  "spawnObjectJSON",
  "destroyObject",
  "startLuaCoroutine",
  "addHotkey",
  "stringColorToRGB",
}

-- This codebase intentionally uses script-scope globals in many files.
ignore = {
  "111", -- setting non-standard global
  "112", -- mutating non-standard global
}
