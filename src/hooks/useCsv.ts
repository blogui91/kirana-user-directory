import { useState } from "react";
import { generateIdsForList, parseToJson, validateList } from "../utils";
import { HeaderMap, UserWithValidations } from "../utils/types";

const TIMEOUT = 3000;

export const useCsvToJson = (headerMap: HeaderMap) => {
    const [isBusy, setIsBusy] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState<UserWithValidations[]>([]);

    const convert = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            setIsBusy(true);
            reader.onload = function (event) {
               const text = event.target?.result;
               
               // added timeout just to simulate a long running process
               if (text) {
                setTimeout(() => {
                    setIsBusy(false);
                    const list = validateList(
                        generateIdsForList(parseToJson(text as string, headerMap))
                    );
                    resolve(list);
                    setData(list);
                    setIsLoaded(true);
                }, TIMEOUT);
               }
            };

            reader.onerror = function (event) {
                setIsBusy(false);
                reject(event);
            };

            reader.readAsText(file);
        });
    }

    return {
        isLoaded,
        convert,
        isBusy,
        data,
    };
}