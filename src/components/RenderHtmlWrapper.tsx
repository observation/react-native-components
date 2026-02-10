import React from 'react'
import { Dimensions, GestureResponderEvent, Text, View } from 'react-native'

import RenderHtml, { CustomRendererProps, RenderHTMLProps, TBlock, defaultSystemFonts } from 'react-native-render-html'

import ContentImage from './ContentImage'
import Log from '../lib/Log'
import { openUrl } from '../lib/Url'
import htmlStyle from '../styles/html'
import textStyle from '../styles/text'
import theme from '../styles/theme'

const imgRenderer = ({ tnode }: { tnode: TBlock }) => {
  const { src, alt } = tnode.attributes
  Log.debug('RenderHtmlWrapper:imgRenderer', src, alt)
  if (!src) {
    return null
  }
  return <ContentImage key={src} alt={alt} src={src} />
}

const olRenderer = ({ InternalRenderer, ...props }: CustomRendererProps<TBlock>) => (
  <InternalRenderer
    {...props}
    style={{
      ...props.style,
      paddingLeft: theme.margin.large,
    }}
  />
)

const ulRenderer = ({ TNodeChildrenRenderer, ...props }: CustomRendererProps<TBlock>) => (
  <>
    {props.tnode.children.map((item, i) => (
      <View key={i} style={{ flexDirection: 'row' }}>
        <Text style={{ marginRight: theme.margin.quarter }}>•</Text>
        <TNodeChildrenRenderer tnode={item} />
      </View>
    ))}
  </>
)

const defaultRenderers = {
  img: imgRenderer,
  ol: olRenderer,
  ul: ulRenderer,
}

const defaultRenderersProps = {
  a: {
    onPress: (_event: GestureResponderEvent, href: string) => openUrl(href),
  },
}

const systemFonts = [...defaultSystemFonts, 'Ubuntu']

const RenderHtmlWrapper = ({
  contentWidth = Dimensions.get('window').width - 2 * theme.margin.common,
  renderersProps = defaultRenderersProps,
  renderers: customRenderers = {},
  baseStyle = textStyle.body,
  ...props
}: RenderHTMLProps) => {
  const mergedRenderers = {
    ...defaultRenderers,
    ...customRenderers,
  }
  return (
    <RenderHtml
      contentWidth={contentWidth}
      renderersProps={renderersProps}
      renderers={mergedRenderers}
      systemFonts={systemFonts}
      baseStyle={baseStyle}
      tagsStyles={htmlStyle}
      enableExperimentalMarginCollapsing
      {...props}
    />
  )
}

export default RenderHtmlWrapper
