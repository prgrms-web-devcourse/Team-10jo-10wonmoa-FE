import '@emotion/react';
import { string } from 'prop-types';

declare module '@emotion/react' {
  export interface Theme {
    $primary: string;
    $secondary: string;
    $red: string;
    $blue: string;
    $white: string;
    $green: string;
    $background: string;
    $text_black: string;
    $black: string;
    $gray_dark: string;
    $gray_medium: string;
    $gray_light: string;
    $gray_accent: string;

    $chart_red: string;
    $chart_orange: string;
    $chart_yellow: string;
    $chart_lemon: string;
    $chart_lime: string;
    $chart_green: string;
    $chart_aqua: string;
    $chart_blue: string;
    $chart_purple: string;
    $chart_pink: string;
    $font_xs: string;
    $font_sm: string;
    $font_md: string;
    $font_lg: string;
    $font_xlg: string;
    $font_xxlg: string;
  }
}
