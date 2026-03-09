import { PostsService } from './../../../../../core/services/posts.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { Comments } from './comments.interface';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-comment-post',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './comment-post.component.html',
  styleUrl: './comment-post.component.css',
})
export class CommentPostComponent implements OnInit {
  private readonly commentService = inject(CommentService);
  private readonly postsService = inject(PostsService)

  @Input() postId: string = "";

  commentsList: Comments[] = [];
  savedCommentFile!: File;
  imgCommentUrl: string | ArrayBuffer | null | undefined ;
  commentContent: FormControl = new FormControl("")

 userId : string ="";


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCommentPost();
    this.userId = JSON.parse( localStorage.getItem('socialUser')! )?._id;

  }

  getCommentPost(): void {
    this.commentService.getPostComment(this.postId).subscribe({
      next: (res) => {
        // console.log(res);
        this.commentsList = res.data.comments;

      },
      error: (err) => {
        console.log(err);

      }
    });
  }

  changeCommentImg(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0]);
      this.savedCommentFile = input.files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.savedCommentFile);

      fileReader.onload = (e) => {
        this.imgCommentUrl = e.target?.result;
      }

    }
  }

  hideImg(): void {
    this.imgCommentUrl = null;
  }

  submitComment(e: Event) {
    e.preventDefault();

    const formData = new FormData();
    if (this.commentContent) {
      formData.append('content', this.commentContent.value);
    }

    if (this.savedCommentFile) {
      formData.append('image', this.savedCommentFile);
    }

    // create comment part
    this.commentService.CreateComment(this.postId, formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.getCommentPost();

          this.clearForm();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });


  }

  clearForm(): void {
    this.imgCommentUrl = null;
    this.savedCommentFile = undefined!;
    this.commentContent.reset();
  }


  //downDrop
  openedCommentId: string | null = null;
  
  showDropMenu(commentId: string) {
  if (this.openedCommentId === commentId) {
    this.openedCommentId = null; 
  } else {
    this.openedCommentId = commentId;
  }
}



// delete comment
  deleteCommentItem(postId:string , commentId:string){

    this.commentService.deleteComment(postId,commentId).subscribe({
      next: (res)=>{
        console.log(res);
        if(res.success){
          this.getCommentPost();
        }
      },
      error:(err)=>{
        console.log(err);
        
      }


    });

  }


  editCommentItem(postId:string , commentId:string){

  }
}
