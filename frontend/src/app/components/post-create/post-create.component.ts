import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/posts.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
    postId: any = "";
    post: any = { title: "", content: "" };
    test:any;
    mode = "create";
    isLoading = false;
    imagePreview: any;
    form:FormGroup;
    file: any;
    @Output() newPost = new EventEmitter<any>();

    constructor(private router: Router, private http: HttpService, private activatedRoute: ActivatedRoute){
      // updateOn: "blur"
      this.form = new FormGroup({
        title: new FormControl("", { validators: [Validators.required] }),
        content: new FormControl("", { validators: [Validators.required] }),
        image: new FormControl(null)
      });
    }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        if(params.get("id")){
          this.mode = "edit";
          this.postId = params.get("id");
          this.getPost();
          this.form.setValue({ title: this.post?.title, content: this.post?.content, image: "" });
        }else {
          this.mode = "create";
          this.postId = "";
        }
      })
    }

    onCreatePost(){
      if (this.form.invalid) return;

      if(this.mode === "create"){
        this.isLoading = true;
        console.log("ran....");
        const formData = new FormData();
        formData.append("title", this.form.value.title);
        formData.append("content", this.form.value.content);
        formData.append("image", this.file, this.file.name);
        this.http.post("posts", formData, (data: any) => {
          if(data.success){
            this.isLoading = false;
          }
        });
      }else if(this.mode === "edit"){
        this.isLoading = true;
        this.http.patch(`posts/${this.postId}`, {title: this.form.value.title, content: this.form.value.content}, (data: any) => {
          if(data.success){
            console.log("sent");
            this.isLoading = false;
          }
        });
      }


      this.form.reset();
    }

    getPost(){
      this.http.get(`posts/${this.postId}`, (data: any) => {
        this.post = this.form.patchValue({
          title: data.data.title,
          content: data.data.content,
          image: ""
        });

      })
    }

    onImageSelected(e: any){
      const file = e.target.files[0];
      this.file = file;
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      }

      reader.readAsDataURL(file);
    } 


}
