# Release Notes — @taleswords/lib-ui 2.4.3

**Type:** Patch

---

## Summary

Fix DropdownBase panel sizing so the menu is at least as wide as the trigger without forcing a fixed width.

## Fixes

**DropdownBase** now applies `min-width` to the panel based on the trigger width instead of a fixed `width`. This prevents very narrow panels for compact triggers while still allowing the panel to expand to fit content.

## Proposal

`docs/proposals/2.4.3-dropdown-width-fix.md`

## Impact

- No API changes
- Backward compatible
- Patch release
