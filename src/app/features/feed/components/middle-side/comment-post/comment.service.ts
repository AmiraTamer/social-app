import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly httpClient = inject(HttpClient);
  // header : object = {
  //     headers:{
  //       'AUTHORIZATION' : `Bearer ${localStorage.getItem('socialToken')} `
  //     }
  //   }
    //{{baseUrl}}/posts/{{postId}}/comments/{{commentId}}


  getPostComment(postId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts/${postId}/comments?page=1&limit=10`);
  }
  CreateComment(postId:string , data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + `/posts/${postId}/comments` , data );
  }
  deleteComment(postId:string , commentId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl + `/posts/${postId}/comments/${commentId}`);

  }

  

}
