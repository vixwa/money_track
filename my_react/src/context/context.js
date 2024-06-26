import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer'
const initialState = JSON.parse(localStorage.getItem('transactions'))|| [];

export const ExpenseTrackerContext = createContext (initialState);

export const Provider = ({children}) =>{
    const [transactions , dispatch] = useReducer(contextReducer, initialState);
    const deleteTransaction = (id) => {
        dispatch({type:'DELETE_TRANSACTION',payload : id});

    }
    const addTransaction = (transactions) =>{
        dispatch({type: 'ADD_TRANSACTION',payload : transactions});
    }
    const balance = transactions.reduce((acc,currVal)=>{
        return(currVal.type === 'Expense'? acc - currVal.amount : acc+currVal.amount);
    },0);
    return(
        <ExpenseTrackerContext.Provider value ={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance

        }}> 
            {children}
        </ExpenseTrackerContext.Provider>
    )
}