import { Component, OnInit } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/sso.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private oauth:OAuthService) { }



  ngOnInit(): void {
    this.configureSingleSingOn();
  }

  configureSingleSingOn(){
    this.oauth.configure(authCodeFlowConfig);
    this.oauth.tokenValidationHandler= new JwksValidationHandler();
    this.oauth.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oauth.initImplicitFlow();
  }

  logout(){
    this.oauth.logOut();
  }

}
