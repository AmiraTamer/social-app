import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../../core/models/post.interface';
import { PostsService } from './../../../../core/services/posts.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommentPostComponent } from "./comment-post/comment-post.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-middle-side',
  imports: [ReactiveFormsModule, CommentPostComponent, RouterLink],
  templateUrl: './middle-side.component.html',
  styleUrl: './middle-side.component.css',
})


export class MiddleSideComponent implements OnInit{

  private readonly postsService = inject(PostsService);
  

  content : FormControl = new FormControl("");
  privacy : FormControl = new FormControl("public" , Validators.required);


  postsList : Post[] = [];
  savedFile !: File;
  imgUrl :  string | ArrayBuffer | null | undefined ;

  userId : string ="";



  ngOnInit():void{
    this.getAllPostsData();
    this.userId = JSON.parse( localStorage.getItem('socialUser')! )?._id;
  }

  getAllPostsData(){
    this.postsService.getAllPosts().subscribe({
      next : (res)=>{
        // console.log(res.data.posts);
        this.postsList = res.data.posts;
        
      },
      error:(err)=> {
        console.log(err);
      },


    });

  }


  changeImg(e:Event){
  const input =  e.target as HTMLInputElement ;

  if (input.files && input.files.length > 0) {
    console.log(input.files[0]);
    this.savedFile = input.files[0];

    // show file in html
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.savedFile);

    fileReader.onload = (e:ProgressEvent<FileReader>)=>{
      this.imgUrl = e.target?.result;      
    }
  }
 
  }

  hideImg():void{
    this.imgUrl = null ;
  }


  submitForm(e:Event): void{
    e.preventDefault();

    // console.log(this.content.value);
    // console.log(this.privacy.value);
    // console.log(this.savedFile);

    //append formData --> send BE
    const formData = new FormData();
    
    if (this.content.value) {
      formData.append('body' , this.content.value);
    }

    if (this.privacy.value) {
      formData.append('privacy' , this.privacy.value);
    }   
    
  if (this.savedFile) {
    formData.append('image' , this.savedFile);
  }

  
  // create post part
  this.postsService.createPost(formData).subscribe({
    next :(res)=>{
      console.log(res);
      if(res.success){
      this.getAllPostsData();
      this.clearForm();

      }
    },
    error :(err)=>{
      console.log(err);
    }
  });

  }


  clearForm(): void {
    this.imgUrl = null;
    this.savedFile = undefined!;
    this.content.reset();
    this.privacy.reset('public');
  } 


  deletePostItem(postId:string):void{

    this.postsService.deletePost(postId).subscribe({
      next :(res)=>{
      console.log(res);
      if(res.success){
        this.getAllPostsData();
      }
    },
    error :(err)=>{
      console.log(err);

    }
  });

  }


   savePost(postId:string):void{

    this.postsService.BookmarkPost(postId,{}).subscribe({
      next :(res)=>{
      console.log(res);

    },
    error :(err)=>{
      console.log(err);

    }
  });

  }


  unSavePost(postId:string):void{
    
  }
  

}
