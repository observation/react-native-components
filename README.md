# react-native-components

React Native component library for components used by React Native applications of Observation.org.
There are 2 kinds of components:
UI components:

- `Accordion`
- `BackButton`
- `BackgroundImage`
- `BottomActionBar (+ BottomActionBarProps)`
- `BottomSheetWithSearchInput`
- `BrandIcon`
- `BrandIcons`
- `CapitalizeText`
- `Checkbox`
- `Chip`
- `ContentImage`
- `Date`
- `DateFromToFilter`
- `DatePicker`
- `Disclose`
- `DocumentLink`
- `FilterButton`
- `FilterOption`
- `FilterSelectField`
- `HtmlContent (+ HtmlContentProps, CustomRendererProps, RenderersProps, TBlock)`
- `Icon`
- `IconButton`
- `IconName`
- `IconText`
- `IconView`
- `Icons`
- `InputField`
- `InputPanel`
- `ItemSeparator`
- `LargeButton (+ LargeButtonProps)`
- `Lightbox`
- `ListItem`
- `Location`
- `Message`
- `MoreInfo`
- `Notification`
- `NotificationPopup (+ NotificationPopupStaticProps)`
- `PageIndicator`
- `Panel`
- `PercentageCircle`
- `Popup`
- `ProgressBar`
- `ProgressBarList`
- `Rarity`
- `RaritySlider`
- `SectionHeader`
- `SingleLine`
- `SnackbarHost`
- `TextLink`
- `Tooltip (+ TooltipProps)`
- `WebLink`

non-UI components:

- `Log.setLogConfiguration`: A function to change the logging of the component library
- `ModalReporter`: Reports a modal screen as open while it is focused, so the snackbar is suppressed
- `openUrl`: Opens URLs
- `snackbarAutoDismissDuration`: Time in ms before a snackbar message without a close button or action is dismissed
- `SnackbarMessage (+ SnackbarMessageParams)`: A message shown in the snackbar
- `SnackbarProvider`: Provides the app's `SnackbarStore` through `SnackbarStoreContext` and `SnackbarReporterContext`
- `SnackbarReporterContext (+ SnackbarReporter)`: Context through which a screen reports bottom insets and open modals to the app's snackbar
- `SnackbarStore`: MobX store with the current snackbar message, the content insets and the open modals
- `SnackbarStoreContext`, `useSnackbarStore`: Context through which the app provides its `SnackbarStore`
- `TabBarInsetReporter`: Reports the height of the tab bar while a tab is focused, so the snackbar is shown above it
- `useBottomSheetBackHandler`: A hook to close a BottomSheet on the Android hardware back button
- `useReportSnackbarInset`: A hook to report the height of a UI element at the bottom of the screen, so a snackbar is shown above it
- `useScreenMessage (+ ScreenMessage)`: A hook to show a snackbar message that belongs to a screen, only while it has focus
- `useShowBlurView`: A safe way to set a blur on the background

Additionally, the package exposes three subpath entry points:

`react-native-components/theme`:

- `ThemeProvider`, `useTheme`, `useStyles`
- `createTheme`, `defaultTheme`: The default theme with colors, margins, text styles, shadows, and the surface and elevation an app uses for specific roles

`react-native-components/styles`:

- `font`, `fontSize`, `lineHeight`: Font styles
- `layout`, `rounded`: Layout styles
- `createInputStyles`, `createBottomSheetStyles`

`react-native-components/testing`:

- `snackbarText`, `closeSnackbar`, `pressSnackbarAction`: Test helpers to read and act on the snackbar message, without rendering the `SnackbarHost`. Requires `@testing-library/react-native`.

## Snackbar

The snackbar shows one message at a time at the bottom of the screen, above bottom UI like a tab bar, an action rail or a `BottomActionBar`. It is a MobX store plus a host component, so `mobx` and `mobx-react-lite` are peer dependencies.

### Setup

Create one `SnackbarStore`, provide it with `SnackbarProvider` (for showing messages and for reporting insets and modals), and place the `SnackbarHost` once in the root of the app, after the navigation:

```tsx
const snackbarStore = new SnackbarStore()

<SnackbarProvider store={snackbarStore}>
  <AppContainer />
  <SnackbarHost />
</SnackbarProvider>
```

`SnackbarHost` positions the message above the reported insets, dismisses messages without a close button or action after `snackbarAutoDismissDuration`, suppresses the snackbar while a modal is open, and hides the message when the app goes to the background.

### Showing messages

```ts
snackbarStore.show({ text: 'Observation saved' })
snackbarStore.show({ text: 'No Internet connection', closable: true })
snackbarStore.show({ text: 'Observation deleted', action: { text: 'Undo', onPress: undo }, onDismiss })
```

`show` replaces the current message and returns it. `dismiss(message)` removes the message if it is still the current one and calls its `onDismiss`; `hide(message)` removes it without calling `onDismiss`. In components, get the store with `useSnackbarStore()`.

### Reporting insets

UI at the bottom of a screen reports its height, so the snackbar is shown above it. The height is only counted while its screen is focused.

- `BottomActionBar` reports its height itself.
- Wrap tab screens in `TabBarInsetReporter`, e.g. through the `screenLayout` of the tab navigator.
- For other UI, attach the `onLayout` from `useReportSnackbarInset()` to its root view.

### Modals

While a modal screen is open the snackbar is suppressed, and a message shown in the meantime appears when the modal is closed. Wrap modal screens in `ModalReporter`, e.g. through the `screenLayout` of the stack navigator:

```tsx
const screenLayout = ({ options, children }: { options: StackNavigationOptions; children: React.ReactElement }) =>
  options.presentation === 'transparentModal' ? <ModalReporter>{children}</ModalReporter> : children
```

### Screen messages

Some messages describe the state of a screen, e.g. missing location access. `useScreenMessage(message)` shows such a message only while the screen has focus: it is hidden when the screen loses focus or the app goes to the background, and shown again when the user returns, until the user closes it or `message` becomes `undefined`. The calling component must be an `observer`.

### Tests

Code that shows messages can be tested against the store, without rendering the `SnackbarHost`, with the helpers from `react-native-components/testing`:

```ts
expect(snackbarText(snackbarStore)).toBe('Observation deleted')
pressSnackbarAction(snackbarStore)
closeSnackbar(snackbarStore)
```
