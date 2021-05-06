import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { PembacaMeterComponent } from './pembaca-meter/pembaca-meter.component';
import { KemRkatComponent } from './kem-rkat/kem-rkat.component';
import { PengurusanComponent } from './pengurusan/pengurusan.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'pm',
                component: PembacaMeterComponent
            },
            {
                path: 'rkat',
                component: KemRkatComponent
            },
            
            
            /*
            {
                path: 'management',
                children: [
                    {
                        path: 'audit-trails',
                        component: ManagementAuditComponent
                    },
                    {
                        path: 'user',
                        component: ManagementUserComponent
                    }
                ]
            },*/
            {
                path: 'pengurusan',
                component: PengurusanComponent
            },
            {
                path: 'report',
                component: ReportComponent
            }
        ]
    }
]