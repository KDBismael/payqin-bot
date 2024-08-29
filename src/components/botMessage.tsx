import React from "react";
import { sendMessageApi } from "../api";
import { useBotStore } from "../stores/bot-store";
import { QuickActionButton } from "./quickActionButton";

interface BotMessagePropsI extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    message: BotMessageI,
    islast: boolean,
}

export const BotMessage = (props: BotMessagePropsI) => {
    const { toggleTicketCreation } = useBotStore();
    const { message, islast, className, ...restProps } = props;
    const addMessage = useBotStore().addNewMessage;
    const contactTerSupport = async () => {
        addMessage({ id: 'b', query: "contact support", });
        const res = await sendMessageApi('contact support', "👎 Non");
        setTimeout(() => {
            addMessage({ id: 'b', response: "Nous avons besoin de certaines informations pour la création de votre ticket", showFeedback: false });
            if (res?.status == 200)
                addMessage({ id: 'b', response: res.data.message, showFeedback: res.data.haveFeedBack });
            toggleTicketCreation();
        }, 1000);
    }
    const continuer = () => {
        addMessage({ id: 'b', query: "Continuer", });
        setTimeout(() => {
            addMessage({ id: 'no', date: new Date(), response: "Vous pouvez continuer, nous essayerons de vous satisfaire" })
        }, 1000);
    }
    const onNegative = () => {
        addMessage({ id: 'no', date: new Date(), query: "👎 Non" })
        setTimeout(() => {
            addMessage({ id: 'no', date: new Date(), response: "Nous sommes vraiment desolées d'entendre cela, que souhaitez vous faire?" })
            addMessage({ id: 'no', date: new Date(), message: "Continuer", action: continuer })
            addMessage({ id: 'no', date: new Date(), message: "Contacter le support", action: contactTerSupport })
        }, 1000);
    }

    const onPositive = () => {
        addMessage({ id: 'yes', date: new Date(), query: "👍 Oui" });
        setTimeout(() => {
            addMessage({ id: 'yes', date: new Date(), response: "Nous sommes vraiment ravis d'entendre cela 😊, merci pour votre feedback." })
        }, 1000);
    }

    return <>
        <div className={`anchors quick-replies-text px-3 py-4 rounded-2xl my-3 mx-4 w-fit ${className}`} style={{ wordWrap: 'break-word', lineHeight: "20px", whiteSpace: "pre-wrap", borderTopLeftRadius: "3px", background: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }} {...restProps}>
            {message.response}
        </div>
        {message.showFeedback ? <>
            <div className="anchors quick-replies-text px-3 py-4 rounded-2xl my-1 mx-4 w-fit" style={{ wordWrap: 'break-word', lineHeight: "20px", whiteSpace: "pre-wrap", borderTopLeftRadius: "3px", background: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }}>
                <span>Ceci vous a-t-il été utile ?</span>
            </div>
            {islast ?
                <div className="flex gap-3 justify-center mb-2">
                    <QuickActionButton onClick={() => onPositive()} className="!mx-0" text="👍 Oui" />
                    <QuickActionButton onClick={() => onNegative()} className="!mx-0" text="👎 Non" />
                </div>
                : null
            }
        </>
            : null}
    </>
}