import React, { useEffect, useState } from 'react';
import { MeshObject } from '../models/MeshObject';

import { PerspectiveCamera, Scene, Mesh, WebGLRenderer, 
        BoxGeometry, MeshNormalMaterial, OrthographicCamera,
        Color, Raycaster, PlaneBufferGeometry, Vector2,
        MeshBasicMaterial, GridHelper, BoxBufferGeometry } from 'three';

import DragControls from 'three-dragcontrols';


interface StoreFrontAppProps {
    onAddObject: (object: MeshObject) => void
}

export const StoreFrontApp = (props: StoreFrontAppProps) => {
    const [ screenObjects, setScreenObjects ] = useState([]);
    //const [ camera, setCamera ] = useState({});

    var camera: any, scene: any, renderer: any;
    var geometry: any, material: any, mesh: any;
    var mouse: any, raycaster: any;
    var plane: any, rollOverMesh: any;

    var canvasWidth = 1000, canvasHeight = 1000;

    var hoverObject: any = {
        object: null,
        originalColor: null,
    };

    var displayRolloverMesh = false;
    var rolloverMesh;

    var cameraX: any, cameraY: any, cameraZ: any;

    var geometryObjects: MeshObject[] = [];

    useEffect(() => {
        init();
		animate();
    }, []);

    const init = () => {
        //setCamera(new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10));
        var canvasContainer: any = document.getElementById('canvasContainer');

        //camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 10, 10000 );
        var width = 1000;
        var height = 1000;
        camera = new OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 )

        cameraX = 0;
        cameraY = 800;
        cameraZ = 0;
        camera.position.set( cameraX, cameraY, cameraZ );
        camera.lookAt( 0, 0, 0 );

        scene = new Scene();
        scene.background = new Color( 0xf0f0f0 );

        raycaster = new Raycaster();
        mouse = new Vector2();

        //Grid
        var gridHelper = new GridHelper( 1000, 20 );
        scene.add( gridHelper );

        var planeGeometry = new PlaneBufferGeometry( 1000, 1000 );
        planeGeometry.rotateX( - Math.PI / 2 );
        plane = new Mesh( planeGeometry, new MeshBasicMaterial( { visible: false } ) );
        scene.add( plane );

        var rollOverCube = new BoxBufferGeometry( 50, 50, 50 );
        var rollOverMaterial = new MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
        rollOverMesh = new Mesh( rollOverCube, rollOverMaterial );
        scene.add( rollOverMesh );        

        renderer = new WebGLRenderer( { antialias: true } );

        setCanvas();
        
        canvasContainer.appendChild(renderer.domElement);

        canvasContainer.addEventListener( 'mousemove', onCanvasMouseMove, false );
        canvasContainer.addEventListener( 'mousedown', onCanvasMouseDown, false );
        canvasContainer.addEventListener( 'resize', onWindowResize, false );
    }

    const onWindowResize = () => {
        setCanvas();
    }

    const onCanvasMouseMove = (event: any) => {
        event.preventDefault();
        setMouseProjection(event);
    }

    const onCanvasMouseDown = (event: any) => {
        event.preventDefault();

        setMouseProjection(event);

        raycaster.setFromCamera( mouse, camera );
        var geometryIntersects = raycaster.intersectObjects( geometryObjects );
        if ( geometryIntersects.length > 0 ) {
            // var geometryIntersect = geometryIntersects[ 0 ];
            // var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
            // voxel.position.copy( geometryIntersect.point ).add( geometryIntersect.face.normal );
            // voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
            // scene.add( voxel );
            // geometryObjects.push( voxel );
        }
        else{
            //Check if the mouse ray intersects with the plane.
            var planeIntersects = raycaster.intersectObjects([plane]);

            //If the mouse intersects with the plane, display the ghost cube at the position.
            if ( planeIntersects.length > 0 ) {
                var planeIntersect = planeIntersects[ 0 ];

                var cubeGeo = new BoxBufferGeometry( 50,50,50 );
                var cubeMaterial = new MeshBasicMaterial( { color: 0x00ff00 });
                var newCube = new Mesh(cubeGeo, cubeMaterial);
                newCube.position.copy( planeIntersect.point ).add( planeIntersect.face.normal );

                new DragControls([newCube], camera, renderer.domElement);

                scene.add(newCube);
                geometryObjects.push(newCube);
            }
        }
    }

    const setMouseProjection = (event: any) => {
        //console.log(event)
        mouse.set(2 * (event.clientX - event.target.offsetLeft) / canvasWidth - 1, -2 * (event.clientY - event.target.offsetTop) / canvasHeight + 1);
    }

    const setCanvas = () => {
        camera.aspect = canvasWidth / canvasHeight;
        camera.updateProjectionMatrix();
        //canvasSize = Math.min(window.innerWidth, window.innerHeight);
        renderer.setSize( canvasWidth, canvasHeight);
    }

    const animate = () => {
        requestAnimationFrame( animate );
				
        raycaster.setFromCamera( mouse, camera );
        var geometryIntersects = raycaster.intersectObjects( geometryObjects );

        //If the mouse is intersecting an object, highlight the object.
        if ( geometryIntersects.length > 0 ) {
            displayRolloverMesh = false;

            var geometryIntersect = geometryIntersects[ 0 ];
            
            //If the intersected object is newly intersected, update the state.
            if (geometryIntersect.object !== hoverObject.object){

                //If there was a previously intersected object, reset it's color to its original color.
                if(hoverObject.object){
                    hoverObject.object.material.color.setHex(hoverObject.originalColor);
                }
                
                //Store the intersected object and its original color.
                hoverObject.object = geometryIntersect.object;
                hoverObject.originalColor = geometryIntersect.object.material.color.getHex();

                //Highlight the intersected object.
                geometryIntersect.object.material.color.setHex( 0xaa2299 );
            }
        }
        //If the mouse is not intersecting an object, display a ghost cube.
        else{
            displayRolloverMesh = true;

            //Reset any previously hovered object.
            if(hoverObject.object){
                hoverObject.object.material.color.setHex(hoverObject.originalColor);
                hoverObject.object = null;
                hoverObject.originalColor = null;
            }
        }

        if(displayRolloverMesh){
            //Check if the mouse ray intersects with the plane.
            var planeIntersects = raycaster.intersectObjects([plane]);

            //If the mouse intersects with the plane, display the ghost cube at the position.
            if ( planeIntersects.length > 0 ) {
                var planeIntersect = planeIntersects[ 0 ];
                rollOverMesh.position.copy( planeIntersect.point ).add( planeIntersect.face.normal );
                rollOverMesh.material.opacity = 0.5;
            }
        } else{
            rollOverMesh.material.opacity = 0.0;
        }
        
        render();
    }

    const render = () => {
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