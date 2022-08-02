import {ProtectedCheckInDto} from '../../entities';
import {isAfter, isBefore, subHours, addDays} from 'date-fns';

import type {Nullable} from '../../types';

export const checkInIsWithinCurrentWeek = <T extends ProtectedCheckInDto>(checkIn: Nullable<T>): boolean => {
    if (!checkIn) {
        return false;
    }

    const date = new Date(checkIn.createdAt as unknown as string);

    return isWithinCurrentWeek(date);
};

export const isWithinCurrentWeek = (date: Nullable<Date>): boolean => {
    return isWithinNHours(date, 168);
}

export const isWithinNHours = (date: Nullable<Date>, hours: number): boolean => {
    if (!date) {
        return false;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const firstDay = currentDate.getDate() - currentDate.getDay() + 1;
    const lastDayWeek = new Date(currentDate.setDate(firstDay + 6));

    const dateUTC = convertDateToUTC(date);
    const dateNHoursAgo = convertDateToUTC(subHours(lastDayWeek, hours));

    return isAfter(dateUTC, dateNHoursAgo);
}

export const checkInIsCloserLastWeek = <T extends ProtectedCheckInDto>(checkIn: Nullable<T>): boolean => {
    if (!checkIn) {
        return false;
    }

    const date = new Date(checkIn.createdAt as unknown as string);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const firstDay = currentDate.getDate() - currentDate.getDay() - 6;
    const lastWeekFirstDay = new Date(currentDate.setDate(firstDay));
    const lastWeekLastDay = addDays(lastWeekFirstDay, 7);

    return Boolean(isAfter(date, lastWeekFirstDay) && isBefore(date, lastWeekLastDay));
};

export const convertDateToUTC = (date: Date) => Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
);
