import { ADD_TO_BILL } from "../../constant/Constants";

const initialState = {
  billItems: []
};

export const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BILL:
      return {
        ...state,
        billItems: [...state.billItems, action.payload]
      };
    default:
      return state;
  }
};
