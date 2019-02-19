import { Action, Dispatch } from 'redux';

import { MeshObject } from '../models/MeshObject';

export enum StoreFrontActions {
    ADD_OBJECT = '[StoreFront] Add Object'
}

export class AddObjectAction implements Action<string> {
    public readonly type = StoreFrontActions.ADD_OBJECT;
    constructor(public payload: MeshObject){}
}

export type StoreFrontActionsUnion = AddObjectAction;

export const addObject = (object: MeshObject) => new AddObjectAction(object);

export const actions = {
    addObject
}