function User(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

User.prototype.getFirstName = function() {
    return this.firstName;
}

User.prototype.getLastName = function() {
    return this.lastName;
}

User.prototype.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
}