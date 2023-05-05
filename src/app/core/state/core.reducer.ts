import { createFeatureSelector, createSelector, createAction, createReducer, on, props } from "@ngrx/store";
import { CoreState } from "./app.state";

const sidebarLockedStorageKey = 'sidebarLocked';

const initialState: CoreState = {
    sidebarLocked: localStorage.getItem(sidebarLockedStorageKey) === 'true'
};

const getCoreState = createFeatureSelector<CoreState>('core');

export const getSidebarLocked = createSelector(
    getCoreState,
    state => state.sidebarLocked
);

export const changeSidebarLocked = createAction(
    'app/core/change-sidebar-locked',
    props<{ sidebarLocked: boolean }>()
);

export const coreReducer = createReducer<CoreState>(
    initialState,
    on(changeSidebarLocked, (state, action): CoreState => {
        localStorage.setItem(sidebarLockedStorageKey, action.sidebarLocked.toString());
        return {
            ...state,
            sidebarLocked: action.sidebarLocked
        }
    })
);