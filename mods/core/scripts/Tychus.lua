self.max_typed_number = 2
local typedBuffer = ""
local waitID = nil

-- НАСТРОЙКИ РАЗМЕРА БАЗЫ
local baseSizeMM = 40 -- Укажите здесь диаметр вашей подставки в миллиметрах
local mtoi = 0.0393701 -- Константа перевода мм в дюймы

local modelMeasureLineRadius = 0.05
local baseLineRadius = 0.0125
local baseLineHeight = 0.01
local rangeShown = true
local measureColor = {0.5, 0.5, 0.5}
local measureRange = 0
local lastRange = 0

function onNumberTyped(player_color, number)
    if waitID then Wait.stop(waitID) end
    typedBuffer = typedBuffer .. tostring(number)
    
    if #typedBuffer >= self.max_typed_number then
        processTypedNumber(player_color)
    else
        waitID = Wait.time(function() processTypedNumber(player_color) end, 0.5)
    end
end

function processTypedNumber(pc)
    local n = tonumber(typedBuffer)
    typedBuffer = ""
    waitID = nil
    if not n then return end

    rangeShown = n > 0
    measureColor = Color.fromString(pc)
    measureRange = n

    local scaleFactor = 1 / self.getScale().x

    if lastRange == measureRange then
        local sphereRange = getCircleVectorPoints(measureRange + 0.05, 0.125, 1)[1].x * 2 / scaleFactor
        Physics.cast({
            origin       = self.getPosition(),
            direction    = {0, 1, 0},
            type         = 2,
            size         = {sphereRange, sphereRange, sphereRange},
            max_distance = 0,
            debug        = true,
        })
    end
    
    lastRange = measureRange
    refreshVectors(pc)
end

function refreshVectors(pc, norotate)
    local op = pc and Player[pc]
    local scaleFactor = 1 / self.getScale().x
    local rotation = self.getRotation()
    norotate = true

    local newLines = {
        {
            -- Внутренний круг (по краю подставки)
            points = getCircleVectorPoints(0, baseLineHeight), 
            color = op and Color.fromString(op.color) or {0.3, 0.3, 0.3},
            thickness = baseLineRadius * scaleFactor
        }
    }

    if rangeShown and measureRange > 0 then
        table.insert(newLines, {
            points = getCircleVectorPoints(measureRange, 0.01),
            color = measureColor,
            thickness = modelMeasureLineRadius * scaleFactor,
            rotation = (norotate and {0, 0, 0} or {-rotation.x, 0, -rotation.z})
        })
    end

    self.setVectorLines(newLines)
end

function getCircleVectorPoints(radiusInInches, height, segments)
    local result = {}
    local s = self.getScale()
    -- TTS учитывает масштаб объекта, поэтому мы его компенсируем
    local scaleFactorX, scaleFactorY, scaleFactorZ = 1/s.x, 1/s.y, 1/s.z
    
    local steps = segments or 64
    local degrees, sin, cos, toRads = 360/steps, math.sin, math.cos, math.rad
    
    -- Вычисляем радиус самой подставки в дюймах (радиус = диаметр / 2)
    local baseRadiusInInches = (baseSizeMM * 0.5) * mtoi

    for i = 0, steps do
        -- Итоговый радиус = радиус подставки + дистанция замера
        local currentRadius = (baseRadiusInInches + radiusInInches)
        
        table.insert(result, {
            x = cos(toRads(degrees * i)) * (currentRadius * scaleFactorX),
            z = sin(toRads(degrees * i)) * (currentRadius * scaleFactorZ),
            y = height+0.2 * scaleFactorY
        })
    end
    return result
end

refreshVectors()

local mySavedPos = nil
local mySavedRot = nil

function onLoad(saved_data)
    self.addTag("WeaponModel")

    if saved_data ~= "" and saved_data ~= nil then
        local loaded_data = JSON.decode(saved_data)
        mySavedPos = loaded_data.pos
        mySavedRot = loaded_data.rot
    end

    -- Добавляем пункты в контекстное меню
    self.addContextMenuItem("Save Position", function(color)
        handleGroupAction(color, "savePositionInternal")
    end)
    
    self.addContextMenuItem("Restore Position", function(color)
        handleGroupAction(color, "xmlLoadPos")
    end)
end

function onSave()
    return JSON.encode({pos = mySavedPos, rot = mySavedRot})
end

-- Функция-контроллер для работы с группой
function handleGroupAction(player_color, function_name)
    local selectedObjects = Player[player_color].getSelectedObjects()
    
    -- Если выделено несколько объектов
    if #selectedObjects > 1 then
        for _, obj in ipairs(selectedObjects) do
            if obj.hasTag("WeaponModel") then
                obj.call(function_name, {color = player_color})
            end
        end
    else
        -- Если нажат только один объект
        self.call(function_name, {color = player_color})
    end
end

-- Внутренняя функция сохранения
function savePositionInternal(params)
    mySavedPos = self.getPosition()
    mySavedRot = self.getRotation()
    if params and params.color then
        print("Position Saved: " .. self.getName())
    end
end

-- Внутренняя функция возврата
function xmlLoadPos(params)
    if mySavedPos ~= nil then
        self.setPositionSmooth(mySavedPos, false, false)
        self.setRotationSmooth(mySavedRot, false, false)
    else
        if params and params.color then
            broadcastToColor("No save for " .. self.getName(), params.color, "Red")
        end
    end
end