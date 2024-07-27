import { useBotStore } from "../stores/bot-store";
import { QuickActionButton } from "./quickActionButton";

interface BotMessagePropsI extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    message: BotMessageI,
    islast: boolean,
}

export const BotMessage = (props: BotMessagePropsI) => {
    const { message, islast, className, ...restProps } = props;
    const addMessage = useBotStore().addNewMessage;

    return <>
        <div className={`anchors quick-replies-text px-3 py-4 rounded-2xl my-6 mx-4 w-max ${className}`} style={{ wordWrap: 'break-word', lineHeight: "20px", whiteSpace: "pre-wrap", borderTopLeftRadius: "3px", background: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }} {...restProps}>
            {message.response}
        </div>
        <div className="anchors quick-replies-text px-3 py-4 rounded-2xl my-1 mx-4 w-max" style={{ wordWrap: 'break-word', lineHeight: "20px", whiteSpace: "pre-wrap", borderTopLeftRadius: "3px", background: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }}>
            <span>Was this helpfull?</span>
        </div>
        {islast ?
            <div className="flex gap-3 justify-center mb-2">
                <QuickActionButton onClick={() => addMessage({ id: 'yes', date: new Date(), query: "👍 Oui" })} className="mx-0 justify-end" text="👍 Oui" />
                <QuickActionButton onClick={() => addMessage({ id: 'no', date: new Date(), query: "👎 Non" })} className="mx-0 justify-start" text="👎 Non" />
            </div>
            : null
        }
    </>
}