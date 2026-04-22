import { Palette } from '../types'

// Light mode only. When adding dark mode, add a 'dark' key matching ColorPrimitives.
export const palette: Palette = {
  light: {
    base: {
      white: '#ffffff',
      black: '#212121',
      blackFull: '#000000',
    },
    grey: {
      50: '#f9fafb',
      100: '#f0f0f0',
      300: '#e6e6e6',
      500: '#939393',
      800: '#666666',
    },
    primary: {
      50: '#e8f1f8',
      200: '#b4d2e9',
      300: '#67a4d0',
      400: '#3386c1',
      500: '#0066b1',
      600: '#00538f',
      700: '#003e6b',
      800: '#002a47',
    },
    success: {
      50: '#f7fbef',
      200: '#cee2ab',
      300: '#b6d482',
      400: '#9bc454',
      500: '#85b92d',
      600: '#689023',
      700: '#50701a',
      800: '#354912',
    },
    warning: {
      200: '#fbe6a2',
      300: '#f8d972',
      400: '#f6cc41',
      500: '#f4c015',
      600: '#c2990f',
      700: '#93730b',
      800: '#634e08',
    },
    error: {
      200: '#f7bab6',
      300: '#f29891',
      400: '#ee766d',
      500: '#ea554b',
      600: '#b9443c',
      700: '#8b332d',
      800: '#5d221d',
    },
    accentLime: {
      50: '#f7fbef',
      400: '#9bc454',
    },
    accentSky: {
      50: '#f0f5ff',
      400: '#72a1fd',
    },
    rarity: {
      unknown: '#a6a6a4',
      common: '#85b92d',
      relativelyCommon: '#4ad1d6',
      rare: '#f4c015',
      veryRare: '#ea554b',
    },
    validation: {
      unknown: '#777777',
      accepted: '#85b92d',
      plausible: '#0066b1',
      automatic: '#777777',
      pending: '#f4c015',
      rejected: '#ea554b',
      cannotBeValidated: '#777777',
    },
    speciesStatus: {
      unknown: '#a6a6a4',
      insufficientData: '#a6a6a4',
      native: '#85b92d',
      exoticEtc: '#ea554b',
    },
  },
}
