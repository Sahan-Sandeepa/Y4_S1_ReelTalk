export const customStyles = {
    stackContainer: {
        maxWidth: '45rem',
        width: '100%',
        boxSizing: 'border-box',
        padding: {
            sm: '1rem',
            xs: '0',
            md: '1rem 4rem',
        },
        height: '50vh',
        overflow: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f5f5f5',
    },
    scrollbarContainer: {
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: '#f5f5f5',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
        },
    },
};