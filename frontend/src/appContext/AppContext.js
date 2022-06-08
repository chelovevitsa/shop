import React from 'react';

const AppContext = React.createContext({
    logged: false,
    admin: false,
});

export default AppContext;