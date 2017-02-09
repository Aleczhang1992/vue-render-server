import {app, store} from './main'

export default context => {

    //保存现有的store状态
    context.initialState = store.state

    return app;

}
