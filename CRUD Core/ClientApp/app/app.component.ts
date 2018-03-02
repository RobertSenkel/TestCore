import { Component,OnInit } from '@angular/core';
import { DataService } from './data.service';
import { User } from './user';
 

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnInit {

    user: User = new User();  
    users: User[];
    tableMode: boolean =false;         
 
    constructor(private dataService: DataService) { }
 
    ngOnInit() {
       
    }
    
    loadUsers() {
        this.dataService.getUsers(this.user)
            .subscribe((data: User[]) => this.users = data);
        this.tableMode = true;
    }
    
    save() {
        if (this.user.id == null) {
            this.dataService.createUser(this.user)
                .subscribe((data: User) => this.users.push(data));
        } else {
            this.dataService.updateUser(this.user)
                .subscribe(data => this.loadUsers());
        }
        this.cancel();
    }
    editUser(u: User) {
        this.user = u;
    }
    cancel() {
        this.user = new User();
        this.tableMode = true;
    }
    delete(u: User) {
        this.dataService.deleteUser(u.id)
            .subscribe(data => this.loadUsers());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
    logout() {
        this.tableMode = true;
    }
}