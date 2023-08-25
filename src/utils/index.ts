import { HeaderKey, HeaderMap, User, UserWithId, UserWithValidations } from "./types";

export const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    return re.test(email);
}

export const generateIdsForList = (list: User[]): UserWithId[] => {
    return list
        .filter(item => item.name && item.email && item.phone)
        .map(item => {
            const id = Object.values(item).join('-').split(' ').join('-');

            return {
                ...item,
                id,
            } as UserWithId;
        })
}

export const validateList = (list: UserWithId[]): UserWithValidations[] => {
    const map = new Map<string, number>();
    const nameMap = new Map<string, number>();
    const emailMap = new Map<string, number>();
    const phoneMap = new Map<string, number>();

    const result = list.map(item => {
        const count = map.get(item.id) || 0;
        map.set(item.id, count + 1);

        const nameCount = nameMap.get(item.name) || 0;
        nameMap.set(item.name, nameCount + 1);

        const emailCount = emailMap.get(item.email) || 0;
        emailMap.set(item.email, emailCount + 1);

        const phoneCount = phoneMap.get(item.phone) || 0;
        phoneMap.set(item.phone, phoneCount + 1);

        return {
            ...item,
            id: count > 0 ? `${item.id}___${count}` : item.id,
            isDuplicate: count > 0,
            isNameDuplicate: nameCount > 0,
            isEmailDuplicate: emailCount > 0,
            isPhoneDuplicate: phoneCount > 0,

            nameDuplicateCount: nameCount,
            emailDuplicateCount: emailCount,
            phoneDuplicateCount: phoneCount,
            
            isPhoneValid: item.phone?.length === 10,
            isEmailValid: validateEmail(item.email),
        }
    });

    return result;
}

export const parseToJson = (csv: string, headerMap: HeaderMap) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');

    /* Omit the first line (headers) and map the rest of the lines to objects */
    const result = lines.slice(1).map(line => {
        const row = {} as any;
        const currentline = line.split(',');

        headers.forEach((header, index) => {
            // The header may have spaces or line breaks \n or \r, etc
            const sanitizedHeader = sanitizeValue(header);

            const fieldName = headerMap[sanitizedHeader as HeaderKey];

            row[fieldName] = sanitizeValue(currentline[index]);
        })

        return row;
    })

    return result;
}

export const sanitizeValue = (value: string): string => {
    const clean = value?.replace(/(\r\n|\n|\r)/gm,"")

    return clean?.trim();
}