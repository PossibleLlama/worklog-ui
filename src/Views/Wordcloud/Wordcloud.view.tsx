import React, { useEffect, useState } from "react";

import Container from "@component/Container/Container.component";

type Props = {
    words: WordData[];
    className?: string;
};

export interface WordData {
    text: string,
    value: number,
}

interface SizeRange {
    value: number,
    style: string
}

const Wordcloud: React.FC<Props> = (props: Props) => {
    const [sizeRange, setSizeRange] = useState<SizeRange[]>([]);

    useEffect(() => {
        const values: number[] = [...new Set(props.words.map((w) => w.value))].sort();
        // If there are more than 9 entries, only use the most popular
        if (values.length > 9) {
            values.slice(0, 9);
        }
        const computedSizeRange:SizeRange[] = [];
        const midpoint = values.length > 2 ? values[values.length/2] : values[0];
        values.forEach((e) => {
            if (e === Math.max(...values)) {
                computedSizeRange.push({ value: e, style: "text-opacity-100 text-4xl" });
            }
            else if (e === Math.min(...values)) {
                computedSizeRange.push({ value: e, style: "text-opacity-25 text-sm" });
            }
            else if (e < midpoint) {
                computedSizeRange.push({ value: e, style: "text-opacity-40 text-base" });
            }
            else if (e > midpoint) {
                computedSizeRange.push({ value: e, style: "text-opacity-80 text-2xl" });
            }
            else if (e === midpoint) {
                computedSizeRange.push({ value: e, style: "text-opacity-60 text-lg" });
            }
        });

        setSizeRange(computedSizeRange);
    }, [props.words]);

    return (
        <Container className={`max-w-2xl mx-auto my-4 ${props.className}`} >
            <ul className="flex flex-wrap items-center justify-center text-base" >
                {shuffleWordData(props.words).map((word) => {
                    return (
                        <li key={word.text} className={`p-1 block relative text-gray-800 ${sizeRange.find((e) => e.value === word.value)?.style}`} >
                            {word.text} - {word.value}
                        </li>
                    );
                })}
            </ul>
        </Container>
    );
};

// From https://stackoverflow.com/a/12646864
function shuffleWordData(array:WordData[]): WordData[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(decimalHash(array.toString()) * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Chosen from https://onlinerandomtools.com/generate-random-primes
// Didn't have to be a prime and wasn't particularly random, just needed a number incase codePointAt fails.
const randomPrime = 51071;

// From https://stackoverflow.com/a/61634233
// We don't care about uniqueness, just a pseudo random number
const decimalHash = (str: string) => {
    let sum = 0;
    for (let i = 0; i < str.length; i++)
        sum += (i + 1) * (str.codePointAt(i) ?? randomPrime) / (1 << 8);
    return sum % 1;
};

export default Wordcloud;
