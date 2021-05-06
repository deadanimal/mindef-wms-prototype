import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PembacaMeterComponent } from './pembaca-meter/pembaca-meter.component';
import { PenghuniComponent } from './penghuni/penghuni.component';

export const UserRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },/*
            {
                path: 'dashboard1',
                children: [
                    {
                        path: 'pm',
                        component: PembacaMeterComponent
                    },
                    {
                        path: 'penghuni',
                        component: PenghuniComponent
                    }
                ]
            },*/
            {
                path: 'pm',
                component: PembacaMeterComponent
            },
            {
                path: 'penghuni',
                component: PenghuniComponent
            }
        ]
    }
]