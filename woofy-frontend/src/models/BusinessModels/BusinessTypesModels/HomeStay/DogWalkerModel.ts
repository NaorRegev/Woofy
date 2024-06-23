import {HomestayBaseModel} from "./HomestayBaseModel";
import {BUSINESS_TYPES} from "../../../Enums/Enums";

export class DogWalkerModel extends HomestayBaseModel {
    businessType: BUSINESS_TYPES = BUSINESS_TYPES.DOG_WALK;
    constructor() {
        super();
    }
}

