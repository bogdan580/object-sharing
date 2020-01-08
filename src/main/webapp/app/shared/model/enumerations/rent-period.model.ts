/* eslint-disable */
export enum RentPeriod {
  HOUR = 'HOUR',
  DAY = 'DAY'
}


export namespace RentPeriod {

  export function values() {
    return Object.keys(RentPeriod).filter(
      (type) => isNaN(type as any) && type !== 'values'
    );
  }
}
