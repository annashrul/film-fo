import {Home,users,History} from 'icons';


const Routes=[
    {
        link:'/backoffice',
        title:'Home',
        icon: Home,
        routes:[]
    },
    {
        link:'/backoffice/category',
        title:'Kategori',
        icon: users,
        routes:[]
    },
    {
        link:'/backoffice/project',
        title:'Project',
        icon: users,
        routes:[]
    },
    {
        link:'/backoffice/tenant',
        title:'Tenant',
        icon: users,
        routes:[]
    },
    {
        link:'/backoffice/question',
        title:'Pertanyaan',
        icon: users,
        routes:[]
    },
    {
        link:'',
        title:'Setting',
        icon: History,
        routes:[
            {
                link:'/backoffice/user-level',
                title:'Level Pengguna',
                icon: History
            },
            {
                link:'/backoffice/user',
                title:'Pengguna',
                icon: History
            },
        ]
    },
]

export default Routes;