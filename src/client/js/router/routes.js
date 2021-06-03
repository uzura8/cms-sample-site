import Top from '@/templates/Top';
import About from '@/templates/About';
import Unauthorized from '@/templates/Unauthorized';
import Forbidden from '@/templates/Forbidden';
import NotFound from '@/templates/NotFound';
import SignUp from '@/templates/SignUp'
import SignIn from '@/templates/SignIn'
import SentVerificationMail from '@/templates/SentVerificationMail'
import RequiredEmailVerification from '@/templates/RequiredEmailVerification'
import UserVerifyEmail from '@/templates/UserVerifyEmail'
import UserTop from '@/templates/UserTop'
import Settings from '@/templates/Settings'
import AdminTop from '@/templates/AdminTop'
//import AdminUsers from '@/templates/AdminUsers'
//import UserCreate from '@/templates/UserCreate'
//import UserEdit from '@/templates/UserEdit'
import AdminSignIn from '@/templates/AdminSignIn'

export default [
  {
    path: '/',
    component: Top,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signup/sent',
    name: 'SentVerificationMail',
    component: SentVerificationMail
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/errors/required-email-verification',
    name: 'RequiredEmailVerification',
    component: RequiredEmailVerification
  },
  {
    path: '/user/verify-email',
    name: 'UserVerifyEmail',
    component: UserVerifyEmail,
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'UserTop',
    component: UserTop,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/signin',
    name: 'AdminSignIn',
    component: AdminSignIn
  },
  //{
  //  path: '/admin/users',
  //  name: 'AdminUsers',
  //  component: AdminUsers,
  //  meta: { requiresAuth: true }
  //},
  //{
  //  path: '/admin/users/create',
  //  name: 'AdminUserCreate',
  //  component: UserCreate,
  //  meta: { requiresAuth: true }
  //},
  //{
  //  path: '/admin/users/:uid/edit',
  //  name: 'AdminUserEdit',
  //  component: UserEdit,
  //  meta: { requiresAuth: true }
  //},
  {
    path: '/admin',
    name: 'AdminTop',
    component: AdminTop,
    meta: { requiresAuth: true }
  },
  { path: '/about', component: About },
  { path: '/error/forbidden', component: Forbidden, name: 'Forbidden' },
  { path: '/error/unauthorized', component: Unauthorized },
  { path: '/error/notfound', component: NotFound },
  { path: '*', redirect: '/error/notfound' }
]
