import { Routes } from '@angular/router';
import { Role } from './shared/models/enums/role';
import { roleGuard } from './shared/guards/role/role.guard';

export const routes: Routes = [
    {
        path: "",
        data: {role: Role.SALES},
        canMatch: [roleGuard],
        loadComponent: () => import("./sales/dashboard/dashboard.component").then(x => x.DashboardComponent), 
    },
    {
        path: "",
        data: {role: Role.PROCUREMENT},
        canMatch: [roleGuard],
        loadComponent: () => import("./procurement/dashboard/dashboard.component").then(x => x.DashboardComponent), 
    },
    {
        path: "",
        data: {role: Role.HR},
        canMatch: [roleGuard],
        loadComponent: () => import("./hr/dashboard/dashboard.component").then(x => x.DashboardComponent), 
    },
    {
        path: "",
        canMatch: [roleGuard],
        loadComponent: () => import("./auth/login/login.component").then(x => x.LoginComponent), 
    }
];
