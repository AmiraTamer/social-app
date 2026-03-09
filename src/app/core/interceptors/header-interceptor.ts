import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  // req ---- send header
  if(localStorage.getItem('socialToken')){
  req = req.clone({
    setHeaders:{
      'AUTHORIZATION' : `Bearer ${localStorage.getItem('socialToken')} `
    }
  })
  }

  return next(req);
};
