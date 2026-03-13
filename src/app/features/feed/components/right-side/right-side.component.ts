import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/survices/auth.service';
import { SugFriend } from './sug-friend.interface';

@Component({
  selector: 'app-right-side',
  imports: [],
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.css',
})
export class RightSideComponent implements OnInit {
  private readonly authService = inject(AuthService);

  sugFriendsArr : SugFriend[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getsugFriends();
  }


  getsugFriends(){
    this.authService.getFollowSuggestions(3).subscribe({
      next:(res)=>{
        // console.log(res);
        this.sugFriendsArr = res.data.suggestions;
        console.log( "sugFriendsArr" , this.sugFriendsArr);
        
      },
      error:(err)=>{
        // console.log(err);
      },
    });
  }

}






