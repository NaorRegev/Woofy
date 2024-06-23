import { BUSINESS_TYPES} from "../Enums/Enums";
import { DogSitterModel } from "./BusinessTypesModels/HomeStay/DogSitterModel";
import { DogWalkerModel } from "./BusinessTypesModels/HomeStay/DogWalkerModel";
import { BoardingModel } from "./BusinessTypesModels/StayAtBusiness/BoardingModel";
import { DayCareModel } from "./BusinessTypesModels/StayAtBusiness/DayCareModel";

export interface Business {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    about: string | null;
    businessName: string;
    businessTypes: BUSINESS_TYPES[];
    dogSitterEntity: DogSitterModel;
    dogWalkerEntity: DogWalkerModel;
    boardingEntity: BoardingModel;
    dayCareEntity: DayCareModel;
    socialMedia: string | null;
    website: string | null;
    lat: number;
    lon: number;
    profilePhotoID: number | null;
    images: number[];
}