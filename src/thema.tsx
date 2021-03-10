import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
      fontSize: 20,
    },
    // レスポンシブのブレイクポイント
    'breakpoints': {
      'keys': [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
      ],
      'values': {
        'xs': 360, // スマホ用
        'sm': 768, // タブレット用
        'md': 992, // PC用
        'lg': 1400,
        'xl': 1800,
      },
    },
  });

export default theme;