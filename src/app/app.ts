import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerComponent } from "ngx-spinner";
import { MyTranslateService } from './core/services/my-translate.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('social-app');

  private readonly myTranslateService = inject(MyTranslateService)
  private translate = inject(TranslateService);

    constructor() {
        this.translate.addLangs(['de', 'en']);

        if ( localStorage.getItem('lang')) {
          this.translate.use(localStorage.getItem('lang')!);
          this.myTranslateService.changeDirection();
        }

      }

}
