"""DataUpdateCoordinator for Base Integration."""

from __future__ import annotations

import logging
from datetime import timedelta
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import CONF_API_KEY, CONF_HOST
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import BaseIntegrationApiClient, BaseIntegrationApiError
from .const import DEFAULT_POLL_INTERVAL_SECONDS, DOMAIN


class BaseIntegrationDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Class to manage fetching data from the API."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.entry = entry
        session = async_get_clientsession(hass)
        self.client = BaseIntegrationApiClient(
            session=session,
            base_url=entry.data[CONF_HOST],
            api_key=entry.data.get(CONF_API_KEY),
        )

        super().__init__(
            hass,
            logger=logging.getLogger(__name__),
            name=DOMAIN,
            update_interval=timedelta(seconds=DEFAULT_POLL_INTERVAL_SECONDS),
        )

        self._enabled_state: bool = False

    @property
    def enabled_state(self) -> bool:
        """Return cached enabled state (example writable state)."""
        return self._enabled_state

    async def async_set_enabled_state(self, enabled: bool) -> None:
        """Set enabled state via API (example)."""
        try:
            await self.client.async_set_enabled(enabled)
        except BaseIntegrationApiError as err:
            raise UpdateFailed(str(err)) from err
        self._enabled_state = enabled
        self.async_set_updated_data(self.data or {})

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch data from API."""
        try:
            data = await self.client.async_get_status()
        except BaseIntegrationApiError as err:
            raise UpdateFailed(str(err)) from err
        return data
