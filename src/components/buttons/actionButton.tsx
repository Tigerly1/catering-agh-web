import React from 'react'
import styles from "src/styles/components/buttons/actionButton.module.scss";
const ActionButton = ({
    text,
    onClick,
}: {
    text: string;
    onClick?: any;
}) => {
    let disabled = false;

    return (
        <div
            className={styles.action_btn_wrapper}
            onClick={() => {
                if (onClick) {
                    if (!disabled) {
                        disabled = true;
                        setTimeout(() => {
                            disabled = false
                        }, 400)
                        onClick()
                    }
                }
            }}
        >
            <span className={styles.btn_text}>{text}</span>
        </div>
    )
}

export default ActionButton;