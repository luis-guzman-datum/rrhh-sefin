import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/services/DashBoardService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuarioInfo: any;
  rolesUser:any;
  token:any;
  stringRoles:any;
  dashBoardTask: any[]=[];
  constructor(private apiDashBoard:DashBoardService) {
    
    
   }

  ngOnInit(): void {   
    this.rolesUser = JSON.parse(sessionStorage.getItem("roles") || '{}');
    this.token = JSON.parse(sessionStorage.getItem("token") || '{}');
    this.stringRoles = this.rolesUser.roles.reduce((reducer:any,item:any)=>{
      return `${reducer}groups=${item}&`
    },"");
    this.taskDashBoard();
  }
  getInfoUsuario():any{
    return JSON.parse(sessionStorage.getItem("userInfo") || '{}');
  }
  taskDashBoard(){
    if(this.token.token){
      this.apiDashBoard.getDasboardTask(this.stringRoles,this.token.token).subscribe(respose => {
        this.dashBoardTask=respose.data.task_summary;
      });
    }
  }

}
