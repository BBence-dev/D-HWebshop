import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Role, User } from '../models/user';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  usro: any;
  users: User[] = [];
  roles: Role[] = [];
  isListView: boolean = true;
  submitted: boolean = false;

  @Input() currentUser: User = {
    id: '',
    username: '',
    password: '',
    email:'',
    ageInYears: 0,
    status: '',
    roles: []
  };

  currentIndex: number = -1;
  username: string = '';
  password: string = '';
  ageInYears: number = 0;
  email: string = '';
  status: string = '';

  message: string = '';

  constructor(private apiService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.loadUser();
    this.newuser();
  }

  loadUser(): void {
    this.apiService.getAll().subscribe({
      next: (data) => {
        this.users = data.map((user: any) => new User(user));
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  onEdit(item: User): void { 
    this.currentUser = { ...item };
    this.isListView = false;
  }
  
  onDelete(id: string): void {
    this.apiService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  newuser(): void {
    this.currentUser = {
      id: '',
      username: '',
      password: '',
      email:'',
      ageInYears: 0,
      status: '',
      roles: []
    };
  }

  refreshList(): void {
    this.loadUser();
    this.newuser();
    this.currentIndex = -1;
  }

  onSubmit(userForm: any): void {
    if (userForm.valid) {
      console.log("Form is valid", userForm.value);
  
      this.removeAllusers();
    } else {
      console.log("Form is invalid");
    }
  }

  removeAllusers(): void {
    this.apiService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  updateCurrentUser(id: string, user: User): void {
    this.message = '';

    this.apiService.update(id, user).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'A felhasználó frissítve lett';
      },
      error: (e) => console.error(e)
    });
  }
}
