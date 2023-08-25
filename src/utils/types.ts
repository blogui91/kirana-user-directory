export interface User {
    name: string;
    email: string;
    phone: string;
}

export interface UserWithId extends User {
    id: string;
}

export interface UserWithValidations extends UserWithId {
    isDuplicate: boolean;
    isPhoneValid: boolean;
    isEmailValid: boolean;
    isNameDuplicate: boolean;
    isEmailDuplicate: boolean;
    isPhoneDuplicate: boolean;
    nameDuplicateCount: number;
    emailDuplicateCount: number;
    phoneDuplicateCount: number;
}

export interface HeaderMap {
    Nombre: string;
    'Correo Electronico': string;
    Telefono: string;
}

export type HeaderKey = keyof HeaderMap;