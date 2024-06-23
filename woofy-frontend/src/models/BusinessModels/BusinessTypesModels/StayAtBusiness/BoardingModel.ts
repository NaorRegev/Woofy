import {StayAtBusinessBaseModel} from "./StayAtBusinessBaseModel";
import {BUSINESS_TYPES} from "../../../Enums/Enums";
export class BoardingModel extends StayAtBusinessBaseModel {
    businessType: BUSINESS_TYPES = BUSINESS_TYPES.BOARDING;
    constructor() {
        super();
    }
}

