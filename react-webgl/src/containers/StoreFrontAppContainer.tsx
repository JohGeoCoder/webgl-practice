import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreFrontAppState } from '../states/StoreFrontAppState';
import { StoreFrontApp } from '../components/StoreFrontApp';
import { AddObjectAction } from '../actions/storeFront.actions';
import { MeshObject } from '../models/MeshObject';

const mapStateToProps = ({}: StoreFrontAppState) => ({});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onAddObject: (object: MeshObject) => new AddObjectAction(object)
}, dispatch);

export const StoreFrontAppContainer = connect(mapStateToProps, mapDispatchToProps)(StoreFrontApp);