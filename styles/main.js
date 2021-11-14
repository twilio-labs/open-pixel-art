import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  '*': {
    boxSizing: 'border-box'
  },
  '*:before': {
    boxSizing: 'border-box'
  },
  '*:after': {
    boxSizing: 'border-box'
  },
  html: {
    margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    padding: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    overflowX: 'auto'
  },
  body: {
    margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    padding: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
    overflowX: 'auto'
  },
  header: {
    marginTop: [{ unit: 'px', value: 20 }],
    // px(or pixel) is the standard sizing unit. You can learn more here: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
    textAlign: 'center',
    paddingLeft: [{ unit: 'px', value: 20 }],
    paddingRight: [{ unit: 'px', value: 20 }]
  },
  logo: {
    maxWidth: [{ unit: 'px', value: 800 }],
    maxHeight: [{ unit: 'px', value: 250 }]
  },
  'nav-list': {
    listStyle: 'none',
    paddingLeft: [{ unit: 'px', value: 0 }],
    padding: [{ unit: 'px', value: 20 }, { unit: 'px', value: 20 }, { unit: 'px', value: 20 }, { unit: 'px', value: 20 }],
    paddingBottom: [{ unit: 'px', value: 0 }]
  },
  'nav-item': {
    display: 'inline-block'
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: [{ unit: 'px', value: 20 }, { unit: 'px', value: 20 }, { unit: 'px', value: 20 }, { unit: 'px', value: 20 }]
  },
  'main > section': {
    width: [{ unit: '%H', value: 1 }]
  },
  '#canvas': {
    maxWidth: [{ unit: 'px', value: 800 }],
    maxHeight: [{ unit: 'px', value: 800 }],
    margin: [{ unit: 'px', value: 20 }, { unit: 'px', value: 20 }, { unit: 'px', value: 20 }, { unit: 'px', value: 20 }],
    display: 'flex',
    justifyContent: 'center'
  },
  '#canvas svg': {
    width: [{ unit: '%H', value: 1 }],
    height: [{ unit: '%V', value: 1 }]
  },
  'nes-btn': {
    marginBottom: [{ unit: 'px', value: 10 }]
  },
  'nes-container': {
    margin: [{ unit: 'px', value: 20 }, { unit: 'px', value: 20 }, { unit: 'px', value: 20 }, { unit: 'px', value: 20 }],
    maxWidth: [{ unit: 'px', value: 800 }]
  },
  'nes-containeris-dark': {
    marginBottom: [{ unit: 'px', value: 20 }]
  },
  footer: {
    marginBottom: [{ unit: 'px', value: 60 }]
  },
  'footer p': {
    fontFamily: ''Press Start 2P', cursive',
    fontSize: [{ unit: 'em', value: 0.8 }],
    paddingLeft: [{ unit: 'px', value: 20 }],
    paddingRight: [{ unit: 'px', value: 20 }]
  },
  h1: {
    fontFamily: ''Press Start 2P', cursive'
  },
  h2: {
    fontFamily: ''Press Start 2P', cursive'
  },
  h3: {
    fontFamily: ''Press Start 2P', cursive'
  },
  'p': {
    fontFamily: ''Open Sans', sans-serif'
  },
  'p code': {
    fontFamily: 'monospace'
  },
  'text-center': {
    textAlign: 'center'
  },
  'twilio-link': {
    color: '#f22f46'
  },
  'screenreader-only': {
    opacity: '0.01',
    width: [{ unit: 'px', value: 1 }],
    height: [{ unit: 'px', value: 1 }],
    zIndex: '-1'
  },
  'screenreader-only:hover': {
    cursor: 'arrow'
  },
  'screenreader-only:link': {
    cursor: 'arrow'
  },
  'screenreader-only:visited': {
    cursor: 'arrow'
  },
  'twilio-pixel': {
    width: [{ unit: 'px', value: 32 }],
    height: [{ unit: 'px', value: 32 }]
  },
  'footer-icons': {
    display: 'flex',
    justifyContent: 'center'
  },
  'footer-icons > a': {
    display: 'block',
    marginLeft: [{ unit: 'px', value: 10 }],
    marginRight: [{ unit: 'px', value: 10 }]
  },
  '#contributor-name': {
    color: 'pink',
    fontWeight: 'bold',
    padding: [{ unit: 'px', value: 0 }, { unit: 'px', value: 5 }, { unit: 'px', value: 0 }, { unit: 'px', value: 5 }],
    border: [{ unit: 'px', value: 1 }, { unit: 'string', value: 'solid' }, { unit: 'string', value: 'black' }]
  },
  'tooltip-name': {
    padding: [{ unit: 'px', value: 4 }, { unit: 'px', value: 10 }, { unit: 'px', value: 4 }, { unit: 'px', value: 10 }],
    background: 'white',
    color: 'black',
    transform: 'translateX(-100%) translateY(-100%)',
    position: 'absolute',
    fontSize: [{ unit: 'px', value: 10 }],
    border: [{ unit: 'px', value: 1 }, { unit: 'string', value: 'solid' }, { unit: 'string', value: 'black' }]
  },
  pixel: {
    transition: 'all 0.4s ease-in-out'
  },
  hidden: {
    display: 'none'
  }
});
