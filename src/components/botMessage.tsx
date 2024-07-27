import { QuickActionButton } from "./quickActionButton";

interface BotMessagePropsI extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    message: BotMessageI,
    isLast: boolean,
}

export const BotMessage = (props: BotMessagePropsI) => {
    const { message, isLast, className } = props;

    return <>
        <div className={`anchors quick-replies-text px-3 py-4 rounded-2xl my-6 mx-4 w-max ${className}`} style={{ wordWrap: 'break-word', lineHeight: "20px", whiteSpace: "pre-wrap", borderTopLeftRadius: "3px", background: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }}>
            {message.response}
        </div>
        <div className="anchors quick-replies-text px-3 py-4 rounded-2xl my-1 mx-4 w-max" style={{ wordWrap: 'break-word', lineHeight: "20px", whiteSpace: "pre-wrap", borderTopLeftRadius: "3px", background: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }}>
            <span>Was this helpfull?</span>
        </div>
        {isLast ?
            <div className="flex gap-3 justify-center">
                <QuickActionButton className="mx-0 justify-end" text="👍 Oui" />
                <QuickActionButton className="mx-0 justify-start" text="👎 Non" />
            </div>
            : null
        }
    </>
}