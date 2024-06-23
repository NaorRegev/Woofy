import {BusinessTypeBaseModel} from "../BusinessTypeModel";

export abstract class HomestayBaseModel extends BusinessTypeBaseModel {
    appointmentLengthInMinutes: number = 60;
    protected constructor() {
        super();
    }
}

