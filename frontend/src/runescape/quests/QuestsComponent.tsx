import React, { useMemo, ChangeEventHandler } from 'react';
import { useState, useEffect } from 'react';
import { Table, Row, Cell } from '../../components';
import './quest-component.css';

enum QuestStatus {
    Completed = "COMPLETED",
    Started = "STARTED",
    NotStarted = "NOT_STARTED"
}

type Quest = {
    title: string
    status: QuestStatus
    difficulty: number
    members: boolean
    userEligible: boolean
    questPoints: number
}

type QuestResponse = {
    quests: Quest[]
}

type QuestCell = {
    user: string
    title: string
    status: QuestStatus
    difficulty: number
    members: boolean
    userEligible: boolean
    questPoints: number
}

type QuestRow = QuestCell[]
type QuestTable = QuestRow[]

type QuestTableRowProps = {
    questRow: QuestRow
}
const QuestTableRow = ({ questRow }: QuestTableRowProps) => {
    const questName = questRow[0]?.title
    return (
        <Row key={questName}>
            <Cell>
                <a href={`https://runescape.wiki/?search=${questName}`}>{questName}</a>
            </Cell>
            {questRow.map((questCell, index) => {
                const className = getStatusClass(questCell.status, questCell.userEligible)
                const canComplete = questCell.userEligible ? "Can complete" : "Cannot complete"
                return (
                    <Cell className={className} key={index}>
                        {canComplete}
                    </Cell>
                )
            })}
        </Row>
    )
}

type QuestTableProps = {
    users: string[]
    questTable: QuestTable
    onSortChange: (user: string) => void
}
const QuestTableComponent = ({ users, questTable, onSortChange }: QuestTableProps) => {
    const rows = questTable.map((questRow, index) => <QuestTableRow questRow={questRow} key={index} />)

    return (
        <Table>
            <Row>
                <Cell onClick={() => onSortChange("questName")} />
                {users.map((user, index) => {
                    return (
                        <Cell key={index} onClick={() => onSortChange(user)}>
                            {user}
                        </Cell>
                    )
                })}
            </Row>
            {rows}
        </Table >
    )
}

export const QuestsComponent = () => {
    const [users, setUsers] = useState<string[]>([
        'Void Cosmos',
        'Sapphisms',
        'Issybelle',
        'Amibelle',
        'Aimasu',
        'Madidle',
        'LXIXKrimson',
        'IKayla',
        'E-Psycho',
        'Lythrisal',
    ])
    const [questTable, setQuestTable] = useState<QuestRow[]>([]);
    const [filterCompleted, setFilterCompleted] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>("questName")
    const [sortDirection, setSortDirection] = useState<boolean>(true)

    const onFitlerComplete: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFilterCompleted(event.target.checked)
    }

    const onSortChange = (user: string) => {
        if (sortBy === user) {
            setSortDirection(!sortDirection)
        } else {
            setSortBy(user)
            setSortDirection(true)
        }
    }

    console.log(sortBy, sortDirection)

    useEffect(() => {
        const doFetch = async () => {
            const questPromises = users.map(fetchUserData)
            const questsPerUser = await Promise.all(questPromises)
            const questsByQuest = groupByQuest(questsPerUser)

            setQuestTable(questsByQuest)
        }
        doFetch().catch(console.error)
    }, [users])

    const displayTable = useMemo(() => {
        const filteredTable = filterTable(filterCompleted, questTable)
        const sortedTable = sortTable(sortBy, sortDirection, filteredTable)
        return sortedTable
    }, [questTable, filterCompleted, sortBy, sortDirection])

    return (
        <>
            <div>
                <div>
                    <label htmlFor="filter-complete-checkbox">Filter completed</label>
                    <input id="filter-complete-checkbox" type="checkbox" onChange={onFitlerComplete} checked={filterCompleted} />
                </div>
            </div>
            <QuestTableComponent users={users} questTable={displayTable} onSortChange={onSortChange} />
        </>
    );
}

const filterTable = (shouldFilter: boolean, questTable: QuestTable) => {
    if (!shouldFilter) return questTable

    return questTable.filter(questRow => !questRow.find(questCell => questCell.status === QuestStatus.Completed))
}

const sortTable = (sortBy: string, sortDirection: boolean, questTable: QuestTable) => {
    if (sortBy === "none") return questTable
    return [...questTable].sort((a, b) => {
        if (sortBy === "questName") {
            const compareDirection = compareStrings(a[0].title, b[0].title)
            return sortDirection ? compareDirection : -compareDirection
        } else {
            const leftElement = a.find(e => e.user === sortBy)
            const rightElement = b.find(e => e.user === sortBy)
            const compareDirection = compareElements(leftElement, rightElement)

            return sortDirection ? compareDirection : -compareDirection
        }
    })
}

const compareElements = (leftElement?: QuestCell, rightElement?: QuestCell) => {
    const byStatus = compareStatus(leftElement?.status, rightElement?.status)
    if (byStatus !== 0) return byStatus

    const byCanComplete = compareEligible(leftElement?.userEligible, rightElement?.userEligible)

    return byCanComplete
}

const compareEligible = (a?: boolean, b?: boolean) => {
    if (a && !b) {
        return -1
    } else if (!a && b) {
        return 1
    } else {
        return 0
    }

    // return a && !b ? -1 : !a && b ? 1 : 0
}
const getStatusValue = (status?: QuestStatus) => {
    switch (status) {
        case QuestStatus.Completed:
            return 2;
        case QuestStatus.Started:
            return 1;
        case QuestStatus.NotStarted:
            return 0;
        default:
            return 0;
    }
}
const compareStatus = (a?: QuestStatus, b?: QuestStatus) => {
    return getStatusValue(b) - getStatusValue(a)
}
const compareStrings = (a: string, b: string) => a > b ? 1 : a === b ? 0 : -1

const fetchUserData = async (user: string): Promise<QuestCell[]> => {
    const response = await fetch(`https://runescape.voidconcept.com/runemetrics/quests?user=${user}`, {
        mode: "cors"
    })
    const responseJson: QuestResponse = await response.json()
    return responseJson.quests.map(quest => ({
        user,
        ...quest
    }))
}

type QuestGroupReduceResults = {
    [questName: string]: QuestCell[]
}
const groupByQuest = (questsPerUser: QuestCell[][]): QuestRow[] => {
    const groupedQuests = questsPerUser.flat().reduce<QuestGroupReduceResults>((previous, current) => {
        const key = current.title
        const oldValue = previous[key] || []
        return {
            ...previous,
            [key]: [...oldValue, current]
        }
    }, {})


    return Object.values(groupedQuests)
}

const getStatusClass = (status: string, canComplete: boolean) => {
    if (status === QuestStatus.Completed) {
        return 'vc-status-green'
    } else if (status === QuestStatus.Started) {
        return 'vc-status-yellow'
    } else if (status === QuestStatus.NotStarted && canComplete) {
        return 'vc-status-orange'
    } else {
        return 'vc-status-red'
    }
}