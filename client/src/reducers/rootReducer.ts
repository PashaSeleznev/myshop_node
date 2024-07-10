import { shopCartReducer } from "./shopCartReducer";
import { filterReducer } from "./filterReducer";
import { combineReducers } from "redux";
import { accountReducer } from "./accountReducer";

export const rootReducer = combineReducers ({
    shopCart: shopCartReducer,
    filter: filterReducer,
    account: accountReducer
})