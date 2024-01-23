import React, {FC} from "react";

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
    classes?: string

}

export const Button: FC<ButtonPropsType> = ({title, isDisabled, onClickHandler, classes}) => {
    return (
        <button className={classes}
                disabled={isDisabled}
                onClick={onClickHandler}
        >
            {title}
        </button>
    )
}