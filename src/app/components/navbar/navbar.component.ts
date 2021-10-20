import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { KeycloakSecurityService } from '../../services/keycloak-security.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input('title') title!: string;
  today= new Date();
  usuarioInfo: any;
  keycloak: any;
  

  constructor(private keycloakSecurityService: KeycloakSecurityService) {    
  }
  
  logOutP(){
    this.keycloak = this.keycloakSecurityService.keycloak;
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("roles");
    this.keycloak.logout();
  }

  ngOnInit(): void {
    
  }
  getInfoUsuario():any{
    return JSON.parse(sessionStorage.getItem("userInfo") || '{}');
      }
  
}
