"""Sensor platform for Base Integration."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorEntity
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
    """Set up sensors from a config entry."""
    coordinator: BaseIntegrationDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([BaseIntegrationStatusSensor(coordinator, entry)])


class BaseIntegrationStatusSensor(
    CoordinatorEntity[BaseIntegrationDataUpdateCoordinator], SensorEntity
):
    """Example sensor that exposes a status field."""

    _attr_has_entity_name = True
    _attr_name = "Status"
    _attr_icon = "mdi:home-assistant"

    def __init__(
        self, coordinator: BaseIntegrationDataUpdateCoordinator, entry: ConfigEntry
    ) -> None:
        super().__init__(coordinator)
        self._attr_unique_id = f"{entry.entry_id}_status"
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": entry.title,
        }

    @property
    def native_value(self) -> str | None:
        data = self.coordinator.data or {}
        if "status" in data:
            return str(data["status"])
        if "ok" in data:
            return "ok" if data.get("ok") else "error"
        return None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        data = self.coordinator.data or {}
        return {"raw": data}
