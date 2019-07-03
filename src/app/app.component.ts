import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP-Flickr';
  copyright = '@Corentin Chataignon';
  tag = '';

  key = "cbd044cdcfa75f68ef13877b22fe42ff";
  photos: any;

  constructor(private http: HttpClient) {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  getPhotos(): Promise<any> {
    let url = "https://api.flickr.com/services/rest?nojsoncallback=1&method=flickr.photos.search&api_key="+this.key+"&tags="+this.tag+"&format=json";
    
    return this.http.get(url)
      .toPromise()
      .catch(this.handleError);
  }

  new_tag(): void {
    this.getPhotos().then(resp => this.photos = resp.photos);
  }

  getPhotoUrl(photo: any): string {
    return `https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`;
  }
}
