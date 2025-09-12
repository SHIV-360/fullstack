
export type Theme = {
  name: string;
  label: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
};

export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  // Catppuccin Palette
  rosewater: string;
  flamingo: string;
  pink: string;
  mauve: string;
  red: string;
  maroon: string;
  peach: string;
  yellow: string;
  green: string;
  teal: string;
  sky: string;
  sapphire: string;
  blue: string;
  lavender: string;
};

// Catppuccin Theme
export const themes: Theme[] = [
  {
    name: 'catppuccin',
    label: 'Catppuccin',
    colors: {
      // Latte
      light: {
        background: '220 13% 96%', // #eff1f5
        foreground: '225 10% 30%', // #4c4f69
        card: '220 17% 93%', // #ccd0da
        cardForeground: '225 10% 30%', // #4c4f69
        popover: '220 17% 93%', // #ccd0da
        popoverForeground: '225 10% 30%', // #4c4f69
        primary: '221 83% 53%', // #1e66f5 (Blue)
        primaryForeground: '0 0% 100%', // White
        secondary: '220 13% 86%', // #bcc0cc
        secondaryForeground: '225 10% 30%', // #4c4f69
        muted: '220 13% 86%', // #bcc0cc
        mutedForeground: '226 8% 44%', // #6c6f85
        accent: '21 99% 51%', // #fe640b (Orange)
        accentForeground: '225 10% 30%', // #4c4f69
        destructive: '351 89% 41%', // #d20f39 (Red)
        destructiveForeground: '0 0% 100%', // white
        border: '220 13% 86%', // #bcc0cc
        input: '220 17% 93%', // #ccd0da
        ring: '221 83% 53%', // #1e66f5 (Blue)
        // Catppuccin Latte Palette
        rosewater: '353 84% 72%', // Not in table, keeping old
        flamingo: '3 82% 67%', // Not in table, keeping old
        pink: '333 79% 74%', // #ea76cb
        mauve: '266 82% 63%', // #8839ef
        red: '351 89% 41%', // #d20f39
        maroon: '355 78% 58%', // Not in table, keeping old
        peach: '21 99% 51%', // #fe640b
        yellow: '39 88% 52%', // #df8e1d
        green: '135 60% 42%', // #40a02b
        teal: '183 72% 43%', // Not in table, keeping old
        sky: '197 98% 46%', // #04a5e5
        sapphire: '208 81% 56%', // Not in table, keeping old
        blue: '221 83% 53%', // #1e66f5
        lavender: '246 84% 77%', // Not in table, keeping old
      },
      // Mocha
      dark: {
        background: '240 10% 15%', // #1e1e2e
        foreground: '224 44% 86%', // #cdd6f4
        card: '240 7% 18%', // #313244
        cardForeground: '224 44% 86%', // #cdd6f4
        popover: '240 7% 18%', // #313244
        popoverForeground: '224 44% 86%', // #cdd6f4
        primary: '272 49% 79%', // #cba6f7 (Mauve)
        primaryForeground: '240 10% 15%', // #1e1e2e
        secondary: '240 6% 23%', // #45475a
        secondaryForeground: '224 44% 86%', // #cdd6f4
        muted: '240 7% 18%', // #313244
        mutedForeground: '225 21% 62%', // #8c8fa1
        accent: '28 85% 73%', // #fab387 (Peach)
        accentForeground: '240 10% 15%', // #1e1e2e
        destructive: '352 83% 74%', // #f38ba8 (Red)
        destructiveForeground: '240 10% 15%', // #1e1e2e
        border: '240 6% 23%', // #45475a
        input: '240 7% 18%', // #313244
        ring: '272 49% 79%', // #cba6f7 (Mauve)
        // Catppuccin Mocha Palette
        rosewater: '10 56% 95%', // Not in table, keeping old
        flamingo: '0 85% 82%', // Not in table, keeping old
        pink: '332 83% 86%', // #f5c2e7
        mauve: '272 49% 79%', // #cba6f7
        red: '352 83% 74%', // #f38ba8
        maroon: '348 63% 79%', // Not in table, keeping old
        peach: '28 85% 73%', // #fab387
        yellow: '48 90% 80%', // #f9e2af
        green: '115 54% 76%', // #a6e3a1
        teal: '188 58% 73%', // #89dceb
        sky: '190 68% 76%', // Not in table, keeping old
        sapphire: '200 78% 75%', // Not in table, keeping old
        blue: '217 83% 78%', // #89b4fa
        lavender: '231 95% 85%', // Not in table, keeping old
      },
    },
  },
  {
    name: 'evergreen',
    label: 'Evergreen',
    colors: {
      light: { // Placeholder for dark-mode only theme
        background: '160 88% 4%',
        foreground: '158 80% 85%',
        card: '0 0% 0%',
        cardForeground: '158 80% 85%',
        popover: '160 88% 4%',
        popoverForeground: '158 80% 85%',
        primary: '158 98% 40%',
        primaryForeground: '0 0% 0%',
        secondary: '156 88% 15%',
        secondaryForeground: '158 80% 85%',
        muted: '156 88% 15%',
        mutedForeground: '157 40% 60%',
        accent: '159 90% 57%',
        accentForeground: '0 0% 0%',
        destructive: '0 84% 60%',
        destructiveForeground: '0 0% 100%',
        border: '155 80% 25%',
        input: '155 80% 25%',
        ring: '158 98% 40%',
        rosewater: '0 84% 60%',
        flamingo: '0 84% 60%',
        pink: '316 72% 69%',
        mauve: '267 84% 75%',
        red: '0 84% 60%',
        maroon: '0 84% 60%',
        peach: '35 92% 56%',
        yellow: '43 89% 61%',
        green: '158 98% 40%',
        teal: '159 90% 57%',
        sky: '197 97% 54%',
        sapphire: '208 81% 56%',
        blue: '220 91% 64%',
        lavender: '246 84% 77%',
      },
      dark: {
        background: '200 13% 20%', // #2d353b
        foreground: '43 27% 84%', // #d3c6aa
        card: '200 13% 18%', // #232a2e
        cardForeground: '43 27% 84%',
        popover: '200 13% 18%',
        popoverForeground: '43 27% 84%',
        primary: '80 34% 60%', // #a7c080 (Green)
        primaryForeground: '200 13% 18%',
        secondary: '200 13% 23%', // #343f44
        secondaryForeground: '43 27% 84%',
        muted: '200 13% 23%',
        mutedForeground: '200 8% 58%', // #859289 (Gray)
        accent: '97 34% 60%', // #83c092
        accentForeground: '200 13% 18%',
        destructive: '359 66% 69%', // #e67e80 (Red)
        destructiveForeground: '0 0% 100%',
        border: '200 13% 23%',
        input: '200 13% 23%',
        ring: '80 34% 60%',
        // Mapped from table
        rosewater: '359 66% 69%',
        flamingo: '359 66% 69%',
        pink: '316 72% 69%', // Not in table
        mauve: '319 45% 72%', // #d699b6 (Purple)
        red: '359 66% 69%', // #e67e80
        maroon: '0 84% 60%', // Not in table
        peach: '20 65% 74%', // #e69875 (Orange)
        yellow: '44 59% 67%', // #dbbc7f
        green: '80 34% 60%', // #a7c080
        teal: '97 34% 60%', // #83c092
        sky: '197 97% 54%', // Not in table
        sapphire: '196 28% 68%', // #7fbbb3 (Blue)
        blue: '196 28% 68%',
        lavender: '246 84% 77%', // Not in table
      },
    },
  },
   {
    name: 'tokyo-night',
    label: 'Tokyo Night',
    colors: {
      light: { // Using Tokyo Night Light from table
        background: '228 13% 92%', // #e6e7ed
        foreground: '226 23% 28%', // #343b58
        card: '0 0% 100%',
        cardForeground: '226 23% 28%',
        popover: '0 0% 100%',
        popoverForeground: '226 23% 28%',
        primary: '218 64% 41%', // #2959aa (Blue)
        primaryForeground: '0 0% 100%',
        secondary: '226 8% 85%', // #d4d5d9
        secondaryForeground: '226 23% 28%',
        muted: '226 8% 85%',
        mutedForeground: '228 5% 43%', // #6c6e75 (Gray)
        accent: '272 38% 46%', // #5a3e8e (Purple)
        accentForeground: '0 0% 100%',
        destructive: '352 32% 40%', // #8c4351 (Red)
        destructiveForeground: '0 0% 100%',
        border: '226 8% 85%',
        input: '0 0% 100%',
        ring: '218 64% 41%',
        // Mapped from table
        rosewater: '353 84% 72%', // Not in table
        flamingo: '3 82% 67%', // Not in table
        pink: '316 72% 69%', // Not in table
        mauve: '272 38% 46%', // #5a3e8e (Purple)
        red: '352 32% 40%', // #8c4351
        maroon: '355 78% 58%', // Not in table
        peach: '22 61% 37%', // #965027 (Orange)
        yellow: '41 73% 32%', // #8f5e15
        green: '99 71% 21%', // #385f0d
        teal: '183 72% 43%', // Not in table
        sky: '202 75% 25%', // #0f4b6e (Cyan)
        sapphire: '208 81% 56%', // Not in table
        blue: '218 64% 41%', // #2959aa
        lavender: '246 84% 77%', // Not in table
      },
      dark: {
        background: '235 28% 13%', // #1a1b26
        foreground: '226 25% 76%', // #a9b1d6
        card: '234 30% 15%', // #24283b (Storm Background)
        cardForeground: '226 25% 76%', // #a9b1d6
        popover: '234 30% 15%',
        popoverForeground: '226 25% 76%',
        primary: '214 96% 73%', // #7aa2f7 (Blue)
        primaryForeground: '235 28% 13%',
        secondary: '235 28% 25%', // Darker blue for hover
        secondaryForeground: '0 0% 100%',
        muted: '234 30% 15%',
        mutedForeground: '227 16% 47%', // #565f89 (Comment)
        accent: '277 90% 79%', // #bb9af7 (Purple)
        accentForeground: '235 28% 13%',
        destructive: '353 91% 73%', // #f7768e (Red)
        destructiveForeground: '235 28% 13%',
        border: '227 16% 47%',
        input: '234 30% 15%',
        ring: '214 96% 73%',
        // Mapped from table
        rosewater: '353 84% 72%', // Not in table
        flamingo: '3 82% 67%', // Not in table
        pink: '316 72% 69%', // Not in table
        mauve: '277 90% 79%', // #bb9af7
        red: '353 91% 73%', // #f7768e
        maroon: '355 78% 58%', // Not in table
        peach: '19 100% 70%', // #ff9e64 (Orange)
        yellow: '41 71% 64%', // #e0af68
        green: '93 54% 68%', // #9ece6a
        teal: '183 72% 43%', // Not in table
        sky: '197 100% 74%', // #7dcfff (Cyan)
        sapphire: '208 81% 56%', // Not in table
        blue: '214 96% 73%', // #7aa2f7
        lavender: '246 84% 77%', // Not in table
      }
    }
  },
  {
    name: 'nord',
    label: 'Nord',
    colors: {
      light: {
        background: '220 23% 96%', // #ECEFF4
        foreground: '214 36% 28%', // #2A4763
        card: '0 0% 100%',
        cardForeground: '214 36% 28%',
        popover: '0 0% 100%',
        popoverForeground: '214 36% 28%',
        primary: '210 21% 58%', // #7E95AB
        primaryForeground: '214 36% 28%',
        secondary: '212 25% 90%', // #DDE2EC
        secondaryForeground: '214 36% 28%',
        muted: '212 25% 90%',
        mutedForeground: '215 15% 45%', // Lighter version of foreground
        accent: '44 19% 55%', // #9E9079
        accentForeground: '0 0% 100%',
        destructive: '0 72% 51%', // Nord's "aurora red"
        destructiveForeground: '0 0% 100%',
        border: '214 20% 85%', // #D8DEE9
        input: '214 20% 85%',
        ring: '210 21% 58%',
        // Placeholder palette
        rosewater: '0 72% 51%',
        flamingo: '0 72% 51%',
        pink: '316 72% 69%',
        mauve: '267 84% 75%',
        red: '0 72% 51%',
        maroon: '0 72% 51%',
        peach: '35 92% 56%',
        yellow: '43 89% 61%',
        green: '146 59% 49%', // Nord's "aurora green"
        teal: '183 72% 43%',
        sky: '208 30% 70%',
        sapphire: '210 21% 58%',
        blue: '210 39% 48%',
        lavender: '246 84% 77%',
      },
      dark: { // Placeholder for light-mode only theme
        background: '220 23% 96%',
        foreground: '214 36% 28%',
        card: '0 0% 100%',
        cardForeground: '214 36% 28%',
        popover: '0 0% 100%',
        popoverForeground: '214 36% 28%',
        primary: '210 21% 58%',
        primaryForeground: '214 36% 28%',
        secondary: '212 25% 90%',
        secondaryForeground: '214 36% 28%',
        muted: '212 25% 90%',
        mutedForeground: '215 15% 45%',
        accent: '44 19% 55%',
        accentForeground: '0 0% 100%',
        destructive: '0 72% 51%',
        destructiveForeground: '0 0% 100%',
        border: '214 20% 85%',
        input: '214 20% 85%',
        ring: '210 21% 58%',
        rosewater: '0 72% 51%',
        flamingo: '0 72% 51%',
        pink: '316 72% 69%',
        mauve: '267 84% 75%',
        red: '0 72% 51%',
        maroon: '0 72% 51%',
        peach: '35 92% 56%',
        yellow: '43 89% 61%',
        green: '146 59% 49%',
        teal: '183 72% 43%',
        sky: '208 30% 70%',
        sapphire: '210 21% 58%',
        blue: '210 39% 48%',
        lavender: '246 84% 77%',
      }
    }
  }
];
