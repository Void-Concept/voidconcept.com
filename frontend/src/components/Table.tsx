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
}
export const Cell = ({ children, className }: CellProps) => {
    return (
        <div className={`vc-table-cell ${className || ''}`}>
            {children}
        </div>
    )
}