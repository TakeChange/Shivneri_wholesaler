import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        toggleColor: (state, action) => {
            const id = action.payload.id;
            const currentColor = state[id] || '#23AA49'; // default color
            state[id] = currentColor === '#23AA49' ? 'red' : '#23AA49';
        },
    },
});

export const { toggleColor } = colorSlice.actions;
export default colorSlice.reducer;
