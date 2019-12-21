export enum RentPeriod {
  HOUR = 'HOUR',
  DAY = 'DAY'
}


export namespace RentPeriod {

  export function values() {
    return Object.keys(RentPeriod).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
