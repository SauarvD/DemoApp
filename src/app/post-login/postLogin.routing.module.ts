import { NgModule }     from '@angular/core';
import { Routes,
    RouterModule } from '@angular/router';

import { postLoginComponent } from './postLogin.component';
import { foodPollComponent } from '../modules/foodPoll/foodPoll.component';
import { SearchPeopleComponent } from '../modules/search-people/search-people.component';
import { ListComponent } from '../modules/list/list.component';
import {AuthGuard} from '../services/authGuard.service';

const routes: Routes = [
    {
        path: 'dashboard',
        component: postLoginComponent,
        children: [
        	{
                path: 'foodPoll',
                component: foodPollComponent
            },
            {
                path: 'searchPeople',
                component: SearchPeopleComponent
            },
            {
                path: 'list',
                component: ListComponent
            }
        ],
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class postLoginModuleRoutingModule {}