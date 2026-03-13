import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/survices/auth.service';
import { MyOwnData } from '../../../core/models/my-own-data.interface';
import { Post } from '../../../core/models/post.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-my-own-posts',
  imports: [RouterLink],
  templateUrl: './my-own-posts.component.html',
  styleUrl: './my-own-posts.component.css',
})
export class MyOwnPostsComponent implements OnInit {
      private readonly authService = inject(AuthService);


          myData !:MyOwnData;
          myId!: string;
          myPosts: Post[] = [];
      
      
          ngOnInit(): void {
            //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
            //Add 'implements OnInit' to the class.
            this.getMyProf();
          }
      
      
          getMyProf(){
            this.authService.getMyProfile(this.myData).subscribe({
                next:(res)=>{
              // console.log(res);
              this.myData = res.data.user;
              // console.log(this.myData);
            this.myId = this.myData._id; 
            this.getMyOwnPosts(); 
              
            },
            error:(err)=>{
              console.log(err);
            },
            });
          }
      
      
          getMyOwnPosts() {
        this.authService.getMyPosts(this.myId).subscribe({
          next: (res) => {
            console.log(res);
            this.myPosts = res.data.posts;
          },
          error: (err) => {
            console.log(err)
          }
        });
      }
      


}
