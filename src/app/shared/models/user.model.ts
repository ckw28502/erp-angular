export class User {
    private _username: string;
    private _password: string;

    constructor(data: {username: string, password: string}) {
        this._username = data.username;
        this._password = data.password;
    }

    getUsername(): string {
        return this._username;
    }

    getPassword(): string {
        return this._password;
    }
}