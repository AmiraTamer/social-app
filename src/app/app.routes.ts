import { RegisterComponent } from './features/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { FeedComponent } from './features/feed/feed.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { NotificationComponent } from './features/notification/notification.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { guestGuard } from './core/auth/guards/guest-guard';
import { DetailsComponent } from './features/details/details.component';

export const routes: Routes = [

    {path:'' , redirectTo:'login', pathMatch:'full'},

    {path:'' , component:AuthLayoutComponent, canActivate:[guestGuard],
        children:[
            {path:'login', component:LoginComponent, title:'Login Page'},
            {path:'register', component:RegisterComponent , title:'Registeration Page'},
            {path:'forget', component:ForgetPasswordComponent, title:'Forget Password Page'},

        ] ,

    },

    {path:'' , component:MainLayoutComponent,  canActivate:[authGuard],
        children:[
            {path:'feed', component:FeedComponent, title:'Feed Page'},
            {path:'notifications', component:NotificationComponent, title:'Notifications Page'},
            {path:'profile', component:ProfileComponent, title:'Profile Page'},
            {path:'change', component:ChangePasswordComponent, title:'Change Password Page'},
            {path:'details/:id', component:DetailsComponent, title:'Post Details Page'},

        ] ,
    },

    {path:'**', component:NotFoundComponent, title:'Notfound Page'},

];

