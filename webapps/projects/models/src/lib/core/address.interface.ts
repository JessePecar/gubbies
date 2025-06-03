export interface Address {
  id: number | null;
  address1: string;
  address2?: string | null;
  state: string;
  city: string;
  countryCode: string;
  postalCode: number;
}
