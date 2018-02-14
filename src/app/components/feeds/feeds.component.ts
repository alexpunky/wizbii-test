import { Component, OnInit } from '@angular/core';
import {FeedsService} from '../../services/feeds.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {

    public feeds: any;
    public currentCommentFeed = null;

  constructor(public feedsService: FeedsService) { }

  ngOnInit() {
      const obs = this.feedsService.getAll();
      obs.subscribe(next => {
         this.feeds = next;
      }, error => {
          // TODO Show error
      });
  }

  public focusComment(feed: any): void {
      this.currentCommentFeed = feed;
  }

  public blurComment(feed: any): void {
      this.currentCommentFeed = null;
  }

  public comment(feed: any): void {
      feed.comments.push({ content: feed.currentComment });
      feed.currentComment = null;
  }

}
