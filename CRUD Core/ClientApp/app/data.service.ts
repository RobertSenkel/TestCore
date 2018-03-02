import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class DataService {

    private url = "/api/Users";

    constructor(private http: HttpClient) {
    }

    getUsers(user: User) {
        return this.http.post(this.url + '/all', user);
    }

    createUser(user: User) {
        return this.http.post(this.url, user);
    }
    updateUser(user: User) {

        return this.http.put(this.url + '/' + user. id, user);
    }
    deleteUser(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}