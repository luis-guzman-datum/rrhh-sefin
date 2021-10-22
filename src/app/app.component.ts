import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './services/EmpleadosService';
import { KeycloakSecurityService } from './services/keycloak-security.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'keycloak-app';
  constructor(private keycloakSecurityService: KeycloakSecurityService, private api: EmpleadosService) { }
  isAuth = false;
  keycloak: any;
  userID: any;
  userInformations: any;
  ngOnInit() {
    this.keycloak = this.keycloakSecurityService.keycloak;
    console.log(JSON.stringify(this.keycloak));
    /*console.log('hasRealmRole', this.keycloak.hasRealmRole('app-manager'));
    console.log('hasResourceRole', this.keycloak.hasResourceRole('app-manager'));*/
    this.isAuth = this.keycloak.authenticated;
    this.userInformations = this.isAuth ? this.keycloak.idTokenParsed : {};
    sessionStorage.setItem("roles", JSON.stringify(this.keycloak.realmAccess));
    if (!this.keycloak.idToken) {
      this.onLogin();

    }
    if (this.keycloak.tokenParsed.preferred_username) {
      this.getInfoEmpleado(this.keycloak.tokenParsed.preferred_username);
    }
  }

  getInfoUsuario(): any {
    return JSON.parse(sessionStorage.getItem("userInfo") || '{}');
  }

  onLogin() {
    this.keycloak.login();
  }
  onLogout() {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("roles");
    this.keycloak.logout();
  }
  ManagedAccount() {
    this.keycloak.accountManagement();
  }
  isAppManager() {
    return this.keycloak.hasRealmRole('app-manager');
  }

  getInfoEmpleado(user: any) {
    this.api.getInfoEmpleado(user).subscribe(
      (response) => {
        sessionStorage.setItem("userInfo", JSON.stringify(response.data));
      },
      (error) => {
        alert('Ocurrio un error')
      }
    );
  }
}
