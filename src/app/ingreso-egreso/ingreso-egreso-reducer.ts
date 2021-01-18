import * as fromIngresoEgreso  from './ingreso-egreso-actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';


export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

export interface AppEgresoIngresoState extends AppState {
    ingresoEgreso: IngresoEgresoState;
}

const initialState: IngresoEgresoState = {
    items: []
}

export function IngresoEgresoReducer( state = initialState, action: fromIngresoEgreso.acciones): IngresoEgresoState {
    
    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item => {
                        return { ...item }
                    })
                ]
            };
        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            }
        default:
            return state
    }
}