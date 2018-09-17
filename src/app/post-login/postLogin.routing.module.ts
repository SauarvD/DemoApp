import { NgModule }     from '@angular/core';
import { Routes,
    RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: HomepageComponent
    },
    {
        path: 'callback',
        component: CallbackComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class postLoginModuleRoutingModule {}