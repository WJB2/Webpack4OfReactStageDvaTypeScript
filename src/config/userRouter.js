export default [
    {
        path:'/home',
        models:['home/home'],
        isExact:true,
        component:()=>import('../routes/home/HomeIndex.tsx'),
    },
];