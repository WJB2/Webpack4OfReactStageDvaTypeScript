import dva from 'dva';
import { createHashHistory as createHistory }  from 'history';
import FastClick from 'fastclick';
import "./utils/Rem.js";
import "./styles/main.css";
import 'antd/dist/antd.css';

//1.Initialize
const app=dva({
    history:createHistory()
});

//2.Plugins
//app.use({});

//3.Model
app.model(require('./models/global').default);

//4.Router
app.router(require('./router').default);

//5.Start
app.start('#root');

FastClick.attach(document.body);

 
 