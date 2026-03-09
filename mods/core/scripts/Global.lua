--"LuaScript":\s*"(?:\\.|[^\\"])*"

--[[ Lua code. See documentation: https://api.tabletopsimulator.com/ --]]

-- Having all these GUIDs centrally managed helps to ensure that any changes to
-- them only need to be made in one place, and hard-to-find stuff isn't inadvertently
-- broken.
--
-- If you're looking at this and thinking "surely this should be a table" - why,
-- yes it should. Unfortunately, I saw the documentation for Object.getVar said
-- "Cannot return a table", and missed that Object.getTable existed, and now I'm
-- too lazy to change it all again.
centerCircle_GUID = "51ee2f"

templateObjective_GUID = "573333"
startMenu_GUID = "738804"
redDiceMat_GUID = "c57d70" -- diceTable
blueDiceMat_GUID = "a84ed2" -- diceTable
redDiceRoller_GUID = "beae28" -- kustom40kDiceRoller
blueDiceRoller_GUID = "4e0e0b" -- kustom40kDiceRoller
redMissionManager_GUID = "cff35b"
blueMissionManager_GUID = "471de1"
scoreboard_GUID = "2be922"

-- Hutber IDs
templateObjective_Hutber_GUID = "a8aca1"

redControlBoard_GUID = "5a328f"
blueControlBoard_GUID = "32ed4c"

RedSelectionHighlighter = "27de4f"
BlueSelectionHighlighter = "84c3a4"

redCustomDiceMat_GUID = "acae21" -- diceTable
blueCustomDiceMat_GUID = "839fcc" -- diceTable

redCustomDiceRoller_GUID = "17ca2b" -- kustom40kDiceRoller
blueCustomDiceRoller_GUID = "927ca1" -- kustom40kDiceRoller

redLethalHits_GUID = "7ac8ba"
blueLethalHits_GUID = "71ab21"

RedVortexGUID = "be2cdb"
BlueVortexGUID = "4b1a7b"

redLethalFace = true
blueLethalFace = true

-- End Hutber IDS
redVPCounter_GUID = "8b0541"
blueVPCounter_GUID = "a77a54"
redCPCounter_GUID = "e446f7"
blueCPCounter_GUID = "deb9f2"
orangePCounter_GUID = "25fc4a"
purpleCPCounter_GUID = "61c2f8"
redTurnCounter_GUID = "055302"
blueTurnCounter_GUID = "7e4111"
gameTurnCounter_GUID = "ee92cf"
scoresheet_GUID = "06d627"
blankObjCard_GUID = "d618cb"
activation_GUID = "229946"
wounds_GUID = "ad63ba"

table_GUID = "948ce5"
felt_GUID = "28865a"
mat_GUID = "4ee1f2"
matURLDisplay_GUID = "c5e288"
flexControl_GUID = "bd69bd"
tableLeg1_GUID = "afc863"
tableLeg2_GUID = "c8edca"
tableLeg3_GUID = "393bf7"
tableLeg4_GUID = "12c65e"
tableSideBottom_GUID = "f938a2"
tableSideTop_GUID = "35b95f"
tableSideLeft_GUID = "9f95fd"
tableSideRight_GUID = "5af8f2"
extractTerrain_GUID = "70b9f6"

redHandZone_GUID = "f7d85a"
blueHandZone_GUID = "731345"
redHiddenZone_GUID = "28419e"
blueHiddenZone_GUID = "e1e91a"
deploymentCardZone_GUID = "dcf95b"
primaryCardZone_GUID = "740abc"
secondary11CardZone_GUID = "0ec215"
secondary12CardZone_GUID = "d865d4"
secondary21CardZone_GUID = "3c8d71"
secondary22CardZone_GUID = "88cac4"
challengerCardZone_GUID = "cdecf2"

deploymentDeck_GUID = "2dc2e8"
challengerDeck_GUID = "ffdf05"
primaryDeck_GUID = "d26e9c"
redSecondaryDeck_GUID = "c0fb49"
blueSecondaryDeck_GUID = "e1da3b"

interactiveButtonTableQuarters_State = 1
interactiveButtonAreaDenial = 1
interactiveButtonStratReserves = 1
interactiveButtonDeploymentZones = 1
interactiveButton9InchZone = 1

CPMissionBook_GUID = "731ec4"