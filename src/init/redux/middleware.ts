// ESlint
/* eslint-disable array-bracket-newline */

// Middlewares
import { Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

// MarkerGen import Saga or Thunk
import thunkMiddleware from 'redux-thunk';

const isDev = process.env.NODE_ENV === 'development';

// MarkerGen sagaMiddleware

const middleware: Middleware[] = [
    // MarkerGen use middleware Saga or Thunk
    thunkMiddleware,
];

isDev && middleware.push(
    createLogger({
        duration:  true,
        collapsed: true,
        colors:    {
            title:     () => '#139BFE',
            prevState: () => '#1C5FAF',
            action:    () => '#149945',
            nextState: () => '#A47104',
            error:     () => '#ff0005',
        },
    }),
);

export {
    middleware,
    // MarkerGen export sagaMiddleware
};
