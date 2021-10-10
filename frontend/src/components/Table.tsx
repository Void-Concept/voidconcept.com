import React from 'react'
import './table.css'

type TableProps = {
    children?: React.ReactNode
}
export const Table = ({ children }: TableProps) => {
    return (
        <table className="vc-table">
            {children}
        </table>
    )
}

type RowProps = {
    children?: React.ReactNode
    [otherProps: string]: any
}
export const Row = ({ children, ...restProps }: RowProps) => {
    return (
        <tr className="vc-table-row" {...restProps}>
            {children}
        </tr>
    )
}

type CellProps = {
    children?: React.ReactNode
    className?: string
    [key: string]: any
}
export const Cell = ({ children, className, ...otherProps }: CellProps) => {
    return (
        <td className={`vc-table-cell ${className || ''}`} {...otherProps}>
            {children}
        </td>
    )
}