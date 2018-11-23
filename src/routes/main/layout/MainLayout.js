import React,{PureComponent} from 'react';
import {Route,routerRedux} from 'dva/router';
import styles from './MainLayout.scss';
import {connect} from 'dva';

@connect(models => ({
    globalModel:models.global,
}))
class MainLayout extends PureComponent{

    render(){
        const { routerData,globalModel,dispatch }=this.props;
        
        const {
            authenticated,
        }=globalModel;

        return(
            <div className={styles.renderMain}>
                {Object.keys(routerData)
                    .map(path => {
                    return(
                    <Route
                        key={path}
                        path={path}
                        exact
                        component={routerData[path].component}
                    />)
                    })
                }   
            </div>
        )
    }
}
export default MainLayout;