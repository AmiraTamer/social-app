import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/survices/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  // el Login zay el login belzabt
  
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);



  loginForm: FormGroup = new FormGroup(
    {

    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])} , {
    updateOn: 'submit',
  });

  msgError:string="";
  loading:boolean =false;  // loding spinner icon
  loginSubscribe : Subscription = new Subscription(); 


  showPassword(element : HTMLInputElement){
    if(element.type === "password" ){
      element.type = 'text'
    }else{
      element.type = 'password'
    }
  }



  submitForm() {
    if (this.loginForm.valid) {
      this.loading = true;

      this.loginSubscribe.unsubscribe();

      // send data to BE
    this.loginSubscribe = this.authService.signIn(this.loginForm.value).subscribe({

        next: (res) => {
          if (res.success) {
            // save token & user info at local storage

            localStorage.setItem('socialToken' , res.data.token);
            localStorage.setItem('socialUser' , JSON.stringify(res.data.user));
            
            // navigate login
            this.router.navigate(['/feed']);
          }

        },

        error: (err:HttpErrorResponse) => {
          // show error //
          this.msgError = err.error.message ;
          this.loading = false;
        },

        complete:()=> {          
          this.loading = false;
        },
      })



    } else {
      this.loginForm.markAllAsTouched();
    }
  }


}
