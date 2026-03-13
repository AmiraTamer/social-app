import { TranslateService } from '@ngx-translate/core';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly translateService = inject(TranslateService)
  // logic translate

  changeDirection():void{
    if (localStorage.getItem('lang') === 'en') {
      // dir ltr
      document.documentElement.setAttribute('dir' , 'ltr');
      document.documentElement.setAttribute('lang' , 'en');
      

    }
    else if(localStorage.getItem('lang') === 'ar'){
      // dir rtl
      document.documentElement.setAttribute('dir' , 'rtl');
      document.documentElement.setAttribute('lang' , 'ar');
    }
  }

   ChangeLang(lang:string):void{
    localStorage.setItem('lang',lang);
    this.translateService.use(lang);
    this.changeDirection();
  }
}
