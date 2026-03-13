import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // hkteb el logic elli haykalem el API //

  // 1- injection ll httpClient
  private readonly httpClient = inject(HttpClient);
  //logout => m4 tb3 al api
  private readonly router = inject(Router)

  // 2- create el function
  signUp(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/users/signup', data);
  }

  signIn(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/users/signin', data);
  }

  signOut() {
    localStorage.removeItem('socialToken');
    localStorage.removeItem('socialUser');
    this.router.navigate(['/login']);
  }


  changePassword(data: object): Observable<any> {
    return this.httpClient.patch(environment.baseUrl + '/users/change-password', data);
  }

  getFollowSuggestions(limit: number): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/users/suggestions?limit=${limit}`);
  }

  getMyProfile(data: object): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/users/profile-data', data);
  }

   getMyPosts(userId:string): Observable<any> {
    return this.httpClient.get(environment.baseUrl+`/users/${userId}/posts`);
  }

  getBookmarks(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/users/bookmarks');
  }

  // getUserProfile(){}

}
