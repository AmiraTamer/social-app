import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../../core/auth/survices/auth.service';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // 3mlna keda adam hansta5dem 7aga mn el auth fel nav
  private readonly authService = inject(AuthService)
   private readonly postsService = inject(PostsService);
  
    postsList : Post[] = [];
  

  logOut():void{
    this.authService.signOut()
  }



  isDropMenuOpen: boolean = false;

  showDropMenu(){
    this.isDropMenuOpen = !this.isDropMenuOpen;
  }


}
