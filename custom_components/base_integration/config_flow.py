"""Config flow for Base Integration."""

from __future__ import annotations

import re
from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.const import CONF_API_KEY, CONF_HOST, CONF_NAME
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import BaseIntegrationApiClient, BaseIntegrationApiError
from .const import DEFAULT_NAME, DOMAIN


def _normalize_base_url(host: str) -> str:
    host = host.strip()
    if re.match(r"^https?://", host, flags=re.IGNORECASE):
        return host
    return f"http://{host}"


async def _validate_input(hass: HomeAssistant, data: dict[str, Any]) -> None:
    session = async_get_clientsession(hass)
    client = BaseIntegrationApiClient(
        session=session,
        base_url=_normalize_base_url(data[CONF_HOST]),
        api_key=data.get(CONF_API_KEY),
    )
    await client.async_test_connection()


class BaseIntegrationConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Base Integration."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        errors: dict[str, str] = {}

        if user_input is not None:
            base_url = _normalize_base_url(user_input[CONF_HOST])
            # Use host as unique_id so you can't add duplicates.
            await self.async_set_unique_id(base_url)
            self._abort_if_unique_id_configured()

            try:
                await _validate_input(self.hass, user_input)
            except BaseIntegrationApiError:
                errors["base"] = "cannot_connect"
            except Exception:  # noqa: BLE001
                errors["base"] = "unknown"
            else:
                title = user_input.get(CONF_NAME) or DEFAULT_NAME
                data = dict(user_input)
                data[CONF_HOST] = base_url
                return self.async_create_entry(title=title, data=data)

        schema = vol.Schema(
            {
                vol.Optional(CONF_NAME, default=DEFAULT_NAME): str,
                vol.Required(CONF_HOST): str,
                vol.Optional(CONF_API_KEY): str,
            }
        )

        return self.async_show_form(
            step_id="user",
            data_schema=schema,
            errors=errors,
        )

