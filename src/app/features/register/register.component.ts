import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/auth/survices/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  // 3- taler 5atwa f el API CALL
  // emma a3mel submit h akalem el service de (authService)
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);



  registerForm: FormGroup = new FormGroup(
    {

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('',[
      Validators.required ,
      this.futureDateValidator
    ]),
    gender: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    rePassword: new FormControl('', Validators.required),
  } , {
    validators : [this.confirmPassword] ,
    updateOn: 'submit',
  });

// mohem GDNNNNNNNNNNNNNN ⚠️⚠️⚠️
  msgError:string="";
  loading:boolean =false;  // loding spinner icon
  registerSubscribe : Subscription = new Subscription(); 
  
// future Date function
  futureDateValidator(control: AbstractControl) {

  const selectedDate = new Date(control.value);
  const today = new Date(); // el date bta3 elnaharda

  // نخلي الوقت صفر عشان المقارنة تبقى صح
  today.setHours(0,0,0,0);

  if (selectedDate > today) {
    return { futureDate: true };
  }

  return null;
}

  
// Confirm Password function ⚠️⚠️⚠️
  confirmPassword(group : AbstractControl){

    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

        if (rePassword !== password && rePassword !== "") {

          group.get('rePassword')?.setErrors({misMatch : true});
          return {misMatch : true};

        }else{
          
          return null;
        }
  }

  
  showPassword(element : HTMLInputElement){
    if(element.type === "password" ){
      element.type = 'text'
    }else{
      element.type = 'password'
    }
  }



  submitForm() {
    if (this.registerForm.valid) {
      // logic 
      console.log(this.registerForm.value);
      this.loading = true;

      this.registerSubscribe.unsubscribe();

      // send data to BE
    this.registerSubscribe = this.authService.signUp(this.registerForm.value).subscribe({

        next: (res) => {
          if (res.success) {
            console.log(res);
            // navigate login
            this.router.navigate(['/login']);
          }

        },

        error: (err:HttpErrorResponse) => {
          // console.log(err);
          // show error //
          this.msgError = err.error.message ;
          this.loading = false;
        },

        complete:()=> {          // el complete bt4ta8al b3d el next
          this.loading = false;
        },
      })



    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
