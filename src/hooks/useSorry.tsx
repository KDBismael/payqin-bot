import { useEffect, useState } from "react";
import { useBotStore } from "../stores/bot-store";

const useSorry = () => {
    const { addNewMessage } = useBotStore();
    const [isSorry, setIsSorry] = useState(false);
    useEffect(() => {
        if (!isSorry) return;
        setTimeout(() => {
            addNewMessage({ id: 'k', response: "nous sommes desole d'entendre cela", probability: 1, date: new Date() })
            addNewMessage({ id: 'j', message: 'menu principal', action: () => { } })
            addNewMessage({ id: 'j', message: 'Contacter le support', action: () => { } })
        }, 3000);
    }, [isSorry])

    return { setIsSorry }
}

export { useSorry };
