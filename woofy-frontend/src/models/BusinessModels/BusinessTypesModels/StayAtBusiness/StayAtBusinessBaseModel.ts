import {BusinessTypeBaseModel} from "../BusinessTypeModel";
import {HOME_CONDITIONS, PETS_IN_HOME} from "../../../Enums/Enums";

export abstract class StayAtBusinessBaseModel extends BusinessTypeBaseModel {
    dogCapacity: number = 0;
    homeConditions: HOME_CONDITIONS[] = [];
    petsInHome: PETS_IN_HOME[] = [];
    protected constructor() {
        super();
    }
}

