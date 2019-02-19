import { StoreFrontActions, StoreFrontActionsUnion } from '../actions/storeFront.actions';
import { MeshObject } from '../models/MeshObject';

export const screenObjectsReducer = (state: MeshObject[] = [], action: StoreFrontActionsUnion) => {
    switch(action.type){
        case StoreFrontActions.ADD_OBJECT:
            return state.concat(action.payload);
        default:
            return state;
    }
}