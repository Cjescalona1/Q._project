import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'provider/:id',
    loadChildren: () => import('./pages/provider/provider.module').then( m => m.ProviderPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./pages/service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'login-register',
    loadChildren: () => import('./pages/login-register/login-register.module').then( m => m.LoginRegisterPageModule)
  },
  {
    path: 'create-service',
    loadChildren: () => import('./pages/create-service/create-service.module').then( m => m.CreateServicePageModule)
  },
  {
    path: 'edit-service/:id',
    loadChildren: () => import('./pages/edit-service/edit-service.module').then( m => m.EditServicePageModule)
  },
  {   
    path: 'modal',
    loadChildren: () => import('./common/modal/modal.module').then( m => m.ModalPageModule)
  },   {
    path: 'calendar-modal',
    loadChildren: () => import('./common/calendar-modal/calendar-modal.module').then( m => m.CalendarModalPageModule)
  },
  {
    path: 'event-modal',
    loadChildren: () => import('./common/event-modal/event-modal.module').then( m => m.EventModalPageModule)
  },
  {
    path: 'edit-provider/:id',
    loadChildren: () => import('./pages/edit-provider/edit-provider.module').then( m => m.EditProviderPageModule)
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
