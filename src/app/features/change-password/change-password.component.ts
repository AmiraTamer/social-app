import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/survices/auth.service';
import { groupBy, Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {

  private readonly authService = inject(AuthService);

  successMessage: boolean = false;
  msgError: string = "";
  loading: boolean = false;  // loding spinner icon
  changePasswordSubscribe : Subscription = new Subscription(); 
  


  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmPassword: new FormControl('', Validators.required)
  },{
    validators : [this.passwordMatch ] ,
    updateOn: 'submit',
  });



  passwordMatch(control: AbstractControl) {

  const newPassword = control.get('newPassword')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (newPassword === confirmPassword) {
    return null;
  }

  control.get('confirmPassword')?.setErrors({ misMatch: true });
  return { misMatch: true };
}



  submitForm():void{
    if (this.changePasswordForm.valid) {
      this.loading= true;
      const data = {
      password : this.changePasswordForm.value.password ,
      newPassword: this.changePasswordForm.value.newPassword
};
      this.authService.changePassword(data).subscribe({
      
         next: (res) => {
          if (res.success) {
            console.log(res);
            this.successMessage = true;
          }

        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message ;
          this.loading = false;
        },
        complete:()=> {          // el complete bt4ta8al b3d el next
          this.loading = false;

        },

      });



    }else{
      this.changePasswordForm.markAllAsTouched();
    }
    
  }


   showPassword(element : HTMLInputElement){
    if(element.type === "password" ){
      element.type = 'text'
    }else{
      element.type = 'password'
    }
  }



  }



