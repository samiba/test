# Home Assistant Base Integration (Starter)

This repo contains a minimal **Home Assistant custom integration** scaffold you can use as a starting point.

## What’s included

- `custom_components/base_integration/` custom integration
- UI config flow (host/base URL + optional API key)
- DataUpdateCoordinator-based polling
- Example entities:
  - `sensor.base_integration_status`
  - `switch.base_integration_enabled`

## Install (local dev)

1. Copy `custom_components/base_integration/` into your Home Assistant config directory:
   - `<config>/custom_components/base_integration/`
2. Restart Home Assistant.
3. Go to **Settings → Devices & services → Add integration → Base Integration**.
4. Enter a host/base URL (if you enter just `example.local:8123`, it will assume `http://`).

## Notes

- The API client is intentionally a placeholder. Update `custom_components/base_integration/api.py` to match your real device/service endpoints.
- The switch writes to `POST /api/enabled` as an example.