function onLoad()
    self.createButton({
        click_function = "saveAll",
        function_owner = self,
        label          = "SAVE ALL MODELS",
        position       = {0, 0.3, 0},
        width          = 2200, height = 600, font_size = 220,
        color          = {0, 0.5, 0}, font_color = {1, 1, 1}
    })
end

function saveAll()
    local count = 0
    for _, obj in ipairs(getAllObjects()) do
        if obj.hasTag("WeaponModel") then
            obj.call("savePositionInternal")
            count = count + 1
        end
    end
    broadcastToAll("Saved " .. count .. " models!", {0, 1, 0})
end