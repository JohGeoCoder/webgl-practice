import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreFrontAppState } from '../states/StoreFrontAppState';
import { StoreFrontApp } from '../components/StoreFrontApp';

const mapStateToProps = ({}: StoreFrontAppState) => ({});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({

}, dispatch);

export const StoreFrontAppContainer = connect(mapStateToProps, mapDispatchToProps)(StoreFrontApp);