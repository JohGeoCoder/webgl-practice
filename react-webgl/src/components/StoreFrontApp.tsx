import React, { useEffect, useState } from 'react';
import { MeshObject } from '../models/MeshObject';

import {  } from 'three';


interface StoreFrontAppProps {
    onAddObject: (object: MeshObject) => void
}

export const StoreFrontApp = (props: StoreFrontAppProps) => {
    const [ screenObjects, setScreenObjects ] = useState([]);

    useEffect(() => {

    }, []);

    const init = () => {

    }

    const addObject = (object: MeshObject) => {
        props.onAddObject(object);
    }

    return <>
        <h1>Hello World!</h1>
    </>
}