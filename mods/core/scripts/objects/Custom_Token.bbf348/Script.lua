-- ВСТАВЬТЕ GUID ВАШЕЙ ЗОНЫ ТУТ:
ZONE_GUID = "7614bb" 

-- Настройки положений
HIDDEN_Y = -10   -- Зона под столом
VISIBLE_Y = 4.5  -- Зона на столе

function onLoad()
    -- Создание кнопки на объекте
    self.createButton({
        click_function = "toggleSingleZone",
        function_owner = self,
        label          = "ZONE ON/OFF",
        position       = {0, 0.2, 0}, 
        width          = 1500,
        height         = 800,
        font_size      = 200,
        color          = {0.1, 0.1, 0.1},
        font_color     = {1, 1, 1}
    })
end

function toggleSingleZone(obj, player_color)
    local zone = getObjectFromGUID(ZONE_GUID)
    
    if zone then
        local pos = zone.getPosition()
        
        -- Логика переключения
        if pos.y > 0 then
            pos.y = HIDDEN_Y
            broadcastToColor("Show", player_color, {1, 0.5, 0.5})
        else
            pos.y = VISIBLE_Y
            broadcastToColor("Hiden", player_color, {0.5, 1, 0.5})
        end
        
        zone.setPosition(pos)
    else
        broadcastToColor("Ошибка: Зона с GUID " .. ZONE_GUID .. " не найдена!", player_color, {1, 0, 0})
    end
end