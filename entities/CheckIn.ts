import { RecordableEntity, RecordableEntityAttributes, SerializableTimestamps } from './RecordableEntity';

import type { IDtoable, IProtectedDtoable } from './interfaces';
import type { Nullable } from '../types';

export interface CheckInAttributes extends RecordableEntityAttributes {
  latitude: Nullable<number>;
  longitude: Nullable<number>;
  country: Nullable<string>;
  state: Nullable<string>;
  city: Nullable<string>;
  isSafe: boolean;
  isAbleToWork: boolean;
  isAbleToRelocate: boolean;
  numberOfPeople: Nullable<number>;
  comment: Nullable<string>;
  memberId: string;
}

export type CheckInDto = Omit<CheckInAttributes, 'createdAt' | 'updatedAt'> & SerializableTimestamps;

export type ProtectedCheckInDto = Omit<CheckInDto, 'isSafe' | 'isAbleToWork' | 'isAbleToRelocate' | 'numberOfPeople' | 'comment'>;

export class CheckIn extends RecordableEntity implements IDtoable<CheckInDto>, IProtectedDtoable<ProtectedCheckInDto> {
  public readonly latitude: Nullable<number>;
  public readonly longitude: Nullable<number>;
  public readonly country: Nullable<string>;
  public readonly state: Nullable<string>;
  public readonly city: Nullable<string>;
  public readonly isSafe: boolean;
  public readonly isAbleToWork: boolean;
  public readonly isAbleToRelocate: boolean;
  public readonly numberOfPeople: Nullable<number>;
  public readonly comment: Nullable<string>;
  public readonly memberId: string;

  constructor(params: CheckInAttributes) {
    super(params);

    this.latitude = params.latitude;
    this.longitude = params.longitude;
    this.country = params.country;
    this.state = params.state;
    this.city = params.city;
    this.isSafe = params.isSafe;
    this.isAbleToWork = params.isAbleToWork;
    this.isAbleToRelocate = params.isAbleToRelocate;
    this.numberOfPeople = params.numberOfPeople;
    this.comment = params.comment;
    this.memberId = params.memberId
  }

  public toDto(): CheckInDto {
    return Object.freeze({
      ...this,
      ...this.getSerializableTimestamps(),
    });
  }

  public toProtectedDto(): ProtectedCheckInDto {
    const {
      isSafe,
      isAbleToWork,
      isAbleToRelocate,
      numberOfPeople,
      comment,
      ...rest
    } = this;

    return Object.freeze({
      ...rest,
      ...this.getSerializableTimestamps(),
    });
  }
}
