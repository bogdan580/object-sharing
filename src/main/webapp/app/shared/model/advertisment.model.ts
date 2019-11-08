import { ObjectStatus } from 'app/shared/model/enumerations/object-status.model';

export interface IAdvertisment {
  id?: number;
  title?: string;
  imageUrl?: string;
  desc?: string;
  status?: ObjectStatus;
}

export class Advertisment implements IAdvertisment {
  constructor(public id?: number, public title?: string, public imageUrl?: string, public desc?: string, public status?: ObjectStatus) {}
}
