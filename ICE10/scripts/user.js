"use strict";
var core;
(function (core) {
    class User {
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }
        get DisplayName() {
            return this.m_displayName;
        }
        set DisplayName(name) {
            this.m_displayName = name;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }
        get Username() {
            return this.m_displayName;
        }
        set Username(username) {
            this.m_username = username;
        }
        get Password() {
            return this.m_displayName;
        }
        set Password(password) {
            this.m_password = password;
        }
        toString() {
            return `Display Name: ${this.m_displayName}\nEmail Address: ${this.m_emailAddress}\nUsername: ${this.m_username}`;
        }
        toJSON() {
            return {
                "DisplayName": this.m_displayName,
                "EmailAddress": this.m_emailAddress,
                "Username": this.m_username
            };
        }
        fromJSON(data) {
            this.m_displayName = data.DisplayName;
            this.m_emailAddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }
        serialize() {
            if (this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username}`;
            console.error("One or more properties or fields of the Contact Object are missing or invalid!");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map