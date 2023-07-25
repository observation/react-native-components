import React, { useState } from 'react'
import { View } from 'react-native'

// @ts-ignore
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

import Log from '../lib/Log'
import { unsafeLayoutAnimation } from '../lib/Utils'

type Item = {
  title: string
}

type Props<T extends Item> = {
  list: T[]
  header: (item: T, index: number, isActive: boolean) => void
  footer: (item: T, index: number, isActive: boolean) => void
  body: (item: T) => JSX.Element
  onOpen: (index: number) => void
  ListEmptyComponent?: () => JSX.Element
}

const Accordion = <T extends Item>({ list, header, footer, body, onOpen, ListEmptyComponent }: Props<T>) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const onToggle = (index: number, isExpanded: boolean) => {
    Log.debug('Accordion:onToggle', index, isExpanded)
    unsafeLayoutAnimation('Accordion:onToggle')
    if (isExpanded) {
      setActiveIndex(index)
      onOpen(index)
    } else if (activeIndex === index) {
      setActiveIndex(null)
    }
  }

  return (
    <View>
      {list.length === 0
        ? ListEmptyComponent?.()
        : list.map((item, index: number) => (
            <Collapse
              key={item.title}
              isExpanded={index === activeIndex}
              onToggle={(isExpanded: boolean) => onToggle(index, isExpanded)}
            >
              <CollapseHeader>
                <>
                  {header(item, index, index === activeIndex)}
                  {footer(item, index, index === activeIndex)}
                </>
              </CollapseHeader>
              <CollapseBody>{body(item)}</CollapseBody>
            </Collapse>
          ))}
    </View>
  )
}

export default Accordion
