"""API client for Base Integration.

This is intentionally generic "starter" code you can adapt to your device/service.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from aiohttp import ClientError, ClientSession


class BaseIntegrationApiError(Exception):
    """Raised when the API client encounters an error."""


@dataclass(slots=True)
class BaseIntegrationApiClient:
    """Very small async HTTP API client."""

    session: ClientSession
    base_url: str
    api_key: str | None = None

    def _headers(self) -> dict[str, str]:
        if not self.api_key:
            return {}
        return {"Authorization": f"Bearer {self.api_key}"}

    async def async_test_connection(self) -> None:
        """Validate connection details."""
        await self.async_get_status()

    async def async_get_status(self) -> dict[str, Any]:
        """Fetch a basic status payload."""
        url = f"{self.base_url.rstrip('/')}/"
        try:
            async with self.session.get(url, headers=self._headers(), timeout=10) as resp:
                resp.raise_for_status()
                # A lot of devices return HTML on '/', so keep it safe.
                content_type = resp.headers.get("content-type", "")
                if "application/json" in content_type:
                    data = await resp.json()
                else:
                    text = await resp.text()
                    data = {"ok": True, "status": resp.status, "body_preview": text[:200]}
                return data
        except (ClientError, TimeoutError) as err:
            raise BaseIntegrationApiError(str(err)) from err

    async def async_set_enabled(self, enabled: bool) -> None:
        """Example write call.

        This is a placeholder. Update to match your API.
        """
        url = f"{self.base_url.rstrip('/')}/api/enabled"
        payload = {"enabled": enabled}
        try:
            async with self.session.post(
                url, json=payload, headers=self._headers(), timeout=10
            ) as resp:
                resp.raise_for_status()
        except (ClientError, TimeoutError) as err:
            raise BaseIntegrationApiError(str(err)) from err
