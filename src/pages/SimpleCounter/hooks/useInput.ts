import { useState, ChangeEvent } from 'react';

export default function useInput(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return [value, onChange] as const; // 타입 안정성을 위해 `as const` 사용
}
