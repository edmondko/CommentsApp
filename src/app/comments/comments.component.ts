import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment/comment';
import { CommentsService } from '../comments.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})


export class CommentsComponent implements OnInit {

  comments: Comment[];
  newCommentForm: FormGroup;
  commentTypes: string[] = ['low', 'medium', 'high'];
  sortOptions: any[] = [{ name: 'Ascending', value: 'asc'}, { name: 'Descending', value: 'desc' }];
  sortOrder: string = 'desc';

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.createForm();
    this.getComments();
  }

  getComments() {
    this.commentsService.getComments(this.sortOrder).subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

  onSortChange(sort): void {
    this.sortOrder = sort;
    this.getComments();
  }

  createForm(): void{
    this.newCommentForm = new FormGroup({
      type: new FormControl('medium', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      content: new FormControl('', [Validators.required, , Validators.minLength(1)]),
      createdAt: new FormControl(new Date()),
    })
  }

  generateUniqueId(): number {
    return this.commentsService.getCommentsCount() + 1
  }

  onFormSubmit(): void {
    const formState = this.newCommentForm.value;
    let formValue = {...formState, id: this.generateUniqueId() }
    this.commentsService.postComment(formValue);
    this.newCommentForm.reset({title: '', type: 'medium', content: '', createdAt: new Date()});
  }



}
