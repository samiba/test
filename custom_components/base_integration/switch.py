"""Switch platform for Base Integration."""

from __future__ import annotations

from homeassistant.components.switch import SwitchEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import BaseIntegrationDataUpdateCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up switches from a config entry."""
    coordinator: BaseIntegrationDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([BaseIntegrationEnabledSwitch(coordinator, entry)])


class BaseIntegrationEnabledSwitch(
    CoordinatorEntity[BaseIntegrationDataUpdateCoordinator], SwitchEntity
):
    """Example switch that calls a placeholder API endpoint."""

    _attr_has_entity_name = True
    _attr_name = "Enabled"
    _attr_icon = "mdi:toggle-switch"

    def __init__(
        self, coordinator: BaseIntegrationDataUpdateCoordinator, entry: ConfigEntry
    ) -> None:
        super().__init__(coordinator)
        self._attr_unique_id = f"{entry.entry_id}_enabled"
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": entry.title,
        }

    @property
    def is_on(self) -> bool:
        return self.coordinator.enabled_state

    async def async_turn_on(self, **kwargs) -> None:  # noqa: ARG002
        await self.coordinator.async_set_enabled_state(True)

    async def async_turn_off(self, **kwargs) -> None:  # noqa: ARG002
        await self.coordinator.async_set_enabled_state(False)
