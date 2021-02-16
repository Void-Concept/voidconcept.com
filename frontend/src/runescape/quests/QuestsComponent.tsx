import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import * as R from 'ramda';
import { Table, Row, Cell } from '../../components';
import './quest-component.css';

type Quest = {
    title: string
    status: string
    difficulty: number
    members: boolean
    userEligible: boolean
    questPoints: number
}

type QuestResponse = {
    quests: Quest[]
}

type QuestList = {
    user: string,
    quests: Quest[]
}

type QuestCell = {
    user: string
    title: string
    status: string
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
                {questName}
            </Cell>
            {questRow.map(questCell => {
                const className = getStatusClass(questCell.status)
                return (
                    <Cell className={className}>
                        {questCell.user} {questCell.status} {`${questCell.userEligible}`}
                    </Cell>
                )
            })}
        </Row>
    )
}

type QuestTableProps = {
    users: string[]
    questTable: QuestTable
}
const QuestTableComponent = ({ users, questTable }: QuestTableProps) => {
    const rows = questTable.map((questRow, index) => <QuestTableRow questRow={questRow} key={index} />)

    return (
        <Table>
            <Row>
                <Cell />
                {users.map((user, index) => {
                    return (
                        <Cell key={index}>
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
    const [users, setUsers] = useState<string[]>(['void_cosmos', 'sapphisms', 'issybelle', 'amibelle', 'aimasu', 'madidle'])
    const [questTable, setQuestTable] = useState<QuestRow[]>([]);

    useEffect(() => {
        const doFetch = async () => {
            const questPromises = users.map(fetchUserData)
            const questsPerUser = await Promise.all(questPromises)
            const questsByQuest = groupByQuest(questsPerUser)

            setQuestTable(questsByQuest)
        }
        doFetch().catch(console.error)
    }, [users])

    return (
        <QuestTableComponent users={users} questTable={questTable} />
    );
}

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

const getStatusClass = (status: string) => {
    if (status === "COMPLETED") {
        return 'vc-status-green'
    } else if (status === "STARTED") {
        return 'vc-status-yellow'
    } else {
        return 'vc-status-red'
    }
}