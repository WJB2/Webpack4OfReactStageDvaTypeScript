const baseSize=20;

function setRem(){

    const htmlWidth=document.documentElement.clientWidth||document.body.clientWidth;

    const htmlDom=document.getElementsByTagName('html')[0];

    //设置页面根节点字体大小
    htmlDom.style.fontSize=htmlWidth/baseSize+'px';

}

window.onresize=function(){
    setRem();
}