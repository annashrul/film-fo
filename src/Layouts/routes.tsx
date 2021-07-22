import { setting, dashboard, question, category, project, tenant } from 'icons';

const Routes = [
  {
    link: '/backoffice',
    title: 'Dashboard',
    icon: dashboard,
    routes: [],
  },
  {
    link: '/backoffice/category',
    title: 'Kategori',
    icon: category,
    routes: [],
  },
  {
    link: '/backoffice/project',
    title: 'Project',
    icon: project,
    routes: [],
  },
  {
    link: '/backoffice/tenant',
    title: 'Tenant',
    icon: tenant,
    routes: [],
  },
  {
    link: '/backoffice/question',
    title: 'Pertanyaan',
    icon: question,
    routes: [],
  },
  {
    link: '',
    title: 'Setting',
    icon: setting,
    routes: [
      {
        link: '/backoffice/user-level',
        title: 'Level Pengguna',
      },
      {
        link: '/backoffice/user',
        title: 'Pengguna',
      },
    ],
  },
];

export default Routes;
