import { styled } from '@storybook/theming';

const Table = styled.table(() => ({
    borderCollapse: 'collapse',
    borderSpacing: 0,
    minWidth: 700,
    tableLayout: 'fixed',
    textAlign: 'left',
    width: '100%',

    'thead > tr': {
      display: 'flex'
    },

    'tbody > tr': {
      borderTop: `1px solid #eeeeee`,
      display: 'flex',

      ':first-of-type': {
        borderTopColor: '#aeaeae'
      },

      ':last-of-type': {
        borderBottom: '1px solid #aeaeae'
      }
    },

    'td, th': {
      border: 'none',
      textOverflow: 'ellipsis',
      verticalAlign: 'middle',

      ':nth-of-type(1)': {
        flexBasis: '20%',
        flexGrow: 1,
        flexShrink: 0
      },
      ':nth-of-type(2)': {
        flexBasis: '40%',
        flexGrow: 0,
        flexShrink: 0
      },
      ':nth-of-type(3)': {
        flexBasis: '25%',
        flexGrow: 0,
        flexShrink: 0
      },
      ':nth-of-type(4)': {
        flexBasis: '15%',
        flexGrow: 0,
        flexShrink: 0
      }
    },

    th: {
      paddingBottom: 12,
      paddingTop: 15,
      paddingLeft: 5,
      
      
    },

    td: {
      overflow: 'hidden',
      paddingBottom: 8,
      paddingTop: 8,
      alignItems: 'center',

      ':not(:last-of-type)': {
        paddingRight: 15
      },

      svg: {
        maxWidth: '100%',
        maxHeight: '100%'
      },

      span: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        padding: '5px'
      }
    }
}));

export default Table;