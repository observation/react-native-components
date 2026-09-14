# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Keep the README in sync with src/index.ts

`src/index.ts` is the public entry point of this component library (plus the
`react-native-components/theme` and `react-native-components/styles` subpath
exports). The README's component lists are a hand-maintained mirror of these
exports, not generated.

Whenever a component, hook, or utility is added to, removed from, or renamed
in `src/index.ts` (or the `theme`/`styles` subpath exports), update the
corresponding list in [README.md](README.md) in the same change.
