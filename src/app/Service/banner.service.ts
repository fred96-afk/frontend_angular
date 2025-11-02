import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Banner } from '../Model/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private readonly apiurl = `${enviroments.backend}/banners`;

  constructor(private http: HttpClient) { }

  getBanners(): Observable<Banner[]>{
    return this.http.get<Banner[]>(this.apiurl);
  }

  createBanner(banner: FormData): Observable<any> {
    return this.http.post<any>(this.apiurl, banner);
  }
}
