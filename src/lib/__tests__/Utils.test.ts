import { describe, expect, test } from '@jest/globals'

import { capitalize } from '../Utils'

describe('Utils', () => {
  test('capitalize', () => {
    expect(capitalize('')).toBe('')
    expect(capitalize('a')).toBe('A')
    expect(capitalize('A')).toBe('A')
    expect(capitalize('abc')).toBe('Abc')
    expect(capitalize('ABC')).toBe('ABC')
    expect(capitalize('aBC')).toBe('ABC')
    expect(capitalize('ábc')).toBe('Ábc')
  })
})
