
cardGuid = nil
myPlayer = nil


------увеличение карты
function onCollisionEnter(collision_info)
    -- collision_info table:
    --   collision_object    Object
    --   contact_points      Table     {Vector, ...}
  --   relative_velocity   Vector
  local card = getObjectFromGUID(collision_info.collision_object.getGUID())
  if card.type == 'Card' or card.type == 'CustomCard' then
    cardGuid = card.getGUID()
    card.setScale({2,2,2})
    self.UI.setAttribute('ploy-menu', 'active', true)
  end
end

function activate()
  local card = getObjectFromGUID(cardGuid)
  broadcastToAll(myPlayer.steam_name .. ' activates ' .. card.getName(), myPlayer.color)
  --self.UI.setAttribute('ploy-menu', 'active', false)
  UI.setAttribute("ktw__streamerSecondaries_player"..self.getDescription(), "text", card.getName())

end

function deactivate(player)
  UI.setAttribute("ktw__streamerSecondaries_player"..self.getDescription(), "text", "")

end

function onActivateClick(player)
  myPlayer = player
  activate()
  self.UI.setAttribute('button-activate', 'active', 'false')
  self.UI.setAttribute('button-deactivate', 'active', 'true')
  self.UI.setClass('button-activate', 'button')
  self.UI.setClass('button-deactivate', 'button-selected')
end

function onDeactivateClick(player)
  deactivate()
  self.UI.setAttribute('button-activate', 'active', 'true')
  self.UI.setAttribute('button-deactivate', 'active', 'false')
  self.UI.setClass('button-activate', 'button')
  self.UI.setClass('button-deactivate', 'button-selected')
end

function buildUI()
  self.UI.setXml([[
<Defaults>
    <Text color="#e74f0aff" />
    <Text class="darker" color="#1B1B1B" />
    <Panel color="#353839" />
    <Slider color="#353839" />
    <Button colors="#353839|#353839" textColor="#e74f0aff" height="70" fontStyle="bold" fontSize="20" />
    <Button class="button-selected" colors="#e74f0aff|#e74f0aff" textColor="#353839"/>
</Defaults>
  <Panel height="30" width="120" position = "0 100 -11" rotation = "0 0 180" scale="0.5 0.5 0.5" id="ploy-menu" active="false" childAlignment="LowerCenter" rectAlignment="LowerCenter">
    <HorizontalLayout>
      <Button onClick="onActivateClick()" id="button-activate" >Activate</Button>
      <Button onClick="onDeactivateClick()" class="button-selected" id="button-deactivate" active="false"  >Deactivate</Button>
    </HorizontalLayout>
  </Panel>
  ]]
  )
end

self.setScale({3.6,1,3.6})
buildUI()