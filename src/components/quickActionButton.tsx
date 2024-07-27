interface quickActionButtonI extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text?: string
}

export const QuickActionButton = (props: quickActionButtonI) => {
    const { text, className, ...restProps } = props;

    return <>
        <div
            className={`single-button w-max border h-8 flex items-center justify-center m-1 rounded-2xl px-3 py-1 mx-auto cursor-pointer ${className}`}
            style={{ borderColor: "rgb(0, 102, 255)", color: "rgb(0, 102, 255)", background: "rgb(255, 255, 255)" }}
            {...restProps}
        >
            <span>{text ?? "🔨 Build AI chatbot"}</span>
        </div>
    </>
}