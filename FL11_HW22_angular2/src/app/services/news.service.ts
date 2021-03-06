import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from 'src/app/models/News';
import { Source } from 'src/app/models/Source';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  newsUrl: string = '../../assets/news.json';
  sourceUrl: string = '../../assets/source.json';

  public filterValue: string = '';
  public sourceFilter: number;
  public setSelected;
  public news: News[];
  public newsCollection: AngularFirestoreCollection<News>;
  public newsObserverable: Observable<News[]>;

  constructor(private http: HttpClient, public afs: AngularFirestore) {
    this.setSelected = this.localSetSelected.bind(this);

    this.newsCollection = this.afs.collection('news-blog');
    this.newsObserverable = this.newsCollection.valueChanges();
   }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl);
  }
  getSource(): Observable<Source[]> {
    return this.http.get<Source[]>(this.sourceUrl);
  }

  localSetSelected(val: number) {
    this.sourceFilter = val;
  }
  getFireNews(){
    return this.newsObserverable;
  }

  addItem(item: News) {
    this.newsCollection.add(item);
  }

}
