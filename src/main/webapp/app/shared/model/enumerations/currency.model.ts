export enum Currency {
  BEER = 'BEER',
  PLN = 'PLN',
  EUR = 'EUR',
  USD = 'USD'
}

export namespace Currency {

  export function values() {
    return Object.keys(Currency).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
