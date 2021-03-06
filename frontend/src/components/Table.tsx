import React from 'react'
import './table.css'

type TableProps = {
    children?: React.ReactNode
}
export const Table = ({ children }: TableProps) => {
    return (
        <div className="vc-table">
            {children}
        </div>
    )
}

type RowProps = {
    children?: React.ReactNode
}
export const Row = ({ children }: RowProps) => {
    return (
        <div className="vc-table-row">
            {children}
        </div>
    )
}

type CellProps = {
    children?: React.ReactNode
    className?: string
    [key: string]: any
}
export const Cell = ({ children, className, ...otherProps }: CellProps) => {
    return (
        <div className={`vc-table-cell ${className || ''}`} {...otherProps}>
            {children}
        </div>
    )
}