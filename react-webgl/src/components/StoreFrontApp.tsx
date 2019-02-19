import React, { useEffect, useState } from 'react';
import { MeshObject } from '../models/MeshObject';

import { PerspectiveCamera, Scene, Mesh, WebGLRenderer, BoxGeometry, MeshNormalMaterial } from 'three';


interface StoreFrontAppProps {
    onAddObject: (object: MeshObject) => void
}

export const StoreFrontApp = (props: StoreFrontAppProps) => {
    const [ screenObjects, setScreenObjects ] = useState([]);
    //const [ camera, setCamera ] = useState({});

    var camera: any, scene: any, renderer: any;
    var geometry: any, material: any, mesh: any;

    var cameraX: any, cameraY: any, cameraZ: any;

    useEffect(() => {
        init();
		animate();
    }, []);

    const init = () => {
        //setCamera(new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10));
        var canvasContainer: any = document.getElementById('canvasContainer');

        camera = new PerspectiveCamera( 70, 500 / 500, 0.01, 10 );

        cameraX = 1;
        cameraY = 1;
        cameraZ = 1.5;

        //camera.position.z = 1;

        scene = new Scene();

        geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
        material = new MeshNormalMaterial();

        mesh = new Mesh( geometry, material );
        scene.add( mesh );

        renderer = new WebGLRenderer( { antialias: true } );
        renderer.setSize( 500, 500 );
        
        canvasContainer.appendChild(renderer.domElement);

        //document.body.appendChild( renderer.domElement );
    }

    const animate = () => {
        requestAnimationFrame( animate );

        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.02;

        cameraX -= 0.01;
        //cameraY -= 0.01;
        cameraZ -= 0.01;
        
        camera.position.set( cameraX, cameraY, cameraZ );
        // camera.position.x = cameraX;
        // camera.position.y = cameraY;
        // camera.position.z = cameraZ;
        camera.lookAt( 0, 0, 0 );

        renderer.render( scene, camera );
    }

    const addObject = (object: MeshObject) => {
        props.onAddObject(object);
    }

    return <>
        <h1>Hello World!</h1>
        <div id="canvasContainer"></div>
    </>
}