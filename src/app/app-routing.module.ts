import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  {path: '', redirectTo: '/comments', pathMatch: 'full'},
  {path: 'comments', pathMatch: 'full', component: CommentsComponent},
  {path: 'comments/:id', component: CommentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
