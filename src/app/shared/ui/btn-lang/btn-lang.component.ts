import { Component, inject } from '@angular/core';
import { MyTranslateService } from '../../../core/services/my-translate.service';

@Component({
  selector: 'btnLang',
  imports: [],
  templateUrl: './btn-lang.component.html',
  styleUrl: './btn-lang.component.css',
})
export class BtnLangComponent {

    private readonly myTranslateService = inject(MyTranslateService)

  Change(lang:string):void{
    this.myTranslateService.ChangeLang(lang);
  }
}
