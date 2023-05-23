import { Injectable } from "@angular/core";
import { NbAuthService } from "@nebular/auth";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private authService: NbAuthService) { }
    getToken() {
        return this.authService.getToken()
    }
}