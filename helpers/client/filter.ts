import { checkInIsWithinCurrentWeek, checkInIsCloserLastWeek } from './date';

import type { CheckInDto, MemberDto } from '../../entities';
import type { CheckInString, BooleanPropString } from '../../types';

export const filterMembersByCountry = (countryQuery: string, members: MemberDto[]): MemberDto[] => {
  return members.filter(({ checkIn }) => checkIn && checkIn.country === countryQuery);
};

export const filterMembersByState = (stateQuery: string, members: MemberDto[]): MemberDto[] => {
  return members.filter(({ checkIn }) => checkIn && checkIn.state === stateQuery);
};

export const filterMembersByCity = (cityQuery: string, members: MemberDto[]): MemberDto[] => {
  return members.filter(({ checkIn }) => checkIn && checkIn.city === cityQuery);
};

export const filterMembersByLastCheckInString = (query: CheckInString, members: MemberDto[]) => {
  switch (query) {
    case 'current_week':
      return members.filter((member) => checkInIsWithinCurrentWeek(member.checkIn));
    case 'last_week':
      return members.filter((member) => checkInIsCloserLastWeek(member.checkIn));
    case 'never':
      return members.filter((member) => member.checkIn === null);
    case 'other':
      return members.filter((member) => {
        const isToday = checkInIsWithinCurrentWeek(member.checkIn);
        const isYesterday = checkInIsCloserLastWeek(member.checkIn);
        const isNull = member.checkIn === null;

        return Boolean(!isToday && !isYesterday && !isNull);
      });
    default:
      return members;
  }
};

export const filterMembersByIsSafe = (isSafe: BooleanPropString, members: MemberDto[]): MemberDto[] => {
  return filterMembersByBoolCheckInValue({
    members,
    value: isSafe,
    prop: 'isSafe',
  });
};

export const filterMembersByCanWork = (canWork: BooleanPropString, members: MemberDto[]): MemberDto[] => {
  return filterMembersByBoolCheckInValue({
    members,
    value: canWork,
    prop: 'isAbleToWork',
  });
};

export const filterMembersByIsAbleToRelocate = (isAbleToRelocate: BooleanPropString, members: MemberDto[]): MemberDto[] => {
  return filterMembersByBoolCheckInValue({
    members,
    value: isAbleToRelocate,
    prop: 'isAbleToRelocate',
  });
};

type FilterMemberByBoolCheckInValueParams = {
  value: BooleanPropString;
  prop: keyof CheckInDto;
  members: MemberDto[];
}

const filterMembersByBoolCheckInValue = ({ value, prop, members }: FilterMemberByBoolCheckInValueParams): MemberDto[] => {
  switch (value) {
    case 'yes':
      return members.filter((member) => member.checkIn && member.checkIn[prop] === true);
    case 'no':
      return members.filter((member) => member.checkIn && member.checkIn[prop] === false);
    case 'both':
      return members;
    default:
      return members;
  }
};

export const filterMembersByIsMobilized = (isMobilized: BooleanPropString, members: MemberDto[]): MemberDto[] => {
  return filterMembersByBoolValue({
    members,
    value: isMobilized,
    prop: 'isMobilized',
  });
};

export const filterMembersByIsExemptFromCheckIn = (IsExemptFromCheckIn: BooleanPropString, members: MemberDto[]): MemberDto[] => {
  return filterMembersByBoolValue({
    members,
    value: IsExemptFromCheckIn,
    prop: 'isExemptFromCheckIn',
  });
};

type FilterMemberByBoolValueParams = {
  value: BooleanPropString;
  prop: keyof MemberDto;
  members: MemberDto[];
}

const filterMembersByBoolValue = ({ value, prop, members }: FilterMemberByBoolValueParams): MemberDto[] => {
  switch (value) {
    case 'yes':
      return members.filter((member) => member[prop] === true);
    case 'no':
      return members.filter((member) => member[prop] === false);
    case 'both':
      return members;
    default:
      return members;
  }
}
