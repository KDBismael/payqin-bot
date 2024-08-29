interface UserMessagePropsI extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    message: UserMessageI
}

export const UserMessage = (props: UserMessagePropsI) => {
    const { message, className } = props;
    return <>
        <div id={message.id} className={`user anchors quick-replies-text px-3 py-4 rounded-2xl my-3 mx-4 w-fit  ${className}`} style={{ wordWrap: 'break-word', lineHeight: "20px", whiteSpace: "pre-wrap", borderBottomRightRadius: "3px", background: "#0156f9", color: "rgb(255, 255, 255)" }}>
            <span>{message.query}</span>
        </div>
    </>
}