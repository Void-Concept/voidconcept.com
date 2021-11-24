import React, { MouseEventHandler, useState } from 'react';
import { useHistory } from 'react-router';

export type LinkProps = {
    href: string
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const Link = ({href, ...restProps}: LinkProps) => {
    const history = useHistory();
    const goToRoute: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault()
        history.push(href)
    }

    return <a {...restProps} href={href} onClick={goToRoute} />
}
