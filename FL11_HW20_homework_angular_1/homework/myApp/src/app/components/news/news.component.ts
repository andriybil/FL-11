import { Component, OnInit, Input } from '@angular/core';

import { NewsService } from '../../services/news.service';
import { News } from 'src/app/models/News';
import { Source } from 'src/app/models/Source';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() myStringFromNews: string;

  public newsList: News[];
  public sourceList: Source[];
  public source: Source[];
  public setSource: Function;


  constructor(public newsService: NewsService) { }


  ngOnInit() {
    this.setSource = this.setLocalSource.bind(this);

    this.newsService.getNews().subscribe(news => {
      this.newsList = news;
    });

    this.newsService.getSource().subscribe(src => {
      this.sourceList = src;
    });

  }

  public setLocalSource(sourceId) {
    this.sourceList = this.source.filter(src => {
      return src.sourceId === sourceId;
    });
  }


}
