 
export default {

    namespace:'home/home',

    state:{
        
    },

    effects:{
    
    },

    reducers:{
        updateState(state,{payload}){
            return {...state,...payload};
        }
    }
}