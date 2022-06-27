export default interface ProfileInterface {
    _id?: string;
    img: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    available: boolean;
    friend?: ProfileInterface[];
}