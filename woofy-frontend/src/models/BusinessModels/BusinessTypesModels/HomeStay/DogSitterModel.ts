import { HomestayBaseModel } from "./HomestayBaseModel";
import {BUSINESS_TYPES} from "../../../Enums/Enums";

export class DogSitterModel extends HomestayBaseModel {
    businessType: BUSINESS_TYPES = BUSINESS_TYPES.DOG_SITTER;
    constructor() {
        super();
    }
}

