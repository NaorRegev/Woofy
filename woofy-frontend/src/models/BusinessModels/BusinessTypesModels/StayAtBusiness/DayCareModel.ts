import {StayAtBusinessBaseModel} from "./StayAtBusinessBaseModel";
import {BUSINESS_TYPES} from "../../../Enums/Enums";

export class DayCareModel extends StayAtBusinessBaseModel {
    businessType: BUSINESS_TYPES = BUSINESS_TYPES.DAY_CARE;
    constructor() {
        super();
    }

}

