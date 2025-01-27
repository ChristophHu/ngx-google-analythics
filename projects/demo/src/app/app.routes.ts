import { Routes } from '@angular/router';
import { OverviewComponent } from './modules/overview/overview.component';
import { ReadmeComponent } from './modules/readme/readme.component';
import { PageAComponent } from './modules/overview/routes/page-a/page-a.component';
import { PageBComponent } from './modules/overview/routes/page-b/page-b.component';

export const routes: Routes = [
    { path: 'overview', component: OverviewComponent,children: [
        { path: 'page-a', component: PageAComponent },
        { path: 'page-b', component: PageBComponent }
    ]},
    { path: 'readme', component: ReadmeComponent },
    { path: '**', component: OverviewComponent }
];