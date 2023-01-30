import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/posts.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  panelOpenState = false;

  @Output() postDeleted = new EventEmitter();
  posts: Post[] = [];
  pageSize = 3;
  totalPage = 10;
  currentIndex = 1;
  pageSizeOptions: any[] = [1, 3, 5, 10]
  isLoading:boolean = true;

  constructor(private http: HttpService, private router: Router){}

  ngOnInit(): void {
    this.getPosts();  
  }

  onChangePage(pageData: PageEvent){
    console.log("pageData", pageData);
    this.currentIndex = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;

    this.getPosts();
  }

  getPosts(){
    this.isLoading = true;
    this.http.search("posts", { pageSize: this.pageSize, page: this.currentIndex } ,(data: any) => {
      if(data.success){
        this.posts = data.data;
        this.isLoading = false;
        console.log("this.posts", this.posts);
        // this.totalPage = data.data.length;
      }
    })
  }

  deletePost(id: any){
    this.http.delete(`posts/${id}`, (data: any) => {
      if(data.success){
        this.getPosts();
      }
    })
  }

  editPost(post: any){
    this.router.navigateByUrl(`/edit/${post}`)
  }

}
