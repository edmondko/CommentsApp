
import { Comment } from '../comment/comment';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommentsService }  from '../comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comment: Comment;

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCommentData();
  }

  getCommentData(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentsService.getComment(id).subscribe(comment => this.comment = comment);

    if (!this.comment) {
      this.location.back();
    }
  }

  onDeleteComment(id): void {
    let confirmDelete = confirm('Are you sure you want to delete this comment?');
    if (confirmDelete) {
      this.commentsService.deleteComment(id);
      this.location.back();
    }
  }
}
