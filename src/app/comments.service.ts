import { Injectable } from '@angular/core';
import { Comment } from './comment/comment';
import { Observable, of } from 'rxjs';
import { COMMENTS } from './comments-data';

@Injectable({providedIn: 'root'})

export class CommentsService {
  getComments(order?): Observable<Comment[]> {
    let sortedComments: Comment[] =
    COMMENTS.sort((a,b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      if (order === 'asc') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    })
    return of(sortedComments)
  }

  getCommentsCount(): number {
    return COMMENTS.length
  }

  getComment(id: number): Observable<Comment> {
    return of(COMMENTS.find(comments => comments.id === id))
  }

  postComment(commentData) {
    COMMENTS.push(commentData);
  }

  deleteComment(id) {
    let deletedComment = COMMENTS.find((comment) => comment.id === id);
    let index = COMMENTS.indexOf(deletedComment);
    if (index > -1) {
      COMMENTS.splice(index, 1);
    }
  }

}
