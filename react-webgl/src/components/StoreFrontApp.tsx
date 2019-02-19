import React, { useEffect } from 'react';
import { MeshObject } from '../models/MeshObject';


interface StoreFrontAppProps {
    onAddObject: (object: MeshObject) => void
}

export const StoreFrontApp = (props: StoreFrontAppProps) => {
    useEffect(() => {

    }, []);

    const addObject = (object: MeshObject) => {
        props.onAddObject(object);
    }

    return <>
        <h1>Hello World!</h1>
    </>
}