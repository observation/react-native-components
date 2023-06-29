import React from 'react'

const getIconType = (prefix) => {
  switch (prefix) {
    case 'fas':
      return 'solid'
    case 'fal':
      return 'light'
    default:
      throw new Error()
  }
}

const Icon = "Icon"

module.exports = {
  FontAwesomeIcon: (faIcon) => (
    <Icon
      testID={faIcon.testID}
      color={faIcon.color}
      name={faIcon.icon.iconName}
      size={faIcon.size}
      style={faIcon.style}
      type={getIconType(faIcon.icon.prefix)}
    />
  ),
}