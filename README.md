# react-native-components

React Native component library for components used by React Native applications of Observation.org.
There are 2 kinds of components:
UI components:

- `Accordion`
- `BackButton`
- `BackgroundImage`
- `BottomSheet`
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
- `HtmlContent (+ HtmlContentProps)`
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
- `Popup`
- `ProgressBar`
- `ProgressBarList`
- `Rarity`
- `RaritySlider`
- `SectionHeader`
- `SingleLine`
- `TextLink`
- `Tooltip (+ TooltipProps)`
- `WebLink`

non-UI components:

- `Log.setLogConfiguration`: A function to change the logging of the component library
- `openUrl`: Opens URLs
- `useBottomSheetBackHandler`: A hook to close a BottomSheet on the Android hardware back button
- `useShowBlurView`: A safe way to set a blur on the background

Additionally, the package exposes two subpath entry points:

`react-native-components/theme`:

- `ThemeProvider`, `useTheme`, `useStyles`
- `createTheme`, `defaultTheme`: The default theme with colors, margins and text styles

`react-native-components/styles`:

- `font`, `fontSize`, `lineHeight`: Font styles
- `layout`, `rounded`, `shadow`: Layout styles
- `createInputStyles`, `createBottomSheetStyles`
