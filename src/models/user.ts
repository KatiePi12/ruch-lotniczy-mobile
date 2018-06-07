import {Airport} from './airport';
import {Rating} from './rating';
import {RatingEndorsement} from './rating-endorsement';
import {RatingLanguage} from './rating-language';
import {RatingWExpires} from './rating-w-expires';

export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public systemRole: string;
  public role: string;
  public airport: Airport;
  public birthDate: string;
  public birthPlace: string;
  public available: string;
  public licenceId: string;
  public licenceType: string;
  public licenceExpireDate: Date;
  public medicalExpireDate: Date;
  public licenceComments: string;
  public militaryRank: string;
  public pesel: string;
  public fathersName: string;
  public entryDate: string;
  public milBaseNr: string;
  public milBaseName: string;
  public nis: string;
  public officeTerm: Date;
  public atc_ratings: Rating[];
  public atc_rating_endorsements: RatingEndorsement[];
  public atc_ratings_languages: RatingLanguage[];
  public atc_ratings_w_expires: RatingWExpires[];
  public token: string;

  constructor() { }
}
