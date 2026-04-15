import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose }
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount
      }
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    }
  }
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit (amount, currency) {
  if(currency === 'USD') return { type: 'account/deposit', payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });

    const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`);
    const data = await response.json();

    const convertedAmount = Number((amount * data.rates['USD']).toFixed(2));

    dispatch({ type: 'account/deposit', payload: convertedAmount });
  }
}

export default accountSlice.reducer;