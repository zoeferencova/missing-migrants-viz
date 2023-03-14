export const ScrubTooltip = ({ text, hide }) => {
    return (
        <div className="tooltip" style={{ opacity: hide ? 0 : 1 }}>
            <span className="tooltiptext">{text}</span>
        </div>
    )
};
