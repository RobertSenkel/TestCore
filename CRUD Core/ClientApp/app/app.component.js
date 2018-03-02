var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { User } from './user';
var AppComponent = (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.user = new User();
        this.tableMode = false;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.loadUsers = function () {
        var _this = this;
        this.dataService.getUsers(this.user)
            .subscribe(function (data) { return _this.users = data; });
        this.tableMode = true;
    };
    AppComponent.prototype.save = function () {
        var _this = this;
        if (this.user.id == null) {
            this.dataService.createUser(this.user)
                .subscribe(function (data) { return _this.users.push(data); });
        }
        else {
            this.dataService.updateUser(this.user)
                .subscribe(function (data) { return _this.loadUsers(); });
        }
        this.cancel();
    };
    AppComponent.prototype.editUser = function (u) {
        this.user = u;
    };
    AppComponent.prototype.cancel = function () {
        this.user = new User();
        this.tableMode = true;
    };
    AppComponent.prototype.delete = function (u) {
        var _this = this;
        this.dataService.deleteUser(u.id)
            .subscribe(function (data) { return _this.loadUsers(); });
    };
    AppComponent.prototype.add = function () {
        this.cancel();
        this.tableMode = false;
    };
    AppComponent.prototype.logout = function () {
        this.tableMode = true;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app',
        templateUrl: './app.component.html',
        providers: [DataService]
    }),
    __metadata("design:paramtypes", [DataService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map