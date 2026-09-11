import React, { useMemo } from 'react'
import { Dimensions, GestureResponderEvent, Text, View } from 'react-native'

import RenderHtml, {
  CustomRendererProps,
  MixedStyleDeclaration,
  RenderHTMLProps,
  TBlock,
  defaultSystemFonts,
} from 'react-native-render-html'

import ContentImage from './ContentImage'
import Log from '../lib/Log'
import { openUrl } from '../lib/Url'
import { useTheme } from '../theme'

type HtmlContentProps =
  | ({ html: string; source?: never } & Omit<RenderHTMLProps, 'source'>)
  | ({ source: RenderHTMLProps['source']; html?: never } & Omit<RenderHTMLProps, 'source'>)

const useHtmlStyles = (): Readonly<Record<string, MixedStyleDeclaration>> => {
  Log.trace('HtmlContent:useHtmlStyles')
  const theme = useTheme()
  return {
    h1: {
      ...(theme.text.title as MixedStyleDeclaration),
      marginTop: 0,
      marginBottom: 0,
    },

    h2: {
      ...(theme.text.subtitle as MixedStyleDeclaration),
      marginTop: theme.margin.common,
      marginBottom: 0,
    },

    h3: {
      ...(theme.text.lead as MixedStyleDeclaration),
      marginTop: theme.margin.common,
      marginBottom: 0,
    },

    ul: {
      marginTop: theme.margin.common,
      paddingLeft: theme.margin.common,
      marginBottom: theme.margin.half,
    },

    ol: {
      marginTop: theme.margin.common,
      paddingLeft: theme.margin.common,
      marginBottom: theme.margin.half,
    },

    li: {
      marginBottom: theme.margin.half,
    },

    a: {
      color: theme.color.text.system.link,
      textDecorationLine: 'none',
    },
  }
}

const ImgRenderer = ({ tnode }: { tnode: TBlock }) => {
  Log.trace('HtmlContent:ImgRenderer')
  const { src, alt } = tnode.attributes
  if (!src) {
    return null
  }
  return <ContentImage key={src} alt={alt} src={src} />
}

const OlRenderer = ({ InternalRenderer, ...props }: CustomRendererProps<TBlock>) => {
  Log.trace('HtmlContent:OlRenderer')
  const theme = useTheme()
  return (
    <InternalRenderer
      {...props}
      style={{
        ...props.style,
        paddingLeft: theme.margin.large,
      }}
    />
  )
}

const UlRenderer = ({ TNodeChildrenRenderer, ...props }: CustomRendererProps<TBlock>) => {
  Log.trace('HtmlContent:UlRenderer')
  const theme = useTheme()
  return (
    <>
      {props.tnode.children.map((item) => (
        <View key={item.nodeIndex} style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: theme.margin.quarter, ...theme.text.body }}>•</Text>
          <TNodeChildrenRenderer tnode={item} />
        </View>
      ))}
    </>
  )
}

const defaultRenderers = {
  img: ImgRenderer,
  ol: OlRenderer,
  ul: UlRenderer,
}

const defaultRenderersProps = {
  a: {
    onPress: (_event: GestureResponderEvent, href: string) =>
      openUrl(href).catch(() => {
        Log.warn('HtmlContent:onPress could not open url', href)
      }),
  },
}

const systemFonts = [...defaultSystemFonts, 'Ubuntu']

const HtmlContent = ({
  html,
  source,
  contentWidth,
  renderers: customRenderers = {},
  renderersProps: customRenderersProps = {},
  baseStyle,
  ...restProps
}: HtmlContentProps) => {
  Log.trace('HtmlContent')
  const theme = useTheme()
  const resolvedBaseStyle = baseStyle ?? (theme.text.body as MixedStyleDeclaration)
  const htmlStyles = useHtmlStyles()

  const resolvedContentWidth = contentWidth ?? Dimensions.get('window').width - 2 * theme.margin.double

  const resolvedSource = useMemo(() => source ?? { html }, [source, html])
  const mergedRenderers = useMemo(() => ({ ...defaultRenderers, ...customRenderers }), [customRenderers])
  const mergedRenderersProps = useMemo(
    () => ({ ...defaultRenderersProps, ...customRenderersProps }),
    [customRenderersProps],
  )
  return (
    <RenderHtml
      source={resolvedSource}
      contentWidth={resolvedContentWidth}
      renderersProps={mergedRenderersProps}
      renderers={mergedRenderers}
      systemFonts={systemFonts}
      baseStyle={resolvedBaseStyle}
      tagsStyles={htmlStyles}
      enableExperimentalMarginCollapsing
      {...restProps}
    />
  )
}

const MemoHtmlContent = React.memo(HtmlContent)
export default MemoHtmlContent
export type { HtmlContentProps }
