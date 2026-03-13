import { AuthService } from './../../../core/auth/survices/auth.service';
import { PostsService } from './../../../core/services/posts.service';
import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-saved',
  imports: [RouterLink],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css',
})
export class SavedComponent implements OnInit {
    private readonly postsService = inject(PostsService);
  private readonly authService = inject(AuthService);

  

      savedpostsList : Post[] = [];

   
  ngOnInit():void{
    this.getAllPostsSavedData();
  }

   getAllPostsSavedData(){
    this.authService.getBookmarks().subscribe({
      next : (res)=>{
        console.log(res);      
        this.savedpostsList = res.data.bookmarks ;  
        console.log(this.savedpostsList);

        
      },
      error:(err)=> {
        console.log(err);
      },
    })

  }
}
