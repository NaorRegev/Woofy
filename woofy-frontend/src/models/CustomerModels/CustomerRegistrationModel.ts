// This information is retrieved from user-registration-page
import BasicSignUpModel from "../UserModels/BasicSignUpModel";
import DogModel from "../DogModels/DogModel";

class CustomerRegistrationModel {
    basicSignUpModel: BasicSignUpModel;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dog: DogModel
    constructor(basicSignUpModel: BasicSignUpModel, firstName: string, lastName: string, phoneNumber: string, dog: DogModel) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.basicSignUpModel = basicSignUpModel;
        this.dog = dog;
    }

}

export default CustomerRegistrationModel;