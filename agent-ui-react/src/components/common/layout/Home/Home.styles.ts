import { tokens } from '@fluentui/react-components';
import type { GriffelStyle } from '@fluentui/react-components';

export const homeStyles: Record<string, GriffelStyle> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  navBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '36px',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxSizing: 'border-box',
    flexShrink: 0,
    backgroundColor: tokens.colorBrandBackground,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  navBarTitle: {
    margin: 0,
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  assistantToggleButton: {
    minWidth: '28px',
    width: '28px',
    height: '28px',
    border: 'none',
    borderRadius: 0,
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.7)',
    ':hover': {
      backgroundColor: 'transparent',
      color: '#ffffff',
    },
  },
  assistantToggleButtonActive: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'transparent',
      color: '#ffffff',
    },
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  assistantContainer: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    overflow: 'hidden',
  },
  assistantContainerHidden: {
    display: 'none',
  },
};
