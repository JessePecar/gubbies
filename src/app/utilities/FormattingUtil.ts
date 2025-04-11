import { Address } from '@/interfaces/settings/users';

export function getLocationLine(address: Address) {
  const addressArray: string[] = [];
  const addressParts: (keyof Address)[] = ['city', 'state', 'countryCode'];

  // Take the address parts that are set above and grab the property from the address object and add to the array
  if (address) {
    addressParts.forEach(ap => {
      if (address[ap]) {
        addressArray.push(address[ap] + '');
      }
    });
  }

  return addressArray.join(', ');
}
