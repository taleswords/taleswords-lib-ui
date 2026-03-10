# Release Notes — @taleswords/lib-ui 2.4.2

**Type:** Patch

---

## Summary

Fix textarea autosize behavior when the component is hidden during measurement.

## Fixes

**TextboxBase** now skips autosize measurement when the textarea is hidden (e.g., inside a container using `display: none` such as `v-show` tabs). Previously this could write `height: 0px` due to `scrollHeight` returning 0.

## Proposal

`docs/proposals/2.4.2-fix-textbox-proposal.md`

## Impact

- No API changes
- Backward compatible
- Patch release
