import React, { MouseEventHandler, useState } from 'react';
import { useHistory } from 'react-router';

export type LinkProps = {
    href: string
    disabled?: boolean
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const Link = ({href, disabled, ...restProps}: LinkProps) => {
    const history = useHistory();
    const goToRoute: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault()
        if (!disabled) {
            history.push(href)
        }
    }

    return <a {...restProps} href={href} onClick={goToRoute} />
}
