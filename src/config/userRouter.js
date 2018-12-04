export default [
    {
        path:'/',
        models:['home/home'],
        isExact:true,
        component:()=>import('@/routes/home/HomeIndex.tsx'),
    },
];