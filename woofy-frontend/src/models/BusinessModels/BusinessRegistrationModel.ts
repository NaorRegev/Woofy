// This information is retrieved from business-registration-page
import BasicSignUpModel from "../UserModels/BasicSignUpModel"
class BusinessRegistrationModel {
    basicSignUpModel: BasicSignUpModel;
    firstName: string;
    lastName: string;
    businessName: string; // Optional
    phoneNumber: string;
    address: string;
    city: string;
    zipCode: string;

    constructor(basicSignUpModel: BasicSignUpModel, firstName: string, lastName: string, businessName: string, phoneNumber: string, address: string, city: string, zipCode: string) {
        this.basicSignUpModel = basicSignUpModel;
        this.firstName = firstName;
        this.lastName = lastName;
        this.businessName = businessName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
    }
}

// TODO Finish the business class model!@!@##@!$#!@!@#!@@#@!#@!#!@#!@#!@#@!#!@# this is temp.....





