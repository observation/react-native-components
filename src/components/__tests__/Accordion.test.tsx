import React from 'react'
import { Text } from 'react-native'

import { fireEvent, render } from '@testing-library/react-native'

import Accordion from '../Accordion'

type AccordionItem = {
  title: string
}

const header = (item: AccordionItem) => <Text>{`Header ${item.title}`}</Text>
const footer = (item: AccordionItem) => <Text>{`Footer ${item.title}`}</Text>
const body = (item: AccordionItem) => <Text>{`Body ${item.title}`}</Text>
const onOpen = jest.fn()

const list: AccordionItem[] = [{ title: '1st item' }, { title: '2nd item' }, { title: '3rd item' }]

describe('Accordion', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('Normal render', () => {
      const { toJSON } = render(
        <Accordion<AccordionItem> list={list} header={header} footer={footer} body={body} onOpen={onOpen} />,
      )
      expect(toJSON()).toMatchSnapshot()
    })

    test('Empty list', () => {
      const { toJSON } = render(
        <Accordion<AccordionItem> list={[]} header={header} footer={footer} body={body} onOpen={onOpen} />,
      )
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Clicking on the 1st item, shows the 1st body', async () => {
      // GIVEN
      const { getByText, queryByText, toJSON } = render(
        <Accordion<AccordionItem> list={list} header={header} footer={footer} body={body} onOpen={onOpen} />,
      )

      // WHEN
      fireEvent.press(getByText('Header 1st item'))

      // THEN
      expect(onOpen).toBeCalledTimes(1)
      expect(queryByText('Body 1st item')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('Clicking on an 1st item, then the 2nd item, shows the 2nd body', async () => {
      // GIVE
      const { getByText, queryByText, toJSON } = render(
        <Accordion<AccordionItem> list={list} header={header} footer={footer} body={body} onOpen={onOpen} />,
      )

      // WHEN
      fireEvent.press(getByText('Header 1st item'))
      fireEvent.press(getByText('Header 2nd item'))

      // THEN
      expect(onOpen).toBeCalledTimes(2)
      expect(queryByText('Body 2nd item')).toBeTruthy()

      expect(toJSON()).toMatchSnapshot()
    })

    test('Clicking on an 1st item twice, shows no body', async () => {
      // GIVE
      const { queryByText, getByText, toJSON } = render(
        <Accordion<AccordionItem> list={list} header={header} footer={footer} body={body} onOpen={onOpen} />,
      )

      // WHEN
      fireEvent.press(getByText('Header 1st item'))
      fireEvent.press(getByText('Header 1st item'))

      // THEN
      expect(onOpen).toBeCalledTimes(1)
      expect(queryByText('Body 1st item')).not.toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
