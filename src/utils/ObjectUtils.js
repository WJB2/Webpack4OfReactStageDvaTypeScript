/*
判断是否是对象
*/
function isObject(item){
    return item && typeof item === 'object' && !Array.isArray(item);
}
/*
判断是否是数组
*/
function isArray(item){
    return item && typeof item === 'object' && Array.isArray(item);
}

function mergeDeep(originalValue,targetValue){
    if(isArray(originalValue)){
        return targetValue;
    }
    if(!isObject(originalValue)){
        return targetValue;
    }
    if(typeof originalValue != typeof targetValue){
        return targetValue;
    }
    if(originalValue === null || targetValue === null){
        return targetValue;
    }
    if((originalValue.constructor && originalValue.constructor.name)==="Moment"){
        return targetValue;
    }
    const originalValueCopy={...originalValue};

    for(const name in originalValueCopy){
        if(name in targetValue){
            originalValueCopy[name]=mergeDeep(originalValue[name],targetValue[name]);
        }
    }

    for(const name in targetValue){
        if(!(name in originalValueCopy)){
            originalValueCopy[name]=targetValue[name];
        }
    }

    return originalValueCopy;

}

export default{
    isObject,
    isArray,
    mergeDeep,
};