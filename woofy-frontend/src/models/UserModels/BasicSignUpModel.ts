// This information is retrieved from user-registration-page
class BasicSignUpModel {
    email: string;
    password: string;
    confirmPassword: string;

    constructor(email: string, password: string, confirmPassword: string) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

}

export default BasicSignUpModel;