import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private readonly httpClient = inject(HttpClient);



  // header : object = {
  //     headers:{
  //       'AUTHORIZATION' : `Bearer ${localStorage.getItem('socialToken')} `
  //     }
  //   };

  getAllPosts():Observable<any>{
    return this.httpClient.get(environment.baseUrl + '/posts' );
  }

  createPost( data : object ):Observable<any>{
    return this.httpClient.post(environment.baseUrl + '/posts' , data );
  }


  getSinglePost(postId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/posts/${postId}` );
  }

  deletePost(postId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl + `/posts/${postId}` );
  }

  updatePost(postId:string , data:FormData):Observable<any>{
    return this.httpClient.put(environment.baseUrl + `/posts/${postId}`, data );
  }

  BookmarkPost(postId:string , data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl + `/posts/${postId}/bookmark` ,data );
  }



}
