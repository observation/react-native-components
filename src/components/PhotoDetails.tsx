import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import Log from '../lib/Log'
import { type Theme, useStyles, useTheme } from '../theme'

type Props = {
  /** Shown large, e.g. the species name */
  title: string
  /** Shown small above the value, e.g. "Life stage" */
  label?: string
  /** E.g. "Adult" */
  value?: string
  /** Where the photo was taken */
  location?: string
  /** Who took the photo */
  attribution?: string
}

/**
 * Details of a photo, for the footer of `PhotoGallery`: a title, a label and value, and the location and attribution.
 */
const PhotoDetails = ({ title, label, value, location, attribution }: Props) => {
  Log.trace('PhotoDetails')

  const theme = useTheme()
  const styles = useStyles(createStyles)
  const iconColor = theme.color.icon.system.subtler

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {(!!label || !!value) && (
        <View>
          {!!label && <Text style={theme.text.subLabel}>{label}</Text>}
          {!!value && <Text style={styles.value}>{value}</Text>}
        </View>
      )}

      {(!!location || !!attribution) && (
        <View>
          {!!location && (
            <IconText
              icon={<Icon name="map-marker-alt" style="solid" size={theme.icon.size.m} color={iconColor} />}
              text={location}
              style={{ textStyle: theme.text.light }}
            />
          )}
          {!!attribution && (
            <IconText
              icon={<Icon name="user" style="solid" size={theme.icon.size.m} color={iconColor} />}
              text={attribution}
              style={{ textStyle: theme.text.light }}
            />
          )}
        </View>
      )}
    </View>
  )
}

export default PhotoDetails

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      gap: theme.margin.common,
    },
    title: {
      ...theme.font.largeBold,
      color: theme.color.text.system.staticWhite,
    },
    value: {
      ...theme.text.body,
      color: theme.color.text.system.staticWhite,
    },
  })
  return styles
}
