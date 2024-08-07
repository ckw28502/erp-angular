import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import  {MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Role } from '../../shared/models/enums/role';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  menus = {
    [Role.SALES]: [
      {
        title: "DASHBOARD",
        url: "/"
      },
      {
        title: "CLIENTS",
        url: "/clients"
      },
      {
        title: "PRODUCTS",
        url: "/products"
      },
      {
        title: "TRANSACTIONS",
        url: "/transactions"
      }
    ],
    [Role.PROCUREMENT]: [
      {
        title: "DASHBOARD",
        url: "/"
      },
      {
        title: "SUPPLIER",
        url: "/suppliers"
      },
      {
        title: "PRODUCTS",
        url: "/products"
      },
      {
        title: "transactions",
        url: "/transactions"
      }
    ],
    [Role.HR]: [
      {
        title: "DASHBOARD",
        url: "/"
      },
      {
        title: "EMPLOYEES",
        url: "/employees"
      }
    ]
  }

  selectedMenu: Array<{title: string, url: string}> = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token: string | null = sessionStorage.getItem("token");    
    this.isLoggedIn = token !== null;
    
    const role: Role | null = sessionStorage.getItem("role") as Role;
    if (role) {
      this.selectedMenu = this.menus[role];
    }
  }

  logout(): void {
    sessionStorage.clear();
    if (this.router.url === "/") {
      window.location.reload();
    } else {
      this.router.navigate(["/"]);
    }
  }
}
