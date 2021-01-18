import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Modules
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        RouterModule
    ]
})

export class AuthModule {}